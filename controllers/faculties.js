const asyncHandler = require("../middlewares/async");
const Faculty = require("../models/Faculty");
const ErrorResponse = require("../utils/error-response");

//@desc         Create faculty
//@route        POST /api/v1/faculties
//@access       public
//@role         admin, super-admin
exports.addFaculty = asyncHandler(async function(req, res, next) {
    let faculty = await Faculty.create(req.body);
    faculty = await Faculty.findById(faculty._id).populate({ path: "college" });
    res.status(201).json({ success: true, data: faculty });
});


//@desc         Get a single faculty
//@route        POST /api/v1/faculties/:facultyid
//@access       public
//@role         admin, super-admin, user
exports.getFaculty = asyncHandler(async function(req, res, next) {
    let faculty = await Faculty.findById(req.params.id).populate({ path: "college" });
    if (!faculty) {
        return next(new ErrorResponse('Faculty not found', 404));
    }
    res.status(200).json({ success: true, data: faculty });
});


//@desc         Get faculties
//@route        POST /api/v1/colleges/:collegeid/faculties
//@access       public
//@role         admin, super-admin, user
exports.getFaculties = asyncHandler(async function(req, res, next) {
    const faculties = await Faculty.find({ college: req.params.collegeid }).populate({ path: "college" });
    res.status(200).json({ success: true, data: faculties });
});


//@desc         Update faculty
//@route        PUT /api/v1/faculties/:facultyid
//@access       public
//@role         admin, super-admin, user
exports.updateFaculty = asyncHandler(async function(req, res, next) {
    let faculty = await Faculty.findById(req.params.id).populate({ path: "college" });
    if (!faculty) {
        return next(new ErrorResponse('Faculty not found', 404));
    }
    faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body, { new: true });
    faculty = await Faculty.findById(req.params.id).populate({ path: "college" });
    res.status(200).json({ success: true, data: faculty });
});


//@desc         Delete faculty
//@route        DELETE /api/v1/faculties/:facultyid
//@access       public
//@role         admin, super-admin, user
exports.deleteFaculty = asyncHandler(async function(req, res, next) {
    let faculty = await Faculty.findById(req.params.id).populate({ path: "college" });
    if (!faculty) {
        return next(new ErrorResponse('Faculty not found', 404));
    }
    faculty = await Faculty.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: faculty });
});