//Student and supervisor bidding related APIs will be implemented in this file
const { Batch } = require('aws-sdk');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BidProject = require('../models/BidProjects');
const AvailableProjects = require('../models/AvailableProject');
const Group = require('../models/Group');
const TAF = require('../models/TopicReg');

const Supervisors = require('../models/Supervisor')
const Staff = require('../models/Staff');
const { decode } = require('jsonwebtoken');
const { response } = require('express');
const Supervisor = require('../models/Supervisor');
const AvailableProject = require('../models/AvailableProject');
//const TopicReg = require('../models/TopicReg');


//*******Place Bid *******
exports.placeBid =async(req,res,next) => { // to use for bidd for a supervisor
    const {StaffID,GroupID,BatchID} = req.body
    const rejected = false
    const Approved = false
try{
    const bids = await Supervisors.create({
        StaffID,GroupID,BatchID,Approved,rejected
        

    })
    console.log("Bidding added"+bids)
}catch(error){
    next(error)
    console.log("Student Bidding error")
}
};

exports.bidProject = async(req,res,next) => {  //use for bid available projects
    const {GroupID,BatchID,ProjectID} = req.body
    const {Approved,rejected} = false

    try{
        const bid = await BidProject.create({
            GroupID,BatchID,ProjectID,Approved,rejected
    })
    console.log("Bidding successfull! "+bid)
    }catch(error){
        next(error)
        console.log("Bidding error")
    }
};
        
        
    



//Is supervisor
exports.showSupervisors = async(req,res,next) => {
    try{ 

        //need to get a parameter passed from front end (batch id)
        let token = req.query.ab 
         if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
             token = req.headers.authorization.split(" ")[1]
         }

        //console.log(" "+token+" ")
          const decoded = jwt.verify(token,process.env.JWT_SECRET)
          //console.log(decoded.id+"Decoded-")

          const user = await User.findById(decoded.id)

          const batchID = user.BatchID
        //   const groupID = user.

         // console.log(batchID+"This is the batch id passed from front")
        const showSupervisors = await Staff.find()
        const array = Object.values(showSupervisors)
        //const arraySupervisor = JSON.stringify(array).split(',')
        let name = [];
        
        const biddings = [];
        //let biddingdata = [];
        let array5 = [];
       // console.log(array+"Array")
       try{
        for(let i = 0; i < array.length; i++){
            //console.log(i)
            if(array[i].Supervisor == true){
                
                let ID = array[i]._id
                //console.log(name)
                //console.log(i)

                const biddingCount = await Supervisors.count({StaffID:ID,Approved:true,BatchID:batchID}); //total approved supervisor biddings
               // console.log("biddingCount "+biddingCount)
                const biddngPCount = await BidProject.count({StaffID:ID,Approved:true,BatchID:batchID}); //total groups appproved for projects
               // console.log("biddingPCount "+biddngPCount)
                const biddingdata = biddingCount + biddngPCount; //sum of approved groups for batch
                let add = [array[i]._id,array[i].username,biddingdata]
                name.push(add)
                //name.push(biddingdata)
                //console.log(biddings)
                
                //recommended supervisors not shown yet

            } 
        }
        }catch(error){
            console.log(error)
        }
        // array.map(supervisor => { 
        //     let s = supervisor.Supervisor
        //     if(s == true){
        //         let add = [supervisor._id,supervisor.username]
        //         name.push(add)
                
        //         let ID = supervisor._id
        //         console.log(ID+"This is ID")

        //         //get bidding details from supervisor cluster
        //         const biddingdata = await Supervisors.findById({ID});
        //         //biddings.push(biddingdata.length);
        //         array5 = Object.values(biddingdata)
        //         //const array6 = JSON.stringify(array5).split(',')
        //         //let count = array5.length
        //         //biddings.push(count) 
        //         //console.log(biddings + "Success")
        //         console.log(biddingdata+" this is finded data")
        //         //console.log(array6)

        //         //let available = Supervisors.findById(ID)
        //         //filter using batch id
        //         //count biddings according to relevent supervisor
        //         //return 


        //         //console.log(available)


        //     }
        //     // return name
        // })
         
         console.log(name+"This is Name array")
        //console.log("Supervisor data retrieved"+str)
        //console.log("Done!!"+str.Staff[0].username)
        res.status(201).json({
            success: true,
            data: name
        })

    }
    catch(error){
        res.status(500).json({success:false, error:error.message})
        console.log(error)
    }
}; 


