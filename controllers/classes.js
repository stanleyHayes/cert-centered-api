const asyncHandler = require("../middlewares/async");
const Class = require("../models/Class");
const ErrorResponse = require("../utils/error-response");

//@desc         Create class
//@route        POST /api/v1/classes
//@access       public
//@role         admin, super-admin, user
exports.addClass = asyncHandler(async function(req, res, next) {
    let courseClass = await Class.create(req.body);
    courseClass = await Class.findById(courseClass._id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    res.status(201).json({ success: true, data: courseClass });
});


//@desc         Get a single class
//@route        POST /api/v1/classes/:classid
//@access       public
//@role         admin, super-admin, user
exports.getClass = asyncHandler(async function(req, res, next) {
    let courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    if (!courseClass) {
        return next(new ErrorResponse('Class not found', 404));
    }
    res.status(200).json({ success: true, data: courseClass });
});


//@desc         Get classes, get classes per user
//@route        POST /api/v1/classes, /api/v1/users/userid/classes
//@access       public
//@role         admin, super-admin, user
exports.getClasses = asyncHandler(async function(req, res, next) {
    let query;
    let userid = req.params.userid
    if (userid) {
        query = Class.find({ $or: [{ assistant: userid }, { instructor: userid }, { students: { $in: userid } }] }).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    } else {
        query = Class.find({}).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    }
    classes = await query;
    res.status(200).json({ success: true, data: classes });
});


//@desc         Update Class
//@route        PUT /api/v1/classes/:classid
//@access       public
//@role         admin, super-admin, user
exports.updateClass = asyncHandler(async function(req, res, next) {
    let courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    if (!courseClass) {
        return next(new ErrorResponse('Class not found', 404));
    }
    courseClass = await Class.findByIdAndUpdate(req.params.id, req.body, { new: true });
    courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    res.status(200).json({ success: true, data: courseClass });
});


//@desc         Delete Class
//@route        DELETE /api/v1/classes/:classid
//@access       public
//@role         admin, super-admin, user
exports.deleteClass = asyncHandler(async function(req, res, next) {
    let courseClass = await Class.findById(req.params.id);
    if (!courseClass) {
        return next(new ErrorResponse('Class not found', 404));
    }
    courseClass = await Class.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: courseClass });
});


//@desc         Delete Class
//@route        DELETE /api/v1/classes/:classid/
//@access       public
//@role         admin, super-admin, user
exports.addClassMember = asyncHandler(async function(req, res, next) {
    let courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    if (!courseClass) {
        return next(new ErrorResponse('Class not found', 404));
    }
    let students = courseClass.students;
    if (!students.includes(req.body.userid)) {
        students.push(req.body.userid);
    }
    courseClass.save();
    courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    res.status(200).json({ success: true, data: courseClass });
});



//@desc         Delete Class
//@route        DELETE /api/v1/classes/:classid
//@access       public
//@role         admin, super-admin, user
exports.removeClassMember = asyncHandler(async function(req, res, next) {
    let courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    if (!courseClass) {
        return next(new ErrorResponse('Class not found', 404));
    }
    let students = courseClass.students;
    if (students.includes(req.body.userid)) {
        students.id(req.body.userid).remove()
    }
    courseClass.save();
    courseClass = await Class.findById(req.params.id).populate({ path: "assistant" }).populate({ path: "instructor" }).populate({ path: "course" });
    res.status(200).json({ success: true, data: courseClass });
});