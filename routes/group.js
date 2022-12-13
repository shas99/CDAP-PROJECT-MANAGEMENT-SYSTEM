const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {viewAvailableGroupsPanel,GroupregisterConfirm,groupregister,suggestsupervisor,group,topicregister,autoapprove,viewAvailableGroups,viewgroup,viewAvailableGroupsAdmin} = require('../controllers/group')
const {placeBid,showSupervisors,bidProject,ProjectBID,SupervisorBID,supervisorStatus,viewStudentTAF,viewStudentProjectBids,StaffViewBiddings,StaffViewPBiddings,AcceptBid,AcceptPBid,TAFFeed} = require('../controllers/supervisors')


router.route("/groupconfirm/:resetToken").put(GroupregisterConfirm)

router.route("/groupregister").post(groupregister)//Group reg route

router.route("/suggestsupervisor").get(suggestsupervisor)//suggested supervisor
router.route("/placebid").post(placeBid) //planned use for supervisor biddings
router.route("./bidProject").post(bidProject) //uses for project biddings

router.route("/group").get(group)//to view marks

router.route("/topicregister").post(topicregister)

//add marks route
router.route("/add")

router.route("/autoapprove/:resetToken").put(autoapprove)

router.route("/viewgroups").post(viewAvailableGroups)//view groups

router.route("/viewgroup/:id").get(viewgroup)



// new routes for bidding
router.route("/bidonproject").post(ProjectBID)       //Available project bidding
router.route("/supervisorBID").post(SupervisorBID)   //Bid for supervisor
router.route("/showSupervisors").get(showSupervisors)//show supervisors from staff cluster

//bidding status
router.route("/supervisorStatus").post(supervisorStatus) //check about previous bids and approved supervisors

//show TAF biddings on student
router.route("/viewStudentTAF").post(viewStudentTAF)
router.route("/viewStudentProjectBids").post(viewStudentProjectBids)

//view all biddings staff
router.route("/staffViewBiddings").post(StaffViewBiddings)
router.route("/staffViewPBiddings").post(StaffViewPBiddings)

//accept taf bids
router.route("/acceptBid/:id").put(AcceptBid)
//accept project bids
router.route("/acceptpBid/:id").put(AcceptPBid)

//TAF feedback
router.route("/TAFFeed").put(TAFFeed)

//panel view group
router.route("/viewAvailableGroupsPanel").post(viewAvailableGroupsPanel)

router.route("/viewAvailableGroupsAdmin").post(viewAvailableGroupsAdmin)


module.exports = router