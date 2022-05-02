const express = require("express");
const router = express.Router();
const { getPrivateData } = require("../controllers/staffPrivate");
const { protect } = require("../middleware/staffAuth");



router.route("/staffPrivate").get(protect, getPrivateData);

module.exports = router;