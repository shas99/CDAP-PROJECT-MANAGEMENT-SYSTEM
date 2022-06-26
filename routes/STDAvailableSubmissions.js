const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()


const {viewAvailableSubmissions,addSubmission,DeleteSubmission,viewSpecificSubmission} = require('../controllers/SubmissionPage')



router.route("/availableSubmissions").get(viewAvailableSubmissions) //router for View Available Projects
// router.route("/availableProjects/:id").get(viewspecificproject)  //router for viewing specific project
// router.route("/availableProjects/placeBidding/:id").put(placeBidonAvailableProject) //place bidding router

// router.route("/increasebidcount").post(increasebidcount)

router.route("/addSubmission").post(addSubmission)

router.route("/deleteSubmission").delete(DeleteSubmission)

router.route("/viewSpecificSubmission").get(viewSpecificSubmission)

module.exports = router
