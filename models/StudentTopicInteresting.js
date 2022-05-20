const mongoose = require('mongoose')


const StudentTopicInterestingFormSchema = new mongoose.Schema({//Topic Registration Model
    student_ID: {
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

const StudentTopicInteresting = mongoose.model("StudentTopicInteresting", StudentTopicInterestingFormSchema)

module.exports = StudentTopicInteresting