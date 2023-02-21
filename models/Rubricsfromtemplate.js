const mongoose = require('mongoose')

const RubricsfromtemplateSchema = new mongoose.Schema({ //CustomRubrics Schema
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
const TemplateRubric = mongoose.model("templateRubric", RubricsfromtemplateSchema)
module.exports = TemplateRubric