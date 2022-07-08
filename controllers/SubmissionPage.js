const { Batch } = require('aws-sdk');
const mongoose = require('mongoose');

const SubmissionPage = require('../models/SubmissionPage')
const User = require('../models/User')
const jwt = require("jsonwebtoken");
const Form = require("../models/SubmissionForm")




//*******VIEW AVAILABLE Submissions API *******
exports.viewAvailableSubmissions =async(req,res,next) => {
try{


    const availableSubmissions = await SubmissionPage.find()//group that is approved and have this perticular member
    //console.log(availableProjects[1])// 
    const array = Object.values(availableSubmissions)
    //console.log(availableSubmissions);
    const arraySubmission = JSON.stringify(array).split(',')
    // console.log(arrayproject)
    // console.log(typeof arrayproject)
    console.log(array)
    res.status(201).json({
        success: true,
        data: array
    })
    

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};

// //***** VIEW SPECIFIC PROJECT API******** 
// exports.viewspecificproject = async(req,res,next) => {
//     console.log(req.params.id)
//     try{
//         const availableprojectid = req.params.id;
//         const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
//         // console.log("Projects bidding details :",availableProjects.bidding)
//         res.status(201).json({
//             success: true,
//             availableProjects
//         })
//     }catch(error){
//         res.status(500).json({success:false, error:error.message})
//     }
// }



//get batch id
exports.viewBatchID =async(req,res,next) => {


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
    console.log(user.BatchID)
    // const{email}=req.body;
    
    try{
        res.status(201).json({
            success: true,
            data: user.BatchID
        })
    }catch(error){
        next(error)
    }
}
};


//***** VIEW SPECIFIC PROJECT API******** 
exports.viewspecificSubmission = async(req,res,next) => {
    //console.log(req.params.id)
    try{
        const availablesubmissionid = req.params.id;
        console.log(availablesubmissionid+"Success")
        const availableSubmissions = await SubmissionPage.findById(availablesubmissionid)//group that is approved and have this perticular membe
        // console.log("Projects bidding details :",availableProjects.bidding)
        res.status(201).json({
            success: true,
            data:availableSubmissions
        })
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}



//Create entries for submissions
exports.submissionForm = async(req,res,next) => {
    const {entries} = req.body
    try{
        const form = await Form.create({
            entries
        })
        res.status(201).json({
            success: true,
            data:form
        })
    }catch(error){
        next(error)
    }
};

//create new submission
exports.addSubmission =async(req,res,next) => {
    const {BatchID,visibility,Heading,Description,Fields} = req.body
    
    try{
        const user = await SubmissionPage.create({
            BatchID,visibility,Heading,Description,Fields
        })
        res.status(201).json({
            success: true,
            data: "Success"
        })
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    
    };
//Delete Submissions
    exports.DeleteSubmission =async(req,res,next) => {
        const {SubmissionID} = req.body
        console.log(SubmissionID+"testing")
        try{
            const user = await SubmissionPage.deleteOne({
                _id:SubmissionID
            })
            res.status(201).json({
                success: true,
                data: "Success"
            })
            
        
        }catch(error){
            res.status(500).json({success:false, error:error.message})
        }
        
        };
//View specific submission
    exports.viewSpecificSubmission =async(req,res,next) => {
            
        const SubmissionID = req.query.SubmissionID
        console.log(SubmissionID)
            try{
            
            
                const submission = await SubmissionPage.findById(SubmissionID)


                
                res.status(201).json({
                    success: true,
                    data: submission
                })
                
            
            }catch(error){
                res.status(500).json({success:false, error:error.message})
            }
            
            };

    exports.editSpecificSubmission =async(req,res,next) => {
            
        const {SubmissionID,Fields,Description,Heading,BatchID,visibility} = req.body


        console.log(SubmissionID)
        console.log(Fields)
        console.log(Description)
        console.log(Heading)
        console.log(BatchID)

            try{
            
            
                const submission = await SubmissionPage.findById(SubmissionID)
                
                submission.BatchID = BatchID
                submission.Fields = Fields
                submission.Heading = Heading
                submission.Description = Description
                submission.visibility = visibility

                await submission.save()

                
                res.status(201).json({
                    success: true,
                    data: submission
                })
                
            
            }catch(error){
                res.status(500).json({success:false, error:error.message})
            }
            
            };

