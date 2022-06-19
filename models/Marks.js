const mongoose = require('mongoose')

const MarksSchema = new mongoose.Schema({


    groupID: {
        type: String
    },
    milestonemarks:{
        type: String
    },
    extrafeedback:{
        type: String
    }
})