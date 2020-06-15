const express = require("express");
const router = express.Router({ mergeParams: true });

const {
    addUser,
    deleteUser,
    getUser,
    getUsers,
    updateUser
} = require("../controllers/users");

const { ROLE_ADMIN, ROLE_ASSISTANT, ROLE_LECTURER, ROLE_SUPER_ADMIN, ROLE_STUDENT } = require("../constants/constants");

const { authorize, protect } = require("../middlewares/authentication");

router.route("/")
    .post(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), addUser)
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getUsers);

router.route("/:id")
    .get(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), getUser)
    .put(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN, ROLE_STUDENT), updateUser)
    .delete(protect, authorize(ROLE_SUPER_ADMIN, ROLE_ADMIN), deleteUser);


module.exports = router;