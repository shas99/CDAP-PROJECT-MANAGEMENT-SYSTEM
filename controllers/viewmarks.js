const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const sendEmail = require('../utils/sendEmail')
const ProgressPresentation1Marks = require('../models/ProgressPresentation1Marks')
const ProposalPresentationMarks = require('../models/Marks')
const ProposalReportMarks = require('../models/ProposalReportMarks')
const StatusDocument1Marks = require('../models/StatusDocument1Marks')

const jwt = require("jsonwebtoken");
const { Console } = require('console')

//view progress presentation 1 marks for logged in student method

exports.viewprogresspresentation1marks =async(req,res,next) => {
   
    
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
       const retrievestudentid = user.studentID
       console.log(retrievestudentid) 


        try{
    
        const progresspresentation1Collection = await ProgressPresentation1Marks.findOne({studentIDs:retrievestudentid})
        
        res.status(201).json({
            success: true,
           data:progresspresentation1Collection
           
        })
        
    }catch(error){
        next(error)
    }
}
};




//view status document 1 marks for logged in student method
exports.viewstatusdocument1marks =async(req,res,next) => {
   
    
    let token//to retreive username in backend
    
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    if(token == "null"){
        logged(token,res)
    }
    else{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        // console.log(decoded)
        
        const user = await User.findById(decoded.id)
       const retrievestudentid = user.studentID   

        try{
        // console.log(retrievestudentid+"This is logged in std id")
        const statusDoc1Collection = await StatusDocument1Marks.findOne({studentIDs:retrievestudentid})
        //added by pasindu vinod
        const array = Object.values(statusDoc1Collection)
            
        //Buddhisha old part deleted by pasindu
                           
       
        res.status(201).json({
            success: true,
        //    data:setmarksdata
            data:statusDoc1Collection
                
           
        })
        
    }catch(error){
        next(error)
    }
}
};



//View proposal report marks for logged in student method
exports.viewproposalreportmarks =async(req,res,next) => {
   
    
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
       const retrievestudentid = user.studentID
       console.log(retrievestudentid) 

        try{
    
        const studentPropReportCollection = await ProposalReportMarks.findOne({studentIDs:retrievestudentid})
                   
       
        res.status(201).json({
            success: true,
           data:studentPropReportCollection
                
           
        })
        
    }catch(error){
        next(error)
    }
}
};



//view proposal presentation marks for logged in student method 
exports.viewproposalpresentationmarks =async(req,res,next) => {
   
    
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
       const retrievestudentid = user.studentID
       console.log(retrievestudentid) 

        try{
    
        const studentProposalCollection = await ProposalPresentationMarks.findOne({studentIDs:retrievestudentid})
        //console.log(studentProposalCollection+"This is proposal presentation marks")  
                                   
       
        res.status(201).json({
            success: true,
           data:studentProposalCollection
                
           
        })
        
    }catch(error){
        next(error)
    }
}
};








