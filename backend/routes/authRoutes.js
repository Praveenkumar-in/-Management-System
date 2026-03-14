const express = require("express");

const {
 registerStudent,
 loginStudent,
 loginAdmin
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerStudent);
router.post("/login-student", loginStudent);
router.post("/login-admin", loginAdmin);

module.exports = router;