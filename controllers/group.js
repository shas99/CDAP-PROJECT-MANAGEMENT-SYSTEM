const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Group = require('../models/Group')
const jwt = require("jsonwebtoken");
const { Console } = require('console')
const Mail = require('nodemailer/lib/mailer')
const TopicReg = require("../models/TopicReg")

exports.GroupregisterConfirm = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest
    ("hex")
    const {token} = req.body
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    const user = await User.findById(decoded.id)
    
    console.log("toooooo"+user)
    const username = user.username
    try{
        console.log("goupregID"+req.params.resetToken)
        
        const group = await Group.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()},

        })
        if(!group){
            return next(new ErrorResponse("Invalid Reset Token",400))
        }
        if(username == group.member_1){
            group.mem1_approve = true
        }else if(username == group.member_2){
            group.mem2_approve = true
        }else if(username == group.member_3){
            group.mem3_approve = true
        }else if(username == group.member_4){
            group.mem4_approve = true
        }else if(username == group.member_5){
            group.mem5_approve = true
        }

       
        console.log(group+"this is group")
        await group.save()
        
        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })
        
    }catch(error){
        next(error)
    }
    
}

exports.groupregister = async(req,res,next) => {//group registration
    const {member_1, member_2,member_3,member_4,member_5} = req.body

    const mem1_approve = false
    const mem2_approve = false
    const mem3_approve = false
    const mem4_approve = false
    const mem5_approve = false
    const g_approval = false
    try{
        const group = await Group.create({
            member_1,member_2,member_3,member_4,member_5,mem1_approve,mem2_approve,mem3_approve,mem4_approve,mem5_approve,g_approval//new
        })
        var email = []
        email[0] = member_1
        email[1] = member_2
        email[2] = member_3
        email[3] = member_4
        email[4] = member_5
        
        const resetToken = group.getResetPasswordToken()
        const resetUrl = `https://cdap-app.herokuapp.com/groupconfirm/${resetToken}`
        

        for(var i =0;i<5;i++){
            console.log("testing"+email[i]);
            
            await group.save()
            mail(email[i],resetUrl,email[0])

        }

        
        res.status(201).json({
            success: true,
            data: "Submission Success"
        })

    }catch(error){
        next(error)
    }
};

exports.suggestsupervisor = async (req, res, next) => {//suggest supervisor
    const {member_1} = req.body


    const g_approval =true//check if group is approved by coordinator

    try{

        const group = await Group.find({g_approval,member_1})//group that is approved and have this perticular member
        console.log(group[0].suggestions)// 

        res.status(201).json({
            success: true,
            data: "retreived success"
        })

        

    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    
};

exports.group = async (req, res, next) => {//suggest supervisor
    // const {member_1} = req.body
    
    let token//to retreive username in backend
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }
    if(token == "null"){
        logged(token,res)
    }else{
        console.log("This is the token : "+token)
        
    if(token == null){
        console.log("Please login !!")
        res.status(201).json({
            success: true,
            data: "Data1/Data2/Data3/Data4"
        })
    }
    else{
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log(decoded+"fdofjd")
    const user = await User.findById(decoded.id)
    console.log(user.username+"jkl")
    
    member_1=user.username//this line should be assigned back to current user's username
    member_2=user.username
    member_3=user.username
    member_4=user.username
    member_5=user.username
    const g_approval =true//check if group is approved by coordinator
    
    try{
        
        const group = await Group.find({g_approval,$or:[{member_1},{member_2},{member_3},{member_4},{member_5}]})//group that is approved and have this perticular member
        console.log(group[0].g_members+"fffggdf")

        console.log(group[0].suggestions)// 


        const setdata = group[0].member_1+", "+group[0].member_2+", "+group[0].member_3+", "+group[0].member_4+", "+group[0].member_5+"/"+group[0].suggestions
        res.status(201).json({
            success: true,
            data: setdata
        })



    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    }

}
};




exports.topicregister = async(req,res,next) => {//group registration
    const {groupleader,groupID,topic_1,topic_2,topic_3,topic_4,topic_5} = req.body

    
    console.log("Error Finding"+groupleader)
    try{
        const topicR = await TopicReg.create({
            groupleader,groupID,topic_1,topic_2,topic_3,topic_4,topic_5//new
        })
        res.status(201).json({
            success: true,
            data: "Submission Success"
        })

    }catch(error){
        next(error)
    }
};

exports.autoapprove = async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest
    ("hex")
    try{
        console.log("goupregID"+req.params.resetToken)
        
        const group = await Group.findOne({
            resetPasswordToken,
            resetPasswordExpire:{$gt: Date.now()}
        })
        if(!group){
            return next(new ErrorResponse("Invalid Reset Token",400))
        }
        if(group.mem1_approve == true && group.mem2_approve == true && group.mem3_approve == true && group.mem4_approve == true && group.mem5_approve == true){
            group.g_approval = true
        }
        console.log(group+"this is group")
        await group.save()
        
        res.status(201).json({
            success: true,
            data: "Password Reset Success"
        })
        
    }catch(error){
        next(error)
    }
    
}



const logged = (token,res) => {//check if token is null
    if(token == "null"){
        console.log("You are not logged in")
        res.status(500).json({success:false})
    }
}

const mail = async(email,resetUrl,leader) => {
    const message = `<h1>CDAP PROJECT MANAGEMENT SYSTEM</h1>
    <h3>Hello ${email}</h3>
    <p>${leader} is inviting you to join their team</p>
    <p>Group registration ID: ${resetUrl}</p>
    <p>Thank you,<br/> Best Regards <br/> Developer Team
    </p>`
    await sendEmail({
        to:`${email}@my.sliit.lk`,
        subject:"Password Reset Request",
        text: message
    })
}
