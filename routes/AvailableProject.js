const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewAvailableProjects,viewspecificproject,increasebidcount} = require('../controllers/AvailableProject')


router.route("/availableProjects").get(viewAvailableProjects) //router for View Available Projects


router.route("/availableProjects/:id").get(viewspecificproject)

router.route("/increasebidcount").post(increasebidcount)



module.exports = router
