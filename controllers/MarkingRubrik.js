const mongoose = require('mongoose');

const MarkingRubrik = require('../models/MarkingRubrik')
const CustomRubrics = require('../models/CustomRubrics')
const TemplateRubric = require('../models/Rubricsfromtemplate')
const Marking = require('../models/Marking')

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
   
    try{
        const relevantProposalID = req.params.id;
        const proposalDetails = await MarkingRubrik.findById(relevantProposalID)

        // console.log(proposalDetails)

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

        console.log(proposalDetails)

        // if(proposalDetails.markingRubrikType=="proposalReport"){

        res.status(201).json({
            success: true,
            proposalDetails
        })
    // }
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

//******** Update Status Document Marking Configuration Details ********* 
exports.statusDocumentMarkingConfiguration = async(req,res,next) =>{
    const relevantMarkingID =req.params.id;
    // const _id =relevantProjectID
    const {totalContribution,stdesc01,stdesc02,stdesc03,stdesc04,marksEn01,marksEn02,marksEn03,marksEn04} = req.body
    
    try{
        const markingRubrik = await MarkingRubrik.findById({
            _id:relevantMarkingID,
           
        })
    
        if(!markingRubrik){
            return next(new ErrorResponse("Project placed to bid not found",400))
        }
        // console.log(id)
        
      markingRubrik.affectedTotalContribution=totalContribution
      markingRubrik.statusDocumentDescription01=stdesc01
      markingRubrik.statusDocumentDescription02=stdesc02
      markingRubrik.statusDocumentDescription03=stdesc03
      markingRubrik.statusDocumentDescription04=stdesc04
      markingRubrik.marksEntitledForStatusDocumentDescription01=marksEn01
      markingRubrik.marksEntitledForStatusDocumentDescription02=marksEn02
      markingRubrik.marksEntitledForStatusDocumentDescription03=marksEn03
      markingRubrik.marksEntitledForStatusDocumentDescription04=marksEn04
      

        await markingRubrik.save()
        res.status(201).json({
            success: true,
            data: "Status Document Marking updated"
            
        })
     
    }catch(error){
        next(error)
        console.log("Error in placing Document marking API");
    }
   
}

//******* Retrieve Existing Status Document Configuration Details ********/
exports.viewStatusDocumentMarkingDetails = async(req,res,next) => {
    console.log(req.params.id)
    try{
        const relevantStatusDocumentID = req.params.id;
        const StatusDocumentDetails = await MarkingRubrik.findById(relevantStatusDocumentID)

        console.log(StatusDocumentDetails.markingRubrikType)

        if(StatusDocumentDetails.markingRubrikType=="Status Document"){

        res.status(201).json({
            success: true,
            StatusDocumentDetails
        })
    }
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

//******** Retrieve Progress Presentation 01 Marking Configuration Details *********
exports.ViewProgressPresentationMarkingDetails= async(req,res,next) =>{
    try{
        const relevantProgressPresentation01DocumentID = req.params.id;
        const ProgressPresentation01Details = await MarkingRubrik.findById(relevantProgressPresentation01DocumentID)
        console.log(ProgressPresentation01Details.markingRubrikType)

        if(ProgressPresentation01Details.markingRubrikType=="Progress Presentation 01"){

        res.status(201).json({
            success: true,
            ProgressPresentation01Details
        })
    }
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

//******* Update Progess Presentation 01 Marking Configuration Details ****/
exports.progressPresentationMarkingConfiguration = async(req,res,next) =>{
    const relevantMarkingID =req.params.id;
    // const _id =relevantProjectID
    const {totalContribution,excellent,good,average,belowAverage,l01,l02,l03,l04,l05} = req.body

    
    try{
        const markingRubrik = await MarkingRubrik.findById({
            _id:relevantMarkingID,
           
        })
    
        if(!markingRubrik){
            return next(new ErrorResponse("Project to bid not found",400))
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
            data: "Progress Presentation 01 Marking updated"
            
        })
     
    }catch(error){
        next(error)
        console.log("Error in placing Document marking API");
    }
}



//Add customisable rubrics
exports.addRubrics =async(req,res,next) => {
    const {BatchID,visibility,Heading,Description,Fields} = req.body
    
    try{
        const user = await CustomRubrics.create({
            BatchID,visibility,Heading,Description,Fields
        })
        res.status(201).json({
            success: true,
            data: "Success"
        })
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
    
    };

//View all abstract rubrics
    exports.viewRubrics =async(req,res,next) => {
        try{
        
        
            const availableSubmissions = await CustomRubrics.find()//group that is approved and have this perticular member
            //console.log(availableProjects[1])// 
            const array = Object.values(availableSubmissions)
            //console.log(availableSubmissions);
            const arraySubmission = JSON.stringify(array).split(',')
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

//view specific abstract rubrics
        exports.viewSpecificAbstractRubrics =async(req,res,next) => {
            
            const SubmissionID = req.query.SubmissionID
            
                try{
                
                
                    const submission = await CustomRubrics.findById(SubmissionID)
                    console.log(submission+"testing")
    
                    
                    res.status(201).json({
                        success: true,
                        data: submission
                    })
                    
                
                }catch(error){
                    res.status(500).json({success:false, error:error.message})
                }
                
        };

//edit abstract rubrics
        exports.editRubrics =async(req,res,next) => {
            
            const {SubmissionID,Fields,Description,Heading,BatchID,visibility} = req.body
    
    
            console.log(SubmissionID)
            console.log(Fields)
            console.log(Description)
            console.log(Heading)
            console.log(BatchID)
    
                try{
                
                
                    const submission = await CustomRubrics.findById(SubmissionID)
                    
                    submission.BatchID = BatchID
                    submission.Fields = Fields
                    submission.Heading = Heading
                    submission.Description = Description
                    submission.visibility = visibility
    
                    await submission.save()
    
                    
                    res.status(201).json({
                        success: true,
                        data: submission
                    })
                    
                
                }catch(error){
                    res.status(500).json({success:false, error:error.message})
                }
                
                };

        //Add created rubrics from template
        exports.addRubricsfromtemplate =async(req,res,next) => {
            const {BatchID,visibility,Heading,Description,Fields} = req.body
            
            try{
                const user = await TemplateRubric.create({
                    BatchID,visibility,Heading,Description,Fields
                })
                res.status(201).json({
                    success: true,
                    data: "Success"
                })
                
            
            }catch(error){
                res.status(500).json({success:false, error:error.message})
            }
            
            };
//View Rubrics that are created from template
            exports.viewRubricsCreatedFromTemplate =async(req,res,next) => {
                try{
                
                
                    const availableSubmissions = await TemplateRubric.find()//group that is approved and have this perticular member
                    //console.log(availableProjects[1])// 
                    const array = Object.values(availableSubmissions)
                    //console.log(availableSubmissions);
                    const arraySubmission = JSON.stringify(array).split(',')
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


                exports.viewRubricsCreatedFromTemplateByID =async(req,res,next) => {
                    try{
                        const id = req.params.id
                    
                        const availableSubmissions = await TemplateRubric.findById(id)//group that is approved and have this perticular member
                        //console.log(availableProjects[1])// 
                        // const array = Object.values(availableSubmissions)
                        //console.log(availableSubmissions);
                        // const arraySubmission = JSON.stringify(array).split(',')
                        // console.log(arrayproject)
                        // console.log(typeof arrayproject)
                        console.log(availableSubmissions)
                        res.status(201).json({
                            success: true,
                            data: availableSubmissions
                        })
                        
                    
                    }catch(error){
                        res.status(500).json({success:false, error:error.message})
                    }
                    
                    };  

        //post the marks          
        exports.markpost = async(req,res,next) => {
            const entries = req.body
            try{
            console.log(entries)
            const user = await Marking.create(entries)
        }catch(error){
            res.status(500).json({success:false, error:error.message})
        }
        }