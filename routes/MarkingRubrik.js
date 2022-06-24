const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {proposalMarkingConfiguration,viewProposalMarkingDetails,proposalReportMarkingConfiguration,viewProposalReportMarkingDetails} = require('../controllers/MarkingRubrik')


//Proposal Presentation Routes
router.route("/proposalMarkingConfiguration/update/:id").put(proposalMarkingConfiguration)
router.route("/proposalMarkingConfiguration/:id").get(viewProposalMarkingDetails)

//Proposal Report Routes
router.route("/proposalReportMarkingConfiguration/update/:id").put(proposalReportMarkingConfiguration)
router.route("/proposalReportMarkingConfiguration/:id").get(viewProposalReportMarkingDetails)

module.exports = router


