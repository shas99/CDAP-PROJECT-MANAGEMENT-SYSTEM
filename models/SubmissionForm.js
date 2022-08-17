const mongoose = require('mongoose')

const SubmissionFormSchema = new mongoose.Schema({ //SubmissionPage Schema
    entries: {
        type: Object
    },
    heading: {
        type: String
    },
    studentID:{
        type:String
    },
    groupid:{
        type:String
    },

    
})
const SubmissionForm = mongoose.model("submissionForm", SubmissionFormSchema)
module.exports = SubmissionForm