// const express = require('express');
// const { route } = require('express/lib/application');
// const router = express.Router()
// const { register,login,forgotpassword,resetpassword} = require('../controllers/auth')


// router.route("/register").post(register)

// router.route("/login").get(login)

// router.route("/forgotpassword").post(forgotpassword)

// router.route("/resetpassword/:resetToken").put(resetpassword)

// // router.route("/OTP").put(OTP)


// module.exports = router


  
const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router()
const { register,login,forgotpassword,resetpassword,registerwithExcel} = require('../controllers/auth')


router.route("/register").post(register)

router.route("/login").post(login)

router.route("/forgotpassword").post(forgotpassword)

router.route("/resetpassword/:resetToken").put(resetpassword)

router.route("/registerwithExcel").post(registerwithExcel)


module.exports = router