const express = require("express");
const router = express.Router();
const {StaffRecommendationForm,retreiveStaff} = require("../controllers/staff")

router.route("/StaffRecommendationForm").post(StaffRecommendationForm);

router.route("/retreiveStaff").get(retreiveStaff);
module.exports = router;