const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewfeedback,viewmarks} = require('../controllers/student')


router.route("/viewfeedback").get(viewfeedback)//to view feedback

router.route("/viewmarks").get(viewmarks)//to view marks

module.exports = router