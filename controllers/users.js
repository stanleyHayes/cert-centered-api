const asyncHandler = require("../middlewares/async");


//@desc         Create class
//@route        POST /api/v1/classes
//@access       public
//@role         admin, super-admin, user
exports.addUser = asyncHandler(async function(req, res, next) {
    res.status(201).json({ success: true, data: '' });
});


//@desc         Get a single class
//@route        POST /api/v1/users/:userid
//@access       public
//@role         admin, super-admin, user
exports.getUser = asyncHandler(async function(req, res, next) {
    res.status(200).json({ success: true, data: '' });
});


//@desc         Get users
//@route        POST /api/v1/users
//@access       public
//@role         admin, super-admin, user
exports.getUsers = asyncHandler(async function(req, res, next) {
    res.status(200).json({ success: true, data: '' });
});


//@desc         Update Class
//@route        PUT /api/v1/users/:userid
//@access       public
//@role         admin, super-admin, user
exports.updateUser = asyncHandler(async function(req, res, next) {
    res.status(200).json({ success: true, data: '' });
});


//@desc         Delete user
//@route        DELETE /api/v1/users/:userid
//@access       public
//@role         admin, super-admin, user
exports.deleteUser = asyncHandler(async function(req, res, next) {
    res.status(200).json({ success: true, data: '' });
});