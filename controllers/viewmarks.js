const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const ProposalPresentationMarks = require('../models/Marks')
const jwt = require("jsonwebtoken");
const { Console } = require('console')



//view proposal presentation marks for particular student method 1
// exports.viewproposalpresentationmarks = async(req,res,next) => {
//     let token

//     if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
//         token = req.headers.authorization.split("")[1]
//     }
//     if(token == "null"){
//         logged(token,res)
//     }else{
//         console.log("This is the token :"+token)

//         if(token == null){
//             console.log("Please login !!")
//             res.status(201).json({
//                 success:true,
//                 data:"Data1/Data2/Data3/Data4"
//             })

//         }
//         else{
//             const decoded = jwt.verify(token,process.env.JWT_SECRET)
//             console.log(decoded+"fsddfs")
//             const user = await User.findById(decoded.id)
//             console.log(user.username+"jkl")

//             provengapmarks1=user.username
//             provengapmarks2=user.username
//             capabilitymarks1=user.username
//             capabilitymarks2=user.username
//             implementationmarks1=user.username
//             implementationmarks2=user.username
//             implementationmarks3=user.username
//             communicationmarks1=user.username
//             communicationmarks2=user.username
//             commercializationmarks1=user.username

//             try{
//                 const viewproposalpresentationmarks = await ProposalPresentationMarks.find([{provengapmarks1},{provengapmarks2},{capabilitymarks1},{capabilitymarks2},{implementationmarks1},{implementationmarks2},{implementationmarks3},{communicationmarks1},{communicationmarks2},{commercializationmarks1}])
//                 console.log(viewproposalpresentationmarks[0].extrafeedback)

//                 const setdata = viewproposalpresentationmarks[0].provengapmarks1+","+viewproposalpresentationmarks[0].provengapmarks2+","+viewproposalpresentationmarks[0].capabilitymarks1+","+viewproposalpresentationmarks[0].capabilitymarks2+","+viewproposalpresentationmarks[0].implementationmarks1+","+viewproposalpresentationmarks[0].implementationmarks2+","+viewproposalpresentationmarks[0].implementationmarks3+","+viewproposalpresentationmarks[0].communicationmarks1+","+viewproposalpresentationmarks[0].communicationmarks2+","+viewproposalpresentationmarks[0].commercializationmarks1
//                 res.status(201).json({
//                     success:true,
//                     data:setdata
//                 })
//             }catch(error){
//                 res.status(500).json({success:false,error:error.message})

//             }
//         }
//     }
// }

//view proposal presentation marks for logged in student method 2
exports.viewproposalpresentationmarks =async(req,res,next) => {
    //const{email}=req.body;
    
    let token//to retreive username in backend
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token == "null"){
        logged(token,res)
    }
    else{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        console.log(decoded)
        
        const user = await User.findById(decoded.id)
       const retrievestudentid = user.studentID //after iterating through all the records in the entermarks collection,check if retrievestudentid exists
                                                //in any of those records
                                                //if it does pass that all data (marks data) to the frontend
                                                //line 84 retrieves the logged in users student ID

        

   

        try{
     /*   const studentmarks = await User.findOne({
         email
         
        })*/
        // const marks = studentmarks.marks
        // console.log(marks)
        
        //first search how to use map to iterate through a collection in mongodb(how does map work)
        const studentIDs = await ProposalPresentationMarks.find()
        //iteration 
        
        console.log(studentIDs)
        res.status(201).json({
            success: true,
            data: user.marks
        })
        
    }catch(error){
        next(error)
    }
}
};