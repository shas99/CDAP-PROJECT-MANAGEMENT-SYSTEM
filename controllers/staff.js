const crypto = require('crypto')
const Staff = require('../models/Staff')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Group = require('../models/Group')
const jwt = require("jsonwebtoken");
const { Console } = require('console')
const TopicReg = require('../models/TopicReg')
const StaffTopicInterestings = require('../models/StaffTopicInterestings')



exports.register = async(req,res,next) => {
    const {username, email, password} = req.body
    try{
        const user = await Staff.create({
            username,email,password
        })
        sendToken(user, 201, res)
    }catch(error){
        next(error)
    }
};



exports.login = async (req, res, next) => {
    const {email,password} = req.body
    
    if(!email || !password){
       return next(new ErrorResponse("Please provide an email and password",400))
    }
    try{
        const user = await Staff.findOne({email}).select("+password")
        
        if(!user){
            return next(new ErrorResponse("Invalid Credentials",401))
        }
        
        const isMatch = await user.matchPasswords(password);
        console.log(user)

        if(!isMatch){
            return next(new ErrorResponse("Invalid Credentials",401))
        }
        
        sendToken(user, 200, res)
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }

};

exports.forgotpassword = async(req, res, next) => {
    const {email} = req.body
    
    try{
        const user = await Staff.findOne({email})

        if(!user){
            return next(new ErrorResponse("Email could not be set",404))
        }

        const resetToken = user.getResetPasswordToken()
    await user.save()
    
    const resetUrl = `https://cdap-app.herokuapp.com/passwordreset/${resetToken}`
  
    const message = `<h1>CDAP PROJECT MANAGEMENT SYSTEM</h1>
    <h3>Hello ${email} ,</h3>
    <p>Please go to this link to reset your password</p>
    <a href=${resetUrl} clicktracking=off>${resetUrl}</a>
    <p>Thank you,<br/> Best Regards <br/> Developer Team
    </p>
    `
    
    try{
        await sendEmail({
            to:user.email,
            subject:"Password Reset Request",
            text: message
        })
        
        res.status(200).json({success:true,data:"Passowrd reset link sent"})
    }catch(error){
        user.getResetPasswordToken = undefined
        user.resetPasswordExpire = undefined

        await user.save()

        return next(new ErrorResponse("Email could not be send",500))
        

    }

    }catch(error){
            
        next(error)
    }
};

exports.resetpassword = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest
    ("hex")

    try{

        const user = await User.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })
        if(!user){
            return next(new ErrorResponse("Invalid Reset Token",400))
        }
        user.password = req.body.password
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        
        await user.save()

        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })

    }catch(error){
        next(error)
    }
}

exports.StaffRecommendationForm = async(req,res,next) => { //Staff Recommendation Form
    console.log("Staff recommendation api run")
    const {StaffID,Q1,Q2,Q3,Q4,Q5,Q6,Q7} = req.body
    try{
        const user = await StaffTopicInterestings.create({
            StaffID,Q1,Q2,Q3,Q4,Q5,Q6,Q7
            
        })
        console.log("Staff recommendation success")
        // sendToken(user, 201, res)
    }catch(error){
        next(error)
        console.log("Staff recommendation error")
    }
};


exports.retreiveStaff = async (req, res, next) => {//suggest supervisor
    // const {member_1} = req.body


    // const g_approval =true//check if group is approved by coordinator

    try{

        const staff = await Staff.find({})//group that is approved and have this perticular member
        // console.log(group[0].suggestions)// 
      
        res.status(201).json({
            data: staff,
            success: "retreived success"
        })

        

    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    
};

exports.assignStaff = async (req, res, next) => {//assign staff

    const {id,groupID} = req.body
    try{
console.log(groupID)
        const group = await Group.findById(groupID)
        group.staff.push(id)
        const staff = await Staff.findById(id)
     group.save()
    //   console.log(staff)
        res.status(201).json({
            data: staff,
            success: "retreived success"
        })

        

    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    
};



const sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken()
    res.status(statusCode).json({success: true,token})
    
}


const logged = (token,res) => {//check if token is null
    if(token == "null"){
        console.log("You are not logged in")
        res.status(500).json({success:false})
    }
}