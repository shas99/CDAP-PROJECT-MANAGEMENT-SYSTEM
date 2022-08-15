const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {GroupregisterConfirm,groupregister,suggestsupervisor,group,topicregister,autoapprove,viewAvailableGroups,viewgroup} = require('../controllers/group')
const {placeBid,showSupervisors} = require('../controllers/supervisors')


router.route("/groupconfirm/:resetToken").put(GroupregisterConfirm)

router.route("/groupregister").post(groupregister)//Group reg route

router.route("/suggestsupervisor").get(suggestsupervisor)//suggested supervisor
router.route("/placebid").post(placeBid) //planned use for biddings
router.route("/showSupervisors").get(showSupervisors)//show supervisors from staff cluster

router.route("/group").get(group)//to view marks

router.route("/topicregister").post(topicregister)

//add marks route
router.route("/add")

router.route("/autoapprove/:resetToken").put(autoapprove)

router.route("/viewgroups").get(viewAvailableGroups)//view groups

router.route("/viewgroup/:id").get(viewgroup)

module.exports = router