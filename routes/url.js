const express = require("express");
const { createShortUrl } = require("../controllers/url.js");
const router = express.Router();

router.post("/shorten", createShortUrl);

module.exports = router;
