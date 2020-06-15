const asyncHandler = require("../middlewares/async");
const Department = require("../models/Department");
const ErrorResponse = require("../utils/error-response");

//@desc         Create department
//@route        POST /api/v1/departments
//@access       public
//@role         admin, super-admin
exports.addDepartment = asyncHandler(async function(req, res, next) {
    let department = await Department.create(req.body);
    department = await Department.findById(department._id).populate({ path: "hod" }).populate({ path: "faculty" });
    res.status(201).json({ success: true, data: department });
});


//@desc         Get a single department
//@route        POST /api/v1/departments/:departmentid
//@access       public
//@role         admin, super-admin, user
exports.getDepartment = asyncHandler(async function(req, res, next) {
    let department = await Department.findById(req.params.id).populate({ path: "hod" }).populate({ path: "faculty" });
    if (!department) {
        return next(new ErrorResponse('Department not found', 404));
    }
    res.status(200).json({ success: true, data: department });
});


//@desc         Get departments
//@route        POST /api/v1/departments
//@access       public
//@role         admin, super-admin, user
exports.getDepartments = asyncHandler(async function(req, res, next) {
    const departments = await Department.find({ faculty: req.params.facultyid }).populate({ path: "faculty" }).populate({ path: "hod" });
    res.status(200).json({ success: true, data: departments });
});


//@desc         Update department
//@route        PUT /api/v1/departments/:departmentid
//@access       public
//@role         admin, super-admin, user
exports.updateDepartment = asyncHandler(async function(req, res, next) {
    let department = await Department.findById(req.params.id).populate({ path: "faculty" }).populate({ path: "hod" });
    if (!department) {
        return next(new ErrorResponse('Department not found', 404));
    }
    department = await Department.findByIdAndUpdate(req.params.id, req.body, { new: true });
    department = await Department.findById(req.params.id).populate({ path: "faculty" }).populate({ path: "hod" });
    res.status(200).json({ success: true, data: department });
});


//@desc         Delete department
//@route        DELETE /api/v1/departments/:departmentid
//@access       public
//@role         admin, super-admin, user
exports.deleteDepartment = asyncHandler(async function(req, res, next) {
    let department = await Department.findById(req.params.id).populate({ path: "faculty" }).populate({ path: "hod" });
    if (!department) {
        return next(new ErrorResponse('Department not found', 404));
    }
    department = await Department.findByIdAndRemove(req.params.id);
    res.status(200).json({ success: true, data: department });
});