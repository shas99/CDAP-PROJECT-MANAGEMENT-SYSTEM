const mongoose = require('mongoose');

const MarkingRubrik = require('../models/MarkingRubrik')

//******** Update Existing Marking Configuration for Proposal Presentation *********
exports.proposalMarkingConfiguration = async(req,res,next) =>{

    const relevantMarkingID =req.params.id;
    // const _id =relevantProjectID
    const {totalContribution,excellent,good,average,belowAverage,l01,l02,l03,l04,l05} = req.body
    
    try{
        const markingRubrik = await MarkingRubrik.findById({
            _id:relevantMarkingID,
           
        })
        // placedBid.push({allBiddings:bidPlacedGroup}) push is not a function 

        if(!markingRubrik){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
        // console.log(id)
        
      markingRubrik.affectedTotalContribution=totalContribution
      markingRubrik.excellentGradeRange=excellent
      markingRubrik.goodGradeRange=good
      markingRubrik.averageGradeRange=average
      markingRubrik.belowAverageGradeRange=belowAverage
      markingRubrik.affectedL01Grade=l01
      markingRubrik.affectedL02Grade=l02
      markingRubrik.affectedL03Grade=l03
      markingRubrik.affectedL04Grade=l04
      markingRubrik.affectedL05Grade=l05
      


        await markingRubrik.save()
        res.status(201).json({
            success: true,
            data: "Marking updated"
            
        })
     
    }catch(error){
        next(error)
        console.log("Error in placing marking API");
    }
   

}
//******** Retrieve Existing Marking Configuration Details for Proposal Presentation *********

exports.viewProposalMarkingDetails = async(req,res,next) => {
    console.log(req.params.id)
    try{
        const relevantProposalID = req.params.id;
        const proposalDetails = await MarkingRubrik.findById(relevantProposalID)

        console.log(proposalDetails.markingRubrikType)

        if(proposalDetails.markingRubrikType=="proposalPresentation"){

        res.status(201).json({
            success: true,
            proposalDetails
        })
    }
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

//******** Update Existing Marking Configuration Details for Proposal Report *********
exports.proposalReportMarkingConfiguration = async(req,res,next) =>{

    const relevantMarkingID =req.params.id;
    // const _id =relevantProjectID
    const {totalContribution,excellent,good,average,belowAverage,l01,l02,l03,l04,l05} = req.body
    
    try{
        const markingRubrik = await MarkingRubrik.findById({
            _id:relevantMarkingID,
           
        })
        // placedBid.push({allBiddings:bidPlacedGroup}) push is not a function 

        if(!markingRubrik){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
        // console.log(id)
        
      markingRubrik.affectedTotalContribution=totalContribution
      markingRubrik.excellentGradeRange=excellent
      markingRubrik.goodGradeRange=good
      markingRubrik.averageGradeRange=average
      markingRubrik.belowAverageGradeRange=belowAverage
      markingRubrik.affectedL01Grade=l01
      markingRubrik.affectedL02Grade=l02
      markingRubrik.affectedL03Grade=l03
      markingRubrik.affectedL04Grade=l04
      markingRubrik.affectedL05Grade=l05
      


        await markingRubrik.save()
        res.status(201).json({
            success: true,
            data: "Proposal Report Marking updated"
            
        })
     
    }catch(error){
        next(error)
        console.log("Error in placing  report marking API");
    }
   

}


//******** Retrieve Existing Marking Configuration Details for Proposal Presentation *********
exports.viewProposalReportMarkingDetails = async(req,res,next) => {
    console.log(req.params.id)
    try{
        const relevantProposalID = req.params.id;
        const proposalDetails = await MarkingRubrik.findById(relevantProposalID)

        console.log(proposalDetails.markingRubrikType)

        if(proposalDetails.markingRubrikType=="proposalReport"){

        res.status(201).json({
            success: true,
            proposalDetails
        })
    }
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}
