const mongoose = require('mongoose')

const MarksSchema = new mongoose.Schema({


    groupID: {
        type: String
    },
    studentIDs: {
        type: String
    },
    studentnames:{
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
    commercializationmarks1:{
        type: String
    }
})

const entermarks = mongoose.model("entermarks", MarksSchema)

module.exports = entermarks