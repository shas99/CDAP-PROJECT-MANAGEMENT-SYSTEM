const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()


const {placeAnnouncement,getAnnouncement} = require('../controllers/announcement')

router.route("/setAnnouncement/:id").put(placeAnnouncement)//place announcement router
router.route("/getAnnouncement/:id").get(getAnnouncement)//get announcement router



module.exports = router