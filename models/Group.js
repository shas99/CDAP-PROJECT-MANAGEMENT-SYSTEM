const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { groupregister } = require('../controllers/auth')
const crypto = require('crypto')

const GroupSchema = new mongoose.Schema({//Group model

    member_1: {
        type: String
    },
    member_2: {
        type: String
    },
    member_3: {
        type: String
    },
    member_4: {
        type: String
    },
    member_5: {
        type: String
    },
    g_approval:{
        type:Boolean
    },
    suggestions:
    {
        type:String
    },
    g_members:
    {
        type:Array
    },
    mem1_approve:{
        type: Boolean
    },
    mem2_approve:{
        type: Boolean
    },
    mem3_approve:{
        type: Boolean
    },
    mem4_approve:{
        type: Boolean
    },
    mem5_approve:{
        type: Boolean
    },
  
    resetPasswordToken: String,
    resetPasswordExpire: Date

})


GroupSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}

GroupSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 10 * (60 * 1000); // Ten Minutes
  
    return resetToken;
  };


const Group = mongoose.model("Group", GroupSchema)

module.exports = Group