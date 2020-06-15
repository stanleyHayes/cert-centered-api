const asyncHandler = require("../middlewares/async");
const ErrorResponse = require("../utils/error-response");
const User = require("../models/User");
const crypto = require("crypto");

// const sendEmail = require("../utils/send-email");

//@desc         Register user
//@route        POST /api/v1/auth/register
//@access       public
exports.register = asyncHandler(async function(req, res, next) {

    const {
        email,
        password,
        phone,
        name,
        role
    } = req.body;

    const userFromDB = await User.findOne({ email: email });
    let createdUser;

    if (userFromDB) {
        return next(new ErrorResponse(`Account with email ${email} already exist`, 409));
    }

    createdUser = await User.create({ email, password, phone, name, role });

    const verifyToken = createdUser.generateUserVerificationToken();
    const verificationUrl = `${req.protocol}://${req.hostname}:5000/auth/verify/${verifyToken}`;

    const message = `Verify your account by using the token ${verifyToken} or by clicking the url ${verificationUrl}`
    const options = {
        email: email,
        subject: `Account Verification`,
        message: message
    };

    try {
        // await sendEmail(options);
        const token = createdUser.getSignedToken();
        createdUser.save({ runValidators: false });
        res.status(200).json({
            success: true,
            data: createdUser,
            token: token,
            message: "Message sent"
        });
    } catch (e) {
        createdUser.verifyUserToken = undefined;
        createdUser.verifyUserExpire = undefined;
        return next(new ErrorResponse(`Email could not be sent, ${e.message}`, 500));
    }
});


//@desc         Login user
//@route        POST /api/v1/auth/login
//@access       public
exports.login = asyncHandler(async function(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
        return next(new ErrorResponse("Provide email and password", 400));
    }

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    // if (!user.verified) {
    //     return next(new ErrorResponse("Verify your account", 401));
    // }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    const token = user.getSignedToken();
    res.status(200).json({ success: true, token, data: user });
});


//@desc         Get logged in user
//@route        GET /api/v1/auth/me
//@access       private
exports.getMe = asyncHandler(async function(req, res, next) {
    const user = await User.findById(req.user.id).populate({
        path: "orders",
        populate: {
            path: "issues"
        }
    });
    res.status(200).json({ success: true, data: user, token: req.token });
});


//@desc         Verify user
//@route        PUT /api/v1/auth/verify/:verifyToken
//@access       private
exports.verifyUser = asyncHandler(async function(req, res, next) {

    const verifyToken = crypto
        .createHash("sha256")
        .update(req.params.verifyToken)
        .digest("hex");

    let user = await User.findOne({ verifyUserToken: verifyToken, verifyUserExpire: { $gt: Date.now() } });
    if (!user) {
        return next(new ErrorResponse("Token expired. Request new token", 401));
    }

    user.verified = true;
    user.verifyUserExpire = undefined;
    user.verifyUserToken = undefined;
    user.save();

    user = await User.findById(user._id);

    res.status(200).json({ success: true, message: "User verified" });
});


//@desc         Forgot password
//@route        POST /api/v1/auth/forgot-password
//@access       public
exports.forgotPassword = asyncHandler(async function(req, res, next) {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorResponse(`No account associated with email ${req.body.email}`))
    }
    const resetToken = user.generatePasswordResetToken();
    user.save();

    const message = `Reset your email using this url ${req.protocol}://${req.hostname}/api/v1/auth/reset-password/${resetToken}`;
    const options = {
        email: req.body.email,
        message: message,
        subject: "Password Reset"
    };

    try {
        await sendEmail(options);
        res.status(200).json({ success: true, message: "Email sent" });
    } catch (e) {
        user.resetPasswordExpire = undefined;
        user.resetPasswordToken = undefined;
        user.save();
        return next(new ErrorResponse(`Could not send email`, 500));
    }
});


//@desc         Reset password
//@route        PUT /api/v1/auth/reset-password/:resetToken
//@access       private
exports.resetPassword = asyncHandler(async function(req, res, next) {
    const resetToken = crypto
        .createHash("sha256")
        .update(req.params.resetToken)
        .digest("hex");

    const { password } = req.body;
    const user = await User.findOne({ resetPasswordToken: resetToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new ErrorResponse("Token expired", 401));
    }

    if (!password) {
        return next(new ErrorResponse("Provide password", 400));
    }

    user.password = password;
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    user.save();

    const token = user.getSignedToken();
    res.status(200).json({ success: true, token: token });
});


//@desc         Change password
//@route        PUT /api/v1/auth/change-password
//@access       private
exports.changePassword = asyncHandler(async function(req, res, next) {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.id).select("+password");

    if (!user) {
        return next(new ErrorResponse(`No user associated with id ${req.user.id}`, 404))
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
        return next(new ErrorResponse(`Invalid credentials`, 401));
    }

    user.password = newPassword;
    user.save();

    res.status(200).json({ success: true, message: "Password changed" });
});