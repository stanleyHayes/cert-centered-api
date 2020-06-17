const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addLesson,
    deleteLesson,
    getLesson,
    getLessons,
    updateLesson
} = require("../controllers/lessons");

const { authorize, protect } = require("../middlewares/authentication");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");


router.route("/")
    .post(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), addLesson)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getLessons)


router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getLesson)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateLesson)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteLesson);


module.exports = router;