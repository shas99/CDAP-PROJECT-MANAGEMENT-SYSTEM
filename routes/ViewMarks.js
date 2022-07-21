const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewproposalpresentationmarks,viewproposalreportmarks, viewstatusdocument1marks} = require('../controllers/viewmarks')

router.route("/viewproposalpresentationmarks").get(viewproposalpresentationmarks)

router.route("/viewproposalreportmarks").get(viewproposalreportmarks)

router.route("/viewstatusdocument1marks").get(viewstatusdocument1marks)
module.exports = router