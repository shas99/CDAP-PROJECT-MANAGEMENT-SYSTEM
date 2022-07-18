const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewproposalpresentationmarks,viewproposalreportmarks} = require('../controllers/viewmarks')

router.route("/viewproposalpresentationmarks").get(viewproposalpresentationmarks)

router.route("/viewproposalreportmarks").get(viewproposalreportmarks)

module.exports = router