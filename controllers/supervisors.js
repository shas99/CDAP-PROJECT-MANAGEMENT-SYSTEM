const { Batch } = require('aws-sdk');
const mongoose = require('mongoose');

const Supervisors = require('../models/Supervisor')

//*******VIEW AVAILABLE Supervisors API *******
exports.viewAvailableSupervisors =async(req,res,next) => {
try{


    const availableSpervisors = await Supervisors.find()//group that is approved and have this perticular member
    //console.log(availableProjects[1])// 
    const array = Object.values(availableSpervisors)
    //console.log(availableSubmissions);
    const arraySupervisor = JSON.stringify(array).split(',')
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
