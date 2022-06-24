const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {proposalMarkingConfiguration} = require('../controllers/MarkingRubrik')

//export the api

router.route("/proposalMarkingConfiguration/:id").put(proposalMarkingConfiguration)

module.exports = router