//Place bid
exports.placeBidonAvailableProject = async(req,res,next) =>{
    //const PID =req.params.id;
    // const _id =relevantProjectID
    const {GroupID,date,time,PID} = req.body
    
    try{
        const placedBid = await AvailableProject.findById({
            _id:PID,
           
        })
        // placedBid.push({allBiddings:bidPlacedGroup}) push is not a function 

        if(!placedBid){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
        // console.log(id)
        
       placedBid.bidding.GroupID= GroupID
       placedBid.bidding.date=date
       placedBid.bidding.time=time
       placedBid.allBiddings.push(GroupID)

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



//New controllers

//check whether group has done any bid before
//-------- Check whether the group already has a supervisor(student) --------------
exports.supervisorStatus = async(req, res, next) => {
    const {groupName} = req.body;
    let anyApproved, doneBids;
    try{
        const gCount = await Group.find({name:groupName,staff:{ $exists: true, $ne: null }})
        console.log("Count : "+gCount.length)
        if (gCount != 0){
            const GroupDetails = await Group.findOne({name:groupName})
            const details = await Staff.findById({_id:GroupDetails.staff}); 
            const name = details.username
            anyApproved = name   
            console.log("Any approved : "+anyApproved)  
            dataa = {anyApproved}       
        }
        else{
            anyApproved = "Not assigned";
            const bids = await Supervisor.findOne({GroupID:groupName})
            const Bids = await BidProject.findOne({GroupID:groupName})
            if ((bids != null) || (Bids != null)){
                doneBids = true;
            }else{
                doneBids = false;
            }
            dataa = {anyApproved, doneBids}
        }
       
        console.log("Dataa : "+dataa)
        res.status(201).json({
            success: true,
            data: dataa
        })
    }catch(error){
        next(error)
        console.log("Group error")
    }
};



//-------------------------- TAF Bidding(student) ---------------------------------
exports.SupervisorBID = async(req, res, next) => {
    const {SupervisorArr, GroupID, BatchID, Project} = req.body;  //StaffID, GroupID, BatchID, Project = TAFID
    const Approved = false;
    const rejected = false;
    console.log(req.body)
    try{
        for(let i = 0;i<SupervisorArr.length;i++){
            let StaffID = SupervisorArr[i];
            const user = await Supervisors.create({
                StaffID,GroupID,BatchID,Approved,Project,rejected
            })    
        }
        res.status(201).json({
            success: true,
            data: "Bid set Success"
            
        })
        console.log("Bidding success! "+user);
    }catch(error){
        next(error)
        console.log("Student Bidding error")
    }

};


//-------------------------- Available project Bidding(student) ---------------------
exports.ProjectBID = async(req, res, next) => {
    const {GroupID, BatchID, ProjectID,CosuperID} = req.body;
    const Approved = false;
    const rejected = false;
    console.log(req.body);
    try{
        const projectdata = await AvailableProjects.findById({_id:ProjectID});
        var stfID = projectdata.StID    //Get relevent supervisor id
        console.log("pdata "+projectdata)
        //console.log("staff id : "+ stfID)
    }catch(error){
        next(error)
        console.log("Staff id error")
    };
    //console.log("staff id : "+ stfID)
    try{
        console.log("staff id : "+ stfID)
        const StaffID = stfID
        console.log("GroupID: "+GroupID,"StaffID: "+StaffID,"BatchID: "+BatchID,"ProjectID: "+ProjectID,"Approved: "+Approved,"rejected: "+rejected,"CosuperID: "+CosuperID)
        const bid = await BidProject.create({
            GroupID,StaffID,BatchID,ProjectID,Approved,rejected,CosuperID
    })
    
    res.status(201).json({
        success: true,
        data: "Bid set Success"
        
    })
    console.log("Bidding successfull! "+bid)
     }catch(error){
        next(error)
        console.log("Bidding error")
    }
  
};


//------------------- View TAF Bidding details ---------------------------
exports.viewStudentTAF = async(req, res, next) =>{
    const groupName = req.params.id;
    let BiddigData = [];
    
    try{
        console.log("Gid: "+groupName)
        const TAFDetetails = await TAF.find({groupID:groupName})
        // const sbiddingsCount = await Supervisors.count({GroupID:gID})
        const SDetails = await Supervisors.find({GroupID:groupName})
        const sbiddingsCount = SDetails.length
        let Bids = []
        if(sbiddingsCount != 0){
            for(let i = 0; i < sbiddingsCount; i++){
                try{
                    let supervisor = await Staff.findById({_id:SDetails[i].StaffID})
                    let SName = supervisor.username
                    BiddigData.push(SName)
                }catch(error){
                    next(error)
                }
                //BiddigData.push(SDetails[i].StaffID)
                //console.log("Total biddings "+sbiddingsCount)
                //console.log("SDetails "+SDetails[i].StaffID)
                // console.log("gID "+gID)
            }  
            Bids = {BiddigData,TAFDetetails}
            //console.log("TAFDetetails "+ TAFDetetails)
            //console.log("Total biddings "+sbiddingsCount)
            console.log("BiddigData "+ BiddigData)  
        }else{
            Bids = "No"
        }
        res.status(201).json({
                success: true,
                data: Bids
        })
            
    }catch(error){
        next(error)
        console.log("View Bidding error")
    }

};


//------------------- View Projects biddings -----------------------------
exports.viewStudentProjectBids = async(req, res, next) => {
    //const {gID} = req.body;
    const groupName = req.body.groupName
    console.log("Group name: "+groupName)
    let result = [];
    try{
        const Biddings = await BidProject.find({GroupID:groupName, CosuperID: { $ne: "" }});
        if(Biddings.length != 0){
        console.log("Inside the if statement!")
        for (let i = 0; i < Biddings.length;i++){
            let pID = Biddings[i].ProjectID;
            let CosuperID = Biddings[i].CosuperID
            console.log("Cosuper: "+CosuperID)
            // if(CosuperID != null){
            // console.log("Damn")
            const cosup = await Staff.findById({_id:CosuperID,})
            let Cosupervisor = cosup.username
            console.log("Co sup name: "+Cosupervisor)
            // }
            const pDetails = await AvailableProjects.findById({_id:pID,})
            let stBidApp = Biddings[i].Approved; 
            let stBidRej = Biddings[i].rejected;
            let prDetails = [];
            prDetails = [pDetails.projectName,pDetails.projectDescription,pDetails.projectType,pDetails.projectSupervisedBy,Cosupervisor,stBidApp,stBidRej];
            result.push(prDetails);
            //console.log("Project details "+ pDetails)
        }
        res.status(201).json({
            success: true,
            data: result
        })}

        console.log("Biddings: "+ Biddings)
    }catch(error){
        next(error)
        console.log("View Bidding error")
    }

};

//view approved bidding
exports.showApprovedBidding = async(req,res,next) => {

}


//Supervisor Functions

//-------------------------- Get batches -----------------------------
//regular batch and Jul batch. For now no need to implement


//------------------- Get all TAF biddings for supervisors -----------
// exports.TafAll = async(req,res,next) => {
//     const {staffID,BatchID} = req.body
//     console.log(req.body)
//     try{
//         const Biddings = await Supervisor.find({StaffID:staffID,BatchID:BatchID,Approved:false})
//         res.status(201).json({
//             success:true,
//             data:Biddings
//         })
//     }catch(error){
//         next(error)
//         console.log("Error")
//     }
// }

exports.StaffViewBiddings = async(req, res, next) => {
    const {staffID,BatchID} = req.body
    console.log(req.body)
    const TAFall = []
     try{
        const biddingsList = await Supervisor.find({StaffID:staffID,BatchID:BatchID})
       // console.log("BiddingList is" + biddingsList)

        if(biddingsList.length == 0){
            res.status(201).json({
                success:true,
                data:"No data"
            })
        }else{

            
        for(let i = 0; i < biddingsList.length; i++){
            
            const bids = await Supervisor.count({GroupID:biddingsList[i].GroupID,Approved:true})
            console.log("+++++++"+bids+"++++++++"+biddingsList[i].GroupID)
        if(bids < 1){

            let bidID = biddingsList[i]._id
            let TAFID = biddingsList[i].Project
            console.log("BID ID: ",bidID)
            try{
                const tafDetails = await TAF.find({_id:TAFID,})
                let all = {tafDetails, bidID}
                TAFall.push(all)
                console.log("TAF details are "+tafDetails)
            }catch(error){
                next(error)
                console.log("TAF view Bidding error")
            }
        }}
        
        res.status(201).json({
            success: true,
            data: TAFall 
        })}
        
     }catch(error){
        next(error)
        console.log("staff view Bidding error")
     }

};


//------------------- Get special project bidding for supervisors -------
// no need to implement because in the previous api have been already implemented can be used



//------------------- Get all project biddings for supervisors -------------
exports.StaffViewPBiddings = async(req,res,next) => {
    const {staffID,BatchID} = req.body
    console.log("BatchID : "+BatchID)
    console.log("Staff : "+staffID)

    try{
        const biddngs = await BidProject.find({StaffID:staffID,BatchID:BatchID})
        console.log("biddings: "+biddngs)
        const bidData = []
        for(let i = 0 ; i < biddngs.length; i++){
            // const gCount = await Group.find({name:biddings.GroupID,staff:{ $ne: "" }})
            // console.log(gCount+" Gcount")
            // if(gCount != 0){
        const bids = await BidProject.count({GroupID:biddngs[i].GroupID,Approved:true})
        console.log("+++++++"+bids+"++++++++"+biddngs[i].GroupID)
        if(bids < 1){

            console.log("inside the if")
            try{
                let bid = biddngs[i];
                // console.log("Bid[1] : "+bid)
                const project = await AvailableProjects.findById({_id:biddngs[i].ProjectID})
                let all = {bid,project}
                bidData.push(all)
                console.log("all : "+all)
            }catch(error){
                next(error)
                console.log("Staff view project biddings error")
            }
          }  
        }
    // }
        console.log("Bid Data: "+bidData)
        res.status(201).json({
            success: true,
            data : bidData
        })           
    }catch(error){
        next(error)
        console.log("Staff view project biddings error")
    }
};


//------------------- Accept Project bidding -----------------------
exports.AcceptPBid = async(req,res,next) => {

    //for(let i=0; i<bidID.length;i++){
        try{
            const bidID = req.params.id;
            const bid = await BidProject.findById({_id:bidID})
            console.log("Bid: "+bid)
            bid.Approved = true;
            
            console.log("Triggre")

            const updateGr = await Group.findOne({name:bid.GroupID})
            console.log("Group name: "+bid.GroupID)
            updateGr.staff = bid.StaffID
            console.log("STAFF: "+bid.StaffID)

            const projectDe = await AvailableProjects.findById({_id:bid.ProjectID,})
            console.log("PrjectDe: "+projectDe)
            projectDe.projectStatus = true;
            console.log("ProjectStatus : "+projectDe.projectStatus)
            
            await bid.save();  
                // try{
            //const gname =      
            await updateGr.save();

            await projectDe.save();
                // }catch(error){
                //     next(error)
                //     console.log("Staff approve(update group) error")
                // }
            res.status(201).json({
                success:true,
                data: "updated!"
            })                
        }catch(error){
            next(error)
            console.log("Staff approve biddings error")
        }   
};

//------------------- Reject Project bidding -----------------------
//------------------- Accept TAF biddings ---------------------------
exports.AcceptBid = async(req,res,next) => {
        try{
            const bidID = req.params.id;
            const bid = await Supervisors.findById({_id:bidID})
            console.log("Bid: "+bid)
            bid.Approved = true;
            // const updateGr = await Group.find({name:bid.GroupID})
            // updateGr.staff = bid.StaffID
            // await bid.save();
            
            // //try{
                
            // await updateGr.save();
            // // }catch(error){
            // //     next(error)
            // //     console.log("Staff approve(update group) error")
            // // }          
            // res.status(201).json({
            //     success:true,
            //     data: "updated!"
            // }) 
            const updateGr = await Group.findOne({name:bid.GroupID})
            console.log("Group name: "+bid.GroupID)
            updateGr.staff = bid.StaffID
            console.log("STAFF: "+bid.StaffID)
            await bid.save();  
                // try{
            //const gname =      
            await updateGr.save();
                // }catch(error){
                //     next(error)
                //     console.log("Staff approve(update group) error")
                // }
            res.status(201).json({
                success:true,
                data: "updated!"
            })                
        }catch(error){
            next(error)
            console.log("Staff approve biddings error")
        }
    //}    
};


//------------------- Reject TAF biddings --------------------------


// ------------------ Add feedback to TAF Biddings -----------------
exports.TAFFeed = async(req,res,next) => {
    try {
        const {TAFID,Feed} = req.body
        const bid = await Supervisors.findById({_id:TAFID})
        console.log("Bid: "+bid)
        bid.feedback = Feed
        console.log("Feedback: ")
        await bid.save()

        res.status(201).json({
            success:true,
            data: "updated!"
        })  
    }catch(error){
            next(error)
            console.log("Staff Feedback error")
    }
}





