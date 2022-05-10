const mongoose = require('mongoose');

const AvailableProject = require('../models/AvailableProject')

//*******VIEW AVAILABLE PROJECTS API *******
exports.viewAvailableProjects =async(req,res,next) => {
try{


    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    //console.log(availableProjects[1])// 
    const array = Object.values(availableProjects)
    console.log(array)
    const arrayproject = JSON.stringify(array).split(',')
    console.log(arrayproject)
    console.log(typeof arrayproject)

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
    
    try{
        const availableprojectid = req.params.id;
        const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
        console.log("Projects",availableProjects)
        
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
    const {bidPlacedGroup, date, time} = req.body
    try{
        const placedBid = await AvailableProject.findOneAndUpdate({
            relevantProjectID
        })
        if(!placedBid){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }

      
        //ISSUE IS UPDATING EXISTING NESTED OBJECT VALUE   placeBid.bidding.biddingPlacedGroup doesnt work !!!!
       placedBid.bidding.biddingPlacedGroup= bidPlacedGroup
       console.log(placedBid.projectName)
          placedBid.bidding.date = date
          placedBid.bidding.time = time
        await placedBid.save()

        res.status(201).json({
            success: true,
            data: "Bid set Success"
        })
    }catch(error){
        next(error)
        console.log("Heyyyy");
    }
};
