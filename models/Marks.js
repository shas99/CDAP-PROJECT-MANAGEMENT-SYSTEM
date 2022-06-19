const mongoose = require('mongoose')

const MarksSchema = new mongoose.Schema({


    groupID: {
        type: String
    },
    submissionID: {
        type: String
    },
    studentnames:{
        type: String
    },
    provengapmarks:{
        type: String
    },
    capabilitymarks:{
        type: String
    },
    implementationmarks:{
        type: String
    },
    communicationmarks:{
        type: String
    },
    commercialisationmarks:{
        type: String
    },
    totalmarks:{
        type: String
    },
    extrafeedback:{
        type: String
    }
})

const entermarks = mongoose.model("entermarks", MarksSchema)

module.exports = entermarks