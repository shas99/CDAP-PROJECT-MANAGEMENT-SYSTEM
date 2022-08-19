const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { decode } = require('jsonwebtoken');
const User = require('../models/User')


const AvailableProject = require('../models/AvailableProject');
const Supervisors = require('../models/Supervisor');
const Staff = require('../models/Staff');
const Group = require('../models/Group');
const Supervisor = require('../models/Supervisor');

//*******VIEW AVAILABLE PROJECTS API *******
exports.viewAvailableProjects =async(req,res,next) => {
try{


    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    //console.log(availableProjects[1])// 
    const array = Object.values(availableProjects)

    //need to add batch id attribute for model and filter relevent batch related projects

    const arrayproject = JSON.stringify(array).split(',')
    // console.log(arrayproject)
    // console.log(typeof arrayproject)
    //console.log(array+"back end array of projects")
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


//********Student Bidding************* */
exports.StudentBidding = async(req,res,next) => { 
    console.log("Student recommendation api run")
    const {SelectedProject,SelectedSupervisors,cd} = req.body
    const Project = SelectedProject;
    const SupervisorArr = SelectedSupervisors;
    console.log(SupervisorArr)
    let token = cd
    
         if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
             token = req.headers.authorization.split(" ")[1]
         }

        //console.log(" "+token+" ")
          const decoded = jwt.verify(token,process.env.JWT_SECRET)
          //console.log(decoded.id+"Decoded-")
          //console.log("Decoded : "+decoded)
          const user = await User.findById(decoded.id)
        //retreive studentID
          const StudentID = user.studentID


          const group = await Group.findOne({$or: [{member_1:StudentID},{member_2:StudentID},{member_3:StudentID},{member_4:StudentID},{member_5:StudentID}]})


          const Groupid = group._id
        
          //console.log("User details -"+user)
        //   console.log("Batch id: ",user.BatchID);
        //   console.log("Group id: ",user.GroupID);
          const BatchID = user.BatchID;
          const GroupID = user.GroupID;
        //   console.log("Group Details "+batchID+","+groupID)
        const Approved = false;
    
    try{
        for(let i = 0;i<SupervisorArr.length;i++){
            let StaffID = SupervisorArr[i];
            const user = await Supervisors.create({
                StaffID,GroupID,BatchID,Approved, Project,Groupid
            })    
        }
        console.log("Student recommendation success")
        // sendToken(user, 201, res)
    }catch(error){
        next(error)
        console.log("Student recommendation error")
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


//******** CREATE PROJECT DETAILS  ******/
exports.createProjectDetails = async(req,res,next) => {
    const {projectName, projectDescription,projectType,projectSupervisedBy} = req.body
    const newProject = new AvailableProject({
        projectName,
        projectDescription,
        projectType,
        projectSupervisedBy
    })
    try{
        const projectDetails = await newProject.save()
        res.status(201).json({
            success: true,
            data: projectDetails
        })
        console.log("Success in creating Project Details API");
    }catch(error){
        next(error)
        console.log("Error in creating Project Details API");
    }
}


//******** Retreive Biddings for specific supervisor  ******/
exports.ViewStaffBiddings =async(req,res,next) => {
    
    
    try{
    
        let token//to retreive username in backend

        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            
            token = req.headers.authorization.split(" ")[1]
        }
    
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const staff = await Staff.findById(decoded.id)
        console.log("qtuopwqtuoputiopqrpruioqqr"+staff._id)
        const availableProjects = await Supervisor.find({StaffID:staff._id})//group that is approved and have this perticular member
        //console.log(availableProjects[1])// 
        const array = Object.values(availableProjects)
    
        //need to add batch id attribute for model and filter relevent batch related projects
    
        const arrayproject = JSON.stringify(array).split(',')
        // console.log(arrayproject)
        // console.log(typeof arrayproject)
        //console.log(array+"back end array of projects")
        res.status(201).json({
            success: true,
            data: array
        })
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    
    };