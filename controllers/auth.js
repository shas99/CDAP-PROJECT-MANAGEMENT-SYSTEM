const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const Group = require('../models/Group')
const jwt = require("jsonwebtoken");
const { Console } = require('console')



exports.register = async(req,res,next) => {
    const {username, email, password} = req.body
    
    
    try{

        const user = await User.create({
            username,email,password
        })
        

        sendToken(user, 201, res)
    }catch(error){
        next(error)
    }
};
//first change

//To view feedback
exports.viewfeedback =async(req,res,next) => {


    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token =="null"){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
    console.log(user.feedback)
    // const{email}=req.body;
    
    try{
        


        
        
        res.status(201).json({
            success: true,
            data: user.feedback
        })
    }catch(error){
        next(error)
    }
}
};


// old view marks method

exports.viewmarks =async(req,res,next) => {
    //const{email}=req.body;
    
    let token//to retreive username in backend
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token){
        logged(token,res)
    }
    else{
    const decoded = jwt.verify(token,process.env.JWT_SECRET)


    const user = await User.findById(decoded.id)
   

    try{
     /*   const studentmarks = await User.findOne({
            email

        })*/
        // const marks = studentmarks.marks
        // console.log(marks)
        res.status(201).json({
            success: true,
            data: user.marks
        })
        
    }catch(error){
        next(error)
    }
}
};




exports.login = async (req, res, next) => {
    const {email,password} = req.body
    
    if(!email || !password){
       return next(new ErrorResponse("Please provide an email and password",400))
    }

    try{
        const user = await User.findOne({email}).select("+password")

        if(!user){
            return next(new ErrorResponse("Invalid Credentials",401))
        }
        
        const isMatch = await user.matchPasswords(password);

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
        const user = await User.findOne({email})

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

exports.groupregister = async(req,res,next) => {//group registration
    const {member_1, member_2,member_3,member_4,member_5} = req.body

    
    
    try{
        const group = await Group.create({
            member_1,member_2,member_3,member_4,member_5//new
        })
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


        const setdata = group[0].member_1+", "+group[0].member_2+", "+group[0].member_3+", "+group[0].member_4+", "+group[0].member_4+"/"+group[0].suggestions
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