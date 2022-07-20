const express = require("express");
const router = express.Router();
const {StaffRecommendationForm,retreiveStaff,assignStaff} = require("../controllers/staff")

router.route("/StaffRecommendationForm").post(StaffRecommendationForm);

router.route("/retreiveStaff").get(retreiveStaff);

router.route("/assignStaff").put(assignStaff);

module.exports = router;