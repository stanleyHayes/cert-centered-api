const asyncHandler = require("../middlewares/async");
const Lesson = require("../models/Lesson");
const ErrorResponse = require("../utils/error-response");

//@desc         Create lesson
//@route        POST /api/v1/lessons
//@access       public
//@role         admin, super-admin
exports.addLesson = asyncHandler(async function(req, res, next) {
    let lesson = await Lesson.create(req.body);
    lesson = await Lesson.findById(lesson._id);
    res.status(201).json({ success: true, data: lesson });
});


//@desc         Get a single lesson
//@route        POST /api/v1/lessons/:lessonid
//@access       public
//@role         admin, super-admin, user
exports.getLesson = asyncHandler(async function(req, res, next) {
    let lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
        return next(new ErrorResponse('lesson not found', 404));
    }
    res.status(200).json({ success: true, data: lesson });
});


//@desc         Get lessons
//@route        POST /api/v1/lessons
//@access       public
//@role         admin, super-admin, user
exports.getLessons = asyncHandler(async function(req, res, next) {
    const lessons = await Lesson.find({ faculty: req.params.facultyid });
    res.status(200).json({ success: true, data: lessons });
});


//@desc         Update lesson
//@route        PUT /api/v1/lessons/:lessonid
//@access       public
//@role         admin, super-admin, user
exports.updateLesson = asyncHandler(async function(req, res, next) {
    let lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
        return next(new ErrorResponse('lesson not found', 404));
    }
    lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, { new: true });
    lesson = await Lesson.findById(req.params.id);
    res.status(200).json({ success: true, data: lesson });
});


//@desc         Delete lesson
//@route        DELETE /api/v1/lessons/:lessonid
//@access       public
//@role         admin, super-admin, user
exports.deleteLesson = asyncHandler(async function(req, res, next) {
    let lesson = await Lesson.findById(req.params.id).populate({ path: "faculty" });
    if (!lesson) {
        return next(new ErrorResponse('lesson not found', 404));
    }
    lesson = await Lesson.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: department });
});