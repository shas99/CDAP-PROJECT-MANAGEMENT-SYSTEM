// const User = require('../models/User')
const AvailableProject = require('../models/AvailableProject')
// const topicReg = require('../models/AvailableProject')


//To view Available Projects
exports.viewAvailableProjects =async(req,res,next) => {

// console.log("Hello Project!")


try{

    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    console.log("Projects",availableProjects)// 

    res.status(201).json({
        success: true,
        data: res.AvailableProject
    })

    

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};

//To view a specific project
exports.viewspecificproject = async(req,res,next) => {
    
    try{
        const availableprojectid = req.params.id;
        const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
        console.log("Projects",availableProjects)// 
    
        res.status(201).json({
            success: true,
            data: res.AvailableProject
        })
    
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}


// To place a bid on available specfic project
exports.placeBidonAvailableProject = async(req,res,next) =>{

    const {bidPlacedGroup, date, time} = req.body
    const relevantProjectID =req.params.id;
    try{

        const placedBid = await AvailableProject.findOne({
           relevantProjectID
        })
        if(!placedBid){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
       placedBid.bidding.biddingPlacedGroup = req.body.bidPlacedGroup
       placedBid.bidding.date = req.body.date 
       placedBid.bidding.time = req.body.time
        
        await placedBid.save()

        res.status(201).json({
            success: true,
            data: "Bid set Success"
        })

    }catch(error){
        next(error)
    }
};
