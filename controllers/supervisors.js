const { Batch } = require('aws-sdk');
const mongoose = require('mongoose');

const Supervisors = require('../models/Supervisor')
const Staff = require('../models/Staff')


//*******VIEW AVAILABLE Supervisors API *******
exports.viewAvailableSupervisors =async(req,res,next) => { //planning to use for bidders
try{
    const availableSpervisors = await Supervisors.find()//group that is approved and have this perticular member
    //console.log(availableProjects[1])// 
    const array = Object.values(availableSpervisors)
    console.log(availableSpervisors);
    const arraySupervisor = JSON.stringify(array).split(',')
    // console.log(arrayproject)
    // console.log(typeof arrayproject)
    console.log("This is the back end array "+array)
    res.status(201).json({
        success: true,
        data: array
    })
    

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};

//Is supervisor
exports.showSupervisors = async(req,res,next) => {
    try{ 
        
        const showSupervisors = await Staff.find()
        const array = Object.values(showSupervisors)
        const arraySupervisor = JSON.stringify(array).split(',')

        console.log("Supervisor data retrieved")
        res.status(201).json({
            success: true,
            data: array
        })

    }
    catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}; 
