const express = require('express');
const router = express.Router();
const {
    registerUser,
    loginUser,
    getUsers,
    getUserById,
    getUserUpdate,
    deleteUser
} = require("../controller/userController");
const videoCall = require('../controller/videoController');

router.post("/register", registerUser);
router.get("/userList", getUsers);
router.get("/", videoCall);
router.get("/user/:id", getUserById);
router.patch("/userUpdate/:id", getUserUpdate);
router.post("/login", loginUser);
router.delete("/userDelete", deleteUser)

module.exports = router;
