const express = require("express");
const router = express.Router();

const {
    changePassword,
    forgotPassword,
    getMe,
    login,
    register,
    resetPassword,
    verifyUser
} = require("../controllers/authentication");

const { protect } = require("../middlewares/authentication");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.get("/me", protect, getMe);
router.put("/verify/:verifyToken", verifyUser);
router.put("/reset-password/:resetToken", resetPassword);
router.put("/change-password", protect, changePassword);

module.exports = router;