const express = require("express");
const router = express.Router();

const { getPrivateData, addmarks, addproposalreportmarks } = require("../controllers/staffPrivate");

const { protect } = require("../middleware/staffAuth");


//add marks route
//router.route("/staffPrivate").get(protect,addmarks)

//add marks
router.route("/addmarks").post(addmarks)

//add propsal report marks
router.route("/addproposalreportmarks").post(addproposalreportmarks)




router.route("/staffPrivate").get(protect, getPrivateData);


module.exports = router;