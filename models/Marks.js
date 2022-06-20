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
})

const entermarks = mongoose.model("entermarks", MarksSchema)

module.exports = entermarks