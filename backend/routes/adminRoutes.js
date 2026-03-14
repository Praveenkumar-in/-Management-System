const express = require("express");

const {
 callNext,
 callNextTen,
 skipToken,
 resetQueue
} = require("../controllers/adminController");

const router = express.Router();

router.post("/call-next", callNext);

router.post("/call-next-10", callNextTen);

router.post("/skip", skipToken);

router.post("/reset", resetQueue);

module.exports = router;