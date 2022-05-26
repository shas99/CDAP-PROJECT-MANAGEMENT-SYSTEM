const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()
const { register,login,forgotpassword,resetpassword,OTP} = require('../controllers/auth')


router.route("/register").post(register)

router.route("/login").put(login)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/OTP").put(OTP)


module.exports = router