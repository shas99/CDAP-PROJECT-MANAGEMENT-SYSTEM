const mongoose = require('mongoose');

const Announcement = require('../models/Annnouncement');


//******** PLACE ANNOUNCEMENT *********
exports.placeAnnouncement = async(req,res,next) =>{
    const relevantAnnouncementDocumentID =req.params.id;
    // const _id =relevantProjectID
    const {title,description,announcementDate,announcementTime,deadline} = req.body
    
    try{
        const announcement = await Announcement.findById({
            _id:relevantAnnouncementDocumentID,
           
        })
        // placedBid.push({allBiddings:bidPlacedGroup}) push is not a function 

        if(!announcement){
            return next(new ErrorResponse("Announcement Failed to place",400))
        }
        // console.log(id)
        
       announcement.announcementTitle= title
       announcement.announcementDescription= description
       announcement.announcementDate= announcementDate
       announcement.announcementTime= announcementTime
       announcement.announcementDeadline=deadline

       console.log(deadline)
       console.log(announcementTime)
       

        await announcement.save()
        res.status(201).json({
            success: true,
            data: "Announcement placed successfully"
            
        })
        console.log("Success in setting announcement");
    }catch(error){
        next(error)
        console.log("Error in placing announcement");
    }
};

//******** RETRIEVE ANNOUNCEMENT *********
exports.getAnnouncement = async(req,res,next) =>{
    
    try{
        const relevantAnnouncementDocumentID = req.params.id;
        const announcement = await Announcement.findById(relevantAnnouncementDocumentID)//group that is approved and have this perticular member
        // console.log("Projects bidding details :",availableProjects.bidding)
        res.status(201).json({
            success: true,
            announcement
        })
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}