const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addCollege,
    deleteCollege,
    getCollege,
    getColleges,
    updateCollege
} = require("../controllers/colleges");

const { authorize, protect } = require("../middlewares/authentication");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");

router.route("/")
    .post(protect, authorize(ROLE_STUDENT), addCollege)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getColleges);

router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getCollege)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateCollege)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteCollege);


module.exports = router;