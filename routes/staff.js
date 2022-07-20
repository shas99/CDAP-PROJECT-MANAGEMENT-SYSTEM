const express = require("express");
const router = express.Router();
const {StaffRecommendationForm,staffArray} = require("../controllers/staff")

router.route("/StaffRecommendationForm").post(StaffRecommendationForm);

router.route("/statusArray").get(staffArray);

module.exports = router;