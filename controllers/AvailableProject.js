const mongoose = require('mongoose');

const AvailableProject = require('../models/AvailableProject')

//*******VIEW AVAILABLE PROJECTS API *******
exports.viewAvailableProjects =async(req,res,next) => {
try{


    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    //console.log(availableProjects[1])// 
    const array = Object.values(availableProjects)

    const arrayproject = JSON.stringify(array).split(',')
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

//***** VIEW SPECIFIC PROJECT API******** 
exports.viewspecificproject = async(req,res,next) => {
    console.log(req.params.id)
    try{
        const availableprojectid = req.params.id;
        const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
        // console.log("Projects bidding details :",availableProjects.bidding)
        res.status(201).json({
            success: true,
            availableProjects
        })
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}


//final increase count
exports.increasebidcount = async(req,res,next) => {
    try{
        const availableprojectid = req.body;
        const projectcount = await AvailableProject.findById(availableprojectid)
        console.log(projectcount);
        projectcount.projectBiddingCount = projectcount.projectBiddingCount + 1; 
        await projectcount.save();
        
        

    }catch(error){
        res.status(500).json({success:false, error:error.message})

    }
}




//******** PLACE BID SPECIFIC AVAILABLE PROJECT *********
exports.placeBidonAvailableProject = async(req,res,next) =>{
    const relevantProjectID =req.params.id;
    // const _id =relevantProjectID
    const {bidPlacedGroup,date,time} = req.body
    
    try{
        const placedBid = await AvailableProject.findById({
            _id:relevantProjectID,
           
        })
        // placedBid.push({allBiddings:bidPlacedGroup}) push is not a function 

        if(!placedBid){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
        // console.log(id)
        
       placedBid.bidding.biddingPlacedGroup= bidPlacedGroup
       placedBid.bidding.date=date
       placedBid.bidding.time=time
    placedBid.allBiddings.push(bidPlacedGroup)

        await placedBid.save()
        res.status(201).json({
            success: true,
            data: "Bid set Success"
            
        })
        console.log("Success in setting bid API");
    }catch(error){
        next(error)
        console.log("Error in placing bid API");
    }
};


//******** UPDATE SPECIFIC PROJECT DETAILS  ******/

exports.updateProjectDetails = async(req,res,next) => {
    const relevantProjectID =req.params.id;
    const {projectName, projectDescription,projectType,projectSupervisedBy} = req.body

    try{
        const projectDetails = await AvailableProject.findById({
            _id:relevantProjectID,
           
        })
        // placedBid.push({allBiddings:bidPlacedGroup}) push is not a function 

        if(!projectDetails){
            return next(new ErrorResponse("Project Details not found",400))
        }
        // console.log(id)
        projectDetails.projectName= projectName
        projectDetails.projectDescription= projectDescription
        projectDetails.projectType= projectType
        projectDetails.projectSupervisedBy= projectSupervisedBy
     
       

        await projectDetails.save()
        res.status(201).json({
            success: true,
            data: "Project Details Updated Success"
            
        })
        console.log("Success in setting Update Proect Details API");
    }catch(error){
        next(error)
        console.log("Error in Update Project Details API");
    }

}

//******** DELETE SPECIFIC PROJECT DETAILS  ******/
exports.deleteProjectDetails = async(req,res,next) => {
    AvailableProject.findByIdAndRemove(req.params.id).exec((err,deletedProject)=>{

        if(err) return res.status(400).json({
            
        message :"Unsuccessful delete",err 
    });
        
        return res.status(200).json({
             message:"Success delete",  deletedProject
        });
    });
}