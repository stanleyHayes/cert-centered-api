const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addCourse,
    deleteCourse,
    getCourse,
    getCourses,
    updateCourse
} = require("../controllers/courses");

const { authorize, protect } = require("../middlewares/authentication");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");


router.route("/")
    .post(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), addCourse)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getCourses)


router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getCourse)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateCourse)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteCourse);


module.exports = router;