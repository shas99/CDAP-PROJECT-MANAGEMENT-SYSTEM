const mongoose = require('mongoose')

const ProgressPresentation1MarksSchema = new mongoose.Schema({


    groupID: {
        type: String
    },
    studentIDs: {
        type: String
    },
    studentnames:{
        type: String
    },
    provengapmarks1:{
        type:String
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
    implementationmarks4:{
        type: String
    },
    implementationmarks5:{
        type: String
    },
    communicationmarks1:{
        type: String
    },
    communicationmarks2:{
        type: String
    },
    commercializationmarks:{
        type: String
    },
    extrafeedback:{
        type: String
    },
    recommendation:{
        type: String
    },
    examiner1:{
        type: String
    },
    examiner2:{
        type: String
    },
    moderator:{
        type: String
    }
})

const enterprogresspresentation1marks = mongoose.model("enterprogresspresentation1marks", ProgressPresentation1MarksSchema)

module.exports = enterprogresspresentation1marks