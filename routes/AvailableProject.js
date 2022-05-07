const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewAvailableProjects,viewspecificproject,placeBidonAvailableProject} = require('../controllers/AvailableProject')


router.route("/availableProjects").get(viewAvailableProjects) //router for View Available Projects
router.route("/availableProjects/:id").get(viewspecificproject)  //router for viewing specific project
router.route("/availableProjects/placeBidding/:id").post(placeBidonAvailableProject) //place bidding router

module.exports = router
