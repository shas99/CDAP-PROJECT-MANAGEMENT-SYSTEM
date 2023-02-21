const mongoose = require('mongoose')

const SubmissionPageSchema = new mongoose.Schema({ //SubmissionPage Schema
    BatchID: {
        type: String
    },
    visibility: {
        type: Boolean
    },
    Heading: {
        type: String
    },
    Description: {
        type: String
    },
    SubmissionPageLink:{
        type: String
    },
    Date: {
        type: Date
    },
    Fields: {
        type: Array
    },
    heading:{
        type: String
    },
    Submissions: {
        type: String
    }

    
})
const SubmissionPage = mongoose.model("submissionPageStructure", SubmissionPageSchema)
module.exports = SubmissionPage