const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {proposalMarkingConfiguration,viewProposalMarkingDetails,proposalReportMarkingConfiguration,viewProposalReportMarkingDetails,statusDocumentMarkingConfiguration,viewStatusDocumentMarkingDetails} = require('../controllers/MarkingRubrik')


//Proposal Presentation Routes
router.route("/proposalMarkingConfiguration/update/:id").put(proposalMarkingConfiguration)
router.route("/proposalMarkingConfiguration/:id").get(viewProposalMarkingDetails)

//Proposal Report Routes
router.route("/proposalReportMarkingConfiguration/update/:id").put(proposalReportMarkingConfiguration)
router.route("/proposalReportMarkingConfiguration/:id").get(viewProposalReportMarkingDetails)

//Status Document 01 Routes
router.route("/statusDocumentMarkingConfiguration/update/:id").put(statusDocumentMarkingConfiguration)
router.route("/statusDocumentMarkingConfiguration/:id").get(viewStatusDocumentMarkingDetails)


module.exports = router


