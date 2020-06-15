const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addDepartment,
    deleteDepartment,
    getDepartment,
    getDepartments,
    updateDepartment
} = require("../controllers/departments");

const { authorize, protect } = require("../middlewares/authentication");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");

router.route("/")
    .post(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), addDepartment)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getDepartments);

router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getDepartment)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateDepartment)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteDepartment);


module.exports = router;