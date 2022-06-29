const mongoose = require('mongoose')

const ProposalReportMarksSchema = new mongoose.Schema({


    groupID: {
        type: String
    },
    studentIDs: {
        type: String
    },
    studentnames:{
        type: String
    },
    cosupervisor:{
        type: String
    },
    supervisor:{
        type: String
    },
    extrafeedback:{
        type: String
    },
    provengapmarks1:{
        type: String
    },
    provengapmarks2:{
        type: String
    },
    capabilitymarks1:{
        type: String
    },
    capabilitymarks2:{
        type: String
    },
    implementationmarks1:{
        type: String
    },
    implementationmarks2:{
        type: String
    },
    implementationmarks3:{
        type: String
    },
    communicationmarks1:{
        type: String
    },
    communicationmarks2:{
        type: String
    },
    communicationmarks3:{
        type: String
    },
    commercializationmarks1:{
        type: String
    }
})

const enterproposalreportmarks = mongoose.model("enterproposalreportmarks", ProposalReportMarksSchema)

module.exports = enterproposalreportmarks