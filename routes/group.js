const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {GroupregisterConfirm,groupregister,suggestsupervisor,group,topicregister,autoapprove,viewAvailableGroups,viewgroup} = require('../controllers/group')
const {viewAvailableSupervisors} = require('../controllers/supervisors')

router.route("/groupconfirm/:resetToken").put(GroupregisterConfirm)

router.route("/groupregister").post(groupregister)//Group reg route

router.route("/suggestsupervisor").get(suggestsupervisor)//suggested supervisor
router.route("/viewAvailableSupervisors").get(viewAvailableSupervisors)

router.route("/group").get(group)//to view marks

router.route("/topicregister").post(topicregister)

//add marks route
router.route("/add")

router.route("/autoapprove/:resetToken").put(autoapprove)

router.route("/viewgroups").get(viewAvailableGroups)//view groups

router.route("/viewgroup/:id").get(viewgroup)

module.exports = router