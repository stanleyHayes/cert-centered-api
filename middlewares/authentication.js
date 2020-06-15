const jwt = require("jsonwebtoken");
const User = require("../models/User");
const ErrorResponse = require("../utils/error-response");

exports.protect = async function(req, res, next) {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    } else {
        return next(new ErrorResponse("Invalid token", 400));
    }
    //no token found
    if (!token) {
        return next(new ErrorResponse("Unauthorized to access this route", 401));
    }

    //check if token was issues by me
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded);
        if (!user.isActive) {
            return next(new ErrorResponse(`Blocked`, 400));
        }
        req.user = user;
        req.token = token;
        next();
    } catch (e) {
        return next(new ErrorResponse(`Invalid token ${e.message}`, 400));
    }
};


exports.authorize = function(...roles) {
    return function(req, res, next) {
        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`${req.user.role} unauthorized to access this route`, 403))
        }
        next();
    }
};