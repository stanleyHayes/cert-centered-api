const asyncHandler = require("../middlewares/async");
const College = require("../models/College");
const ErrorResponse = require("../utils/error-response");

//@desc         Create college
//@route        POST /api/v1/colleges
//@access       public
//@role         admin, super-admin
exports.addCollege = asyncHandler(async function(req, res, next) {
    let college = await College.create(req.body);
    college = await College.findById(college._id).populate({ path: "provost" });
    res.status(201).json({ success: true, data: college });
});


//@desc         Get a single college
//@route        POST /api/v1/colleges/:collegeid
//@access       public
//@role         admin, super-admin, user
exports.getCollege = asyncHandler(async function(req, res, next) {
    let college = await College.findById(req.params.id).populate({ path: "provost" });
    if (!college) {
        return next(new ErrorResponse('College not found', 404));
    }
    res.status(200).json({ success: true, data: college });
});


//@desc         Get colleges
//@route        POST /api/v1/colleges
//@access       public
//@role         admin, super-admin, user
exports.getColleges = asyncHandler(async function(req, res, next) {
    const colleges = await College.find().populate({ path: "provost" });
    res.status(200).json({ success: true, data: colleges });
});


//@desc         Update course
//@route        PUT /api/v1/colleges/:collegeid
//@access       public
//@role         admin, super-admin
exports.updateCollege = asyncHandler(async function(req, res, next) {
    let college = await College.findById(req.params.id).populate({ path: "provost" });
    if (!college) {
        return next(new ErrorResponse('College not found', 404));
    }
    college = await College.findByIdAndUpdate(req.params.id, req.body, { new: true });
    college = await College.findById(req.params.id).populate({ path: "provost" });
    res.status(200).json({ success: true, data: college });
});


//@desc         Delete college
//@route        DELETE /api/v1/colleges/:collegeid
//@access       public
//@role         admin, super-admin
exports.deleteCollege = asyncHandler(async function(req, res, next) {
    let college = await College.findById(req.params.id).populate({ path: "provost" });
    if (!college) {
        return next(new ErrorResponse('College not found', 404));
    }
    college = await College.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: college });
});