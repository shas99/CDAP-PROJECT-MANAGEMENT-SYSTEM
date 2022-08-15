const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()



const {viewAvailableSubmissions,viewBatchID,viewspecificSubmission,submissionForm,addSubmission,DeleteSubmission,editSpecificSubmission,viewSpecificSubmission,viewSpecificSubmissionStudentID,StaffViewSubmission} = require('../controllers/SubmissionPage')




router.route("/availableSubmissions").get(viewAvailableSubmissions) //router for View Available Projects
router.route("/batchID").get(viewBatchID)
router.route("/availableSubmissions/:id").get(viewspecificSubmission)
// router.route("/availableProjects/:id").get(viewspecificproject)  //router for viewing specific project
// router.route("/availableProjects/placeBidding/:id").put(placeBidonAvailableProject) //place bidding router

// router.route("/increasebidcount").post(increasebidcount)


router.route("/submissionForm").post(submissionForm)

router.route("/addSubmission").post(addSubmission)

router.route("/deleteSubmission").delete(DeleteSubmission)

//router.route("/viewSpecificSubmission").get(viewspecificSubmission)

router.route("/editSpecificSubmission").put(editSpecificSubmission)

router.route("/viewSpecificSubmissionStudentID").get(viewSpecificSubmissionStudentID)

router.route("/StaffViewSubmission").get(StaffViewSubmission)

module.exports = router
