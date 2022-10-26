const express = require("express");
const { getShortUrl } = require("../controllers/index.js");
const router = express.Router();

router.get("/:code", getShortUrl);

module.exports = router;
