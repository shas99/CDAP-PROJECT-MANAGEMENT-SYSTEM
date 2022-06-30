const Staff = require('../models/Staff')
const jwt = require("jsonwebtoken");
const entermarks = require('../models/Marks');

const enterstatusdocument1marks = require('../models/StatusDocument1Marks');

const enterproposalreportmarks = require('../models/ProposalReportMarks');
exports.getPrivateData = async (req,res,next) => {
    let token//to retreive username in backend

    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        
        token = req.headers.authorization.split(" ")[1]
    }

    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    
    const user = await Staff.findById(decoded.id)
    console.log("Logged in user-email : "+user.email)
    
    res.status(200).json({
        sucess: true,
        data: user.email,
    })

}

//add proposal presentation marks method
exports.addmarks = async(req,res,next) => {
    const {groupID,studentIDs,studentnames,examiner1, examiner2,moderator,extrafeedback,provengapmarks1,provengapmarks2,capabilitymarks1,capabilitymarks2,implementationmarks1,implementationmarks2,implementationmarks3,communicationmarks1,communicationmarks2,commercializationmarks1 } = req.body

    console.log("Error finding" + groupID)
    try{
        const marksadd = await entermarks.create({
            groupID,studentIDs,studentnames,examiner1, examiner2,moderator,extrafeedback,provengapmarks1,provengapmarks2,capabilitymarks1,capabilitymarks2,implementationmarks1,implementationmarks2,implementationmarks3,communicationmarks1,communicationmarks2,commercializationmarks1
        })
        res.status(210).json({
            success: true,
            data: "Added marks successfully"
        })
    }catch(error){
        next(error)
    }
}


//Add proposal report marks method

exports.addproposalreportmarks = async(req,res,next) => {
    const {groupID,studentIDs,studentnames,cosupervisor,supervisor,extrafeedback,provengapmarks1,provengapmarks2,capabilitymarks1,capabilitymarks2,implementationmarks1,implementationmarks2,implementationmarks3,communicationmarks1,communicationmarks2,communicationmarks3,commercializationmarks1 } = req.body

    console.log("Error finding" + groupID)
    try{
        const proposalreportmarksadd = await enterproposalreportmarks.create({
            groupID,studentIDs,studentnames,cosupervisor,supervisor,extrafeedback,provengapmarks1,provengapmarks2,capabilitymarks1,capabilitymarks2,implementationmarks1,implementationmarks2,implementationmarks3,communicationmarks1,communicationmarks2,communicationmarks3,commercializationmarks1
        })
        res.status(210).json({
            success: true,
            data: "Added marks successfully"
        })
    }catch(error){
        next(error)
    }
}




//Add status document 1  marks method

exports.addstatusdocument1marks = async(req,res,next) => {
    const {projectNo,studentIDs,ganttchartmarks,actualtimemarks,breakdownmarks,managementtoolmarks, ganttchartremarks,actualtimeremarks,breakdownremarks,managementtoolremarks,supervisor,cosupervisor } = req.body

    console.log("Error finding" + projectNo)
    try{
        const statusdocument1marksadd = await enterstatusdocument1marks.create({
            projectNo,studentIDs,ganttchartmarks,actualtimemarks,breakdownmarks,managementtoolmarks, ganttchartremarks,actualtimeremarks,breakdownremarks,managementtoolremarks,supervisor,cosupervisor
        })
        res.status(210).json({
            success: true,
            data: "Added marks successfully"
        })
    }catch(error){
        next(error)
    }
}

