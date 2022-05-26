const mongoose = require('mongoose')


const StaffTopicInterestingsSchema = new mongoose.Schema({//Topic Registration Model
    StaffID: {
        type: String
    },
    Q1:{
        type: String 
    },
    Q2:{
        type: String 
    },
    Q3:{
        type: String 
    },
    Q4:{
        type: String 
    },
    Q5:{
        type: String 
    },
    Q6:{
        type: String 
    },
    Q7:{
        type: String 
    }, 
})

const StaffTopicInterestings = mongoose.model("StaffTopicInterestings", StaffTopicInterestingsSchema)

module.exports = StaffTopicInterestings