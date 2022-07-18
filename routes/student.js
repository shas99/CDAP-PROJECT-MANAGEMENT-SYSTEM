const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewfeedback,viewmarks, viewAvailableGroups, StudentTopicInterestingForm,userprofilemanagement,edituserprofile,viewimage} = require('../controllers/student')


router.route("/viewfeedback").get(viewfeedback)//to view feedback

router.route("/viewmarks").get(viewmarks)//to view marks

router.route("/studenttopicinterestingform").post(StudentTopicInterestingForm)//student topic interestings

router.route("/userprofilemanagement").get(userprofilemanagement)//student profile

router.route("/edituserprofile").put(edituserprofile)//student - edit profile feature

router.route("/viewimage").get(viewimage)


module.exports = router