const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addFaculty,
    deleteFaculty,
    getFaculties,
    getFaculty,
    updateFaculty
} = require("../controllers/faculties");

const { authorize, protect } = require("../middlewares/authentication");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");


router.route("/")
    .post(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), addFaculty)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getFaculties);

router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getFaculty)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateFaculty)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteFaculty);


module.exports = router;