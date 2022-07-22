const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()


const {viewAvailableProjects,viewspecificproject,increasebidcount,placeBidonAvailableProject ,updateProjectDetails,deleteProjectDetails,createProjectDetails} = require('../controllers/AvailableProject')



router.route("/availableProjects").get(viewAvailableProjects) //router for View Available Projects
router.route("/availableProjects/:id").get(viewspecificproject)  //router for viewing specific project
router.route("/availableProjects/placeBidding/:id").put(placeBidonAvailableProject) //place bidding router
router.route("/increasebidcount").post(increasebidcount)

//edit existing available project details
router.route("/updateProjectDetails/:id").put(updateProjectDetails)
//delete existing available project details
router.route("/deleteProjectDetails/:id").delete(deleteProjectDetails)
//add new available project details
router.route("/addProjectDetails").post(createProjectDetails)

module.exports = router
