const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()

const {GroupregisterConfirm,groupregister,suggestsupervisor,group,topicregister} = require('../controllers/group')

router.route("/groupconfirm/:resetToken").put(GroupregisterConfirm)

router.route("/groupregister").post(groupregister)//Group reg route

router.route("/suggestsupervisor").get(suggestsupervisor)//suggested supervisor

router.route("/group").get(group)//to view marks

router.route("/topicregister").post(topicregister)

module.exports = router