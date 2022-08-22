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
        //console.log(progresspresentation1Collection+"THis is array")
        
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
    //    console.log(retrievestudentid) 

        

   

        try{
        // console.log(retrievestudentid+"This is logged in std id")
        const statusDoc1Collection = await StatusDocument1Marks.findOne({studentIDs:retrievestudentid})
        //added by pasindu vinod
        const array = Object.values(statusDoc1Collection)
        // const arrayproject = JSON.stringify(array).split(',')
        // console.log("this is datas "+arrayproject)
    
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
    
        const studentPropReportCollection = await ProposalReportMarks.find()
    
        let matchentry2;
        const matchedID = studentPropReportCollection.map(collectionEntry =>{if(collectionEntry.studentIDs==retrievestudentid){
            console.log(collectionEntry)
            matchentry2=collectionEntry

        }}
        
        )

        const setmarksdata ="Proven gap A   "+"  "+":"+matchentry2.provengapmarks1+",  "
                            +"                                  "+",   "
                            +"Proven gap B  "+":"+" "+matchentry2.provengapmarks2+",  "
                            
                            +"Capability in applying knowledge A  "+" "+":"+"  "+matchentry2.capabilitymarks1+",  "
                            +"Capability in applying knowledge B  "+"  "+":"+"  "+matchentry2.capabilitymarks2+",  "
                            +"Solution implementation A  "+":"+"  "+matchentry2.implementationmarks1+",  "
                            +"Solution implementation B  "+":"+"  "+matchentry2.implementationmarks2+",  "
                            +"Solution implementation C  "+":"+"  "+matchentry2.implementationmarks3+",  "
                            +"Effective Communication A  "+":"+"  "+matchentry2.communicationmarks1+",  "
                            +"Effective Communication B  "+":"+"  "+matchentry2.communicationmarks2+",  "
                            +"Effective Communication C  "+":"+"  "+matchentry2.communicationmarks3+",  "
                            +"Ability of commercialization marks  "+":"+matchentry2.commercializationmarks1+",  "
                            +"Feedback  "+":"+matchentry2.extrafeedback+",  "
                            
       
        res.status(201).json({
            success: true,
           data:setmarksdata
                
           
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
    
        const studentProposalCollection = await ProposalPresentationMarks.find()
    
        let matchentry;
        const matchedID = studentProposalCollection.map(collectionEntry =>{if(collectionEntry.studentIDs==retrievestudentid){
            console.log(collectionEntry)
            matchentry=collectionEntry

        }}
        
        )

        const setmarksdata ="Proven gap A"+":"+matchentry.provengapmarks1+",  "
                            +"Proven gap B"+":"+matchentry.provengapmarks2+",  "
                            +"Capability in applying knowledge A"+":"+matchentry.capabilitymarks1+",  "
                            +"Capability in applying knowledge B"+":"+matchentry.capabilitymarks2+",  "
                            +"Solution implementation A"+":"+matchentry.implementationmarks1+",  "
                            +"Solution implementation B"+":"+matchentry.implementationmarks2+",  "
                            +"Solution implementation C"+":"+matchentry.implementationmarks3+",  "
                            +"Effective Communication A"+":"+matchentry.communicationmarks1+",  "
                            +"Effective Communication B"+":"+matchentry.communicationmarks2+",  "
                            +"Ability of commercialization marks"+":"+matchentry.commercializationmarks1+",  "
                            +"Feedback"+":"+matchentry.extrafeedback+",  "
                            
       
        res.status(201).json({
            success: true,
           data:setmarksdata
                
           
        })
        
    }catch(error){
        next(error)
    }
}
};








