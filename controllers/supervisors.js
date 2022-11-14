const { Batch } = require('aws-sdk');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const BidProject = require('../models/BidProjects');
const AvailableProjects = require('../models/AvailableProject');


const Supervisors = require('../models/Supervisor')
const Staff = require('../models/Staff');
const { decode } = require('jsonwebtoken');


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
                const biddngPCount = await AvailableProjects.count({StaffID:ID,Approved:true,batch:batchID}); //total groups appproved for projects
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


//TAF Bidding



//Available project Bidding
exports.ProjectBID = async(req, res, next) => {
    
}
