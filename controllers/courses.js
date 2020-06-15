const asyncHandler = require("../middlewares/async");
const Course = require("../models/Course");
const ErrorResponse = require("../utils/error-response");

//@desc         Create course
//@route        POST /api/v1/courses
//@access       public
//@role         admin, super-admin
exports.addCourse = asyncHandler(async function(req, res, next) {
    let course = await Course.create(req.body);
    course = await Course.findById(course._id).populate({ path: "departments" });
    res.status(201).json({ success: true, data: course });
});


//@desc         Get a single course
//@route        POST /api/v1/courses/:courseid
//@access       public
//@role         admin, super-admin, user
exports.getCourse = asyncHandler(async function(req, res, next) {
    let course = await Course.findById(req.params.id).populate({ path: "departments" });
    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }
    res.status(200).json({ success: true, data: course });
});


//@desc         Get courses
//@route        POST /api/v1/courses
//@access       public
//@role         admin, super-admin, user
exports.getCourses = asyncHandler(async function(req, res, next) {
    let query;
    if (req.params.departmentid) {
        query = Course.find({ department: req.params.departmentid }).populate({ path: "departments" });
    } else {
        query = Course.find({}).populate({ path: "departments" });
    }
    let courses = await query;
    res.status(200).json({ success: true, data: courses });
});


//@desc         Update course
//@route        PUT /api/v1/courses/:courseid
//@access       public
//@role         admin, super-admin
exports.updateCourse = asyncHandler(async function(req, res, next) {
    let course = await Course.findById(req.params.id).populate({ path: "departments" });
    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }
    course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    course = await Course.findById(req.params.id).populate({ path: "departments" });
    res.status(200).json({ success: true, data: course });
});


//@desc         Delete Class
//@route        DELETE /api/v1/courses/:courseid
//@access       public
//@role         admin, super-admin
exports.deleteCourse = asyncHandler(async function(req, res, next) {
    let course = await Course.findById(req.params.id).populate({ path: "departments" });
    if (!course) {
        return next(new ErrorResponse('Course not found', 404));
    }
    course = await Course.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: course });
});