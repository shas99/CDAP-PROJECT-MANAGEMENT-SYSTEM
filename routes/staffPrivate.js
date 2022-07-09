const express = require("express");
const router = express.Router();

const { getPrivateData, addmarks, addproposalreportmarks, addstatusdocument1marks } = require("../controllers/staffPrivate");

const { protect } = require("../middleware/staffAuth");


//add marks route
//router.route("/staffPrivate").get(protect,addmarks)

//add marks
router.route("/addmarks").post(addmarks)

//add propsal report marks
router.route("/addproposalreportmarks").post(addproposalreportmarks)

//add status document 1 marks
router.route("/addstatusdocument1marks").post(addstatusdocument1marks)






router.route("/staffPrivate").get(protect, getPrivateData);


module.exports = router;