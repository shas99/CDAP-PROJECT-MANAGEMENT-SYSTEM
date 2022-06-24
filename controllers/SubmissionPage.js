const mongoose = require('mongoose');

const SubmissionPage = require('../models/SubmissionPage')

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