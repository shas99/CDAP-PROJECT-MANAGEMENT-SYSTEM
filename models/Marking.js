const mongoose = require('mongoose')

const RubricsfromtemplateSchema = new mongoose.Schema({ //CustomRubrics Schema
    entries: {
        type: Object
    },
    // visibility: {
    //     type: Boolean
    // },
    // Heading: {
    //     type: String
    // },
    // Description: {
    //     type: String
    // },
    // SubmissionPageLink:{
    //     type: String
    // },
    // Date: {
    //     type: Date
    // },
    // Fields: {
    //     type: Array
    // },
    // heading:{
    //     type: String
    // }

    
})
const Marking = mongoose.model("marking", RubricsfromtemplateSchema)
module.exports = Marking