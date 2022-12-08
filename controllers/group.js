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
    const {member_1, member_2,member_3,member_4} = req.body

    const mem1_approve = false
    const mem2_approve = false
    const mem3_approve = false
    const mem4_approve = false

    const g_approval = false


    
    try{


            //find out the month
            let month = new Date().getMonth() + 1
            let year = new Date().getFullYear()
    
            let batch
            //count of the groups collection in mongdb cloud
            const count = await Group.countDocuments()


            if(month < 5){
                //make year string and set to batch
                batch = year.toString() + "-" + count.toString()
                //find the count of the group collection


            }
            else{
                //get the last two digits of year
                let lastTwo = year.toString().slice(2)
                batch = year + "/" +(parseInt(lastTwo) + 1).toString()+"J"+ "-" + count.toString()
                
            }



        const group = await Group.create({

            member_1,member_2,member_3,member_4,mem1_approve,mem2_approve,mem3_approve,mem4_approve,g_approval,batch//new

        })
        var email = []
        email[0] = member_1
        email[1] = member_2
        email[2] = member_3
        email[3] = member_4

        
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

    const g_approval =true//check if group is approved by coordinator

    try{
        
        const group = await Group.find({g_approval,$or:[{member_1},{member_2},{member_3},{member_4}]})//group that is approved and have this perticular member
        console.log(group[0].g_members+"fffggdf")

        console.log(group[0].suggestions)// 

        const bio = group[0].bio
        console.log(bio)
        const setdata = group[0].member_1+", "+group[0].member_2+", "+group[0].member_3+", "+group[0].member_4+"/"+group[0].suggestions+"/"+group[0].bio
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




exports.topicregister = async(req,res,next) => {//topic registration
    const {groupID,Topic,topicdescription,abstract,researchProblem,solution,systemOverview,objective,projecttask,technologies} = req.body
    // const car = {type:"Fiat", model:"500", color:"white"};

    
    console.log("Error Finding"+groupID)
    try{
        const topicR = await TopicReg.create({
           groupID,Topic,topicdescription,abstract,researchProblem,solution,systemOverview,objective,projecttask,technologies
        //    car
        })
        console.log(topicR._id);
        res.status(201).json({
            success: true,
            data: topicR._id
        })

        // alert("Submission Successfull")

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
        if(group.mem1_approve == true && group.mem2_approve == true && group.mem3_approve == true && group.mem4_approve == true){
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

//retreive all groups
exports.viewAvailableGroups =async(req,res,next) => {
    
    try{
    

        const {sID} = req.body
        const group = await Group.find()//group that is approved and have this perticular member
        //console.log(availableProjects[1])// 
        const array = Object.values(group)
        console.log("Groups: "+array)
        // console.log(array)
        // const arrayproject = JSON.stringify(array).split(',')
        // console.log(arrayproject)
        // console.log(typeof arrayproject)
    
        res.status(201).json({
            success: true,
            data: array
        })
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }

}


//view specific group
exports.viewgroup = async (req, res, next) => {

    

    try{
        console.log(req.params.id)
        const group = await Group.findById(req.params.id)
        // console.log(group+"fffggdf")


        res.status(201).json({
            success: true,
            data: group
        })
        


    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }



};



// exports.retreiveBio = async (req, res, next) => {//suggest supervisor
//     // const {member_1} = req.body
    
//     let token//to retreive username in backend
    
//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
//         token = req.headers.authorization.split(" ")[1]
//     }
//     if(token == "null"){
//         logged(token,res)
//     }else{
//         console.log("This is the token : "+token)
        
//     if(token == null){
//         console.log("Please login !!")
//         res.status(201).json({
//             success: true,
//             data: "Data1/Data2/Data3/Data4"
//         })
//     }
//     else{
    
//     const decoded = jwt.verify(token,process.env.JWT_SECRET)
//     console.log(decoded+"fdofjd")
//     const user = await User.findById(decoded.id)
//     console.log(user.username+"jkl")
    
//     member_1=user.username//this line should be assigned back to current user's username
//     member_2=user.username
//     member_3=user.username
//     member_4=user.username
//     member_5=user.username
//     const g_approval =true//check if group is approved by coordinator

//     try{
        
//         const group = await Group.find({g_approval,$or:[{member_1},{member_2},{member_3},{member_4},{member_5}]})//group that is approved and have this perticular member
//         console.log(group[0].g_members+"fffggdf")

//         console.log(group[0].suggestions)// 


//         const setdata = group[0].member_1+", "+group[0].member_2+", "+group[0].member_3+", "+group[0].member_4+", "+group[0].member_5+"/"+group[0].suggestions
//         res.status(201).json({
//             success: true,
//             data: setdata
//         })



//     }catch(error){
//         res.status(500).json({success:false, error:error.message})
//     }
//     }

// }
// };



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


