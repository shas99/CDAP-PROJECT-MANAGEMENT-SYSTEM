const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()


const {placeAnnouncement} = require('../controllers/announcement')

router.route("/setAnnouncement/:id").put(placeAnnouncement) //place announcement router



module.exports = router