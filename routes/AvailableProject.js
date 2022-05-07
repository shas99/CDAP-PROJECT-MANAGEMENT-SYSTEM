const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewAvailableProjects,viewspecificproject} = require('../controllers/AvailableProject')


router.route("/availableProjects").get(viewAvailableProjects) //router for View Available Projects


router.route("/viewspecificproject").get(viewspecificproject)

module.exports = router
