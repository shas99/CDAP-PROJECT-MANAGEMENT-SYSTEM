const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

<<<<<<< HEAD
const {viewfeedback,viewmarks, viewAvailableGroups, StudentTopicInterestingForm,userprofilemanagement,edituserprofile,viewimage} = require('../controllers/student')
=======
const {viewfeedback,viewmarks, viewAvailableGroups, StudentTopicInterestingForm,userprofilemanagement,edituserprofile,status,retrieveData} = require('../controllers/student')
>>>>>>> 361ece6fb7f52cde2b1cfa2789d30101f9f19c76


router.route("/viewfeedback").get(viewfeedback)//to view feedback

router.route("/viewmarks").get(viewmarks)//to view marks

router.route("/studenttopicinterestingform").post(StudentTopicInterestingForm)//student topic interestings

router.route("/userprofilemanagement").get(userprofilemanagement)//student profile

router.route("/edituserprofile").put(edituserprofile)//student - edit profile feature

<<<<<<< HEAD
router.route("/viewimage").get(viewimage)
=======
router.route("/status").get(status)
>>>>>>> 361ece6fb7f52cde2b1cfa2789d30101f9f19c76

router.route("/retrieveData").get(retrieveData)

module.exports = router