const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {proposalMarkingConfiguration,viewProposalMarkingDetails} = require('../controllers/MarkingRubrik')

//export the api

router.route("/proposalMarkingConfiguration/update/:id").put(proposalMarkingConfiguration)
router.route("/proposalMarkingConfiguration/:id").get(viewProposalMarkingDetails)

module.exports = router


