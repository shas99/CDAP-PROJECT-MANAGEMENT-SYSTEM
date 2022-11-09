const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {addRubrics,proposalMarkingConfiguration,viewProposalMarkingDetails,proposalReportMarkingConfiguration,viewProposalReportMarkingDetails,statusDocumentMarkingConfiguration,viewStatusDocumentMarkingDetails,progressPresentationMarkingConfiguration,ViewProgressPresentationMarkingDetails} = require('../controllers/MarkingRubrik')


//Proposal Presentation Routes
router.route("/proposalMarkingConfiguration/update/:id").put(proposalMarkingConfiguration)
router.route("/proposalMarkingConfiguration/:id").get(viewProposalMarkingDetails)

//Proposal Report Routes
router.route("/proposalReportMarkingConfiguration/update/:id").put(proposalReportMarkingConfiguration)
router.route("/proposalReportMarkingConfiguration/:id").get(viewProposalReportMarkingDetails)

//Status Document 01 Routes
router.route("/statusDocumentMarkingConfiguration/update/:id").put(statusDocumentMarkingConfiguration)
router.route("/statusDocumentMarkingConfiguration/:id").get(viewStatusDocumentMarkingDetails)

//Progress Presentation 01 Routes
router.route("/progressPresentationMarkingConfiguration/update/:id").put(progressPresentationMarkingConfiguration)
router.route("/progressPresentationMarkingConfiguration/:id").get(ViewProgressPresentationMarkingDetails)

//customisable rubrics
router.route("/addRubrics").post(addRubrics)

module.exports = router


