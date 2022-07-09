const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewproposalpresentationmarks} = require('../controllers/viewmarks')

router.route("/viewproposalpresentationmarks").get(viewproposalpresentationmarks)

module.exports = router