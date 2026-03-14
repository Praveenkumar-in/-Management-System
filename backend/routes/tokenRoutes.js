const express = require("express");

const {
 generateToken,
 tokenStatus,
 getQueue
} = require("../controllers/tokenController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/generate", protect, generateToken);

router.get("/status", protect, tokenStatus);

router.get("/queue", getQueue);

module.exports = router;