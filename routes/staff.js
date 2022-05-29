const express = require("express");
const router = express.Router();
const {StaffRecommendationForm,viewStaff} = require("../controllers/staff")


router.route("/StaffRecommendationForm").post(StaffRecommendationForm);

router.route("/viewstaff").get(viewStaff)

module.exports = router;