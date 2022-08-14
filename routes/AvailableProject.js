const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()


const {viewAvailableProjects,viewspecificproject,increasebidcount,placeBidonAvailableProject,StudentBidding} = require('../controllers/AvailableProject')



router.route("/availableProjects").get(viewAvailableProjects) //router for View Available Projects
router.route("/availableProjects/:id").get(viewspecificproject)  //router for viewing specific project
router.route("/availableProjects/placeBidding/:id").put(placeBidonAvailableProject) //place bidding router
router.route("/bid").post(StudentBidding) //router for create bid

router.route("/increasebidcount").post(increasebidcount)



module.exports = router
