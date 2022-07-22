const express = require("express");
const router = express.Router();

const {StaffRecommendationForm,retreiveStaff,assignStaff,staffArray} = require("../controllers/staff")

router.route("/StaffRecommendationForm").post(StaffRecommendationForm);

router.route("/retreiveStaff").get(retreiveStaff);

router.route("/assignStaff").put(assignStaff);
router.route("/statusArray").get(staffArray);


module.exports = router;