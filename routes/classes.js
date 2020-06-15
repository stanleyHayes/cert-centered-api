const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addClass,
    addClassMember,
    deleteClass,
    getClass,
    getClasses,
    removeClassMember,
    updateClass
} = require("../controllers/classes");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");


const { authorize, protect } = require("../middlewares/authentication");

router.route("/")
    .post(protect, authorize(ROLE_STUDENT), addClass)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getClasses);

router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getClass)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateClass)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteClass);


module.exports = router;