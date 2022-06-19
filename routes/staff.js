const express = require("express");
const router = express.Router();
const {StaffRecommendationForm,} = require("../controllers/staff")

router.route("/StaffRecommendationForm").post(StaffRecommendationForm);

module.exports = router;