const mongoose = require('mongoose')

const CustomRubricsSchema = new mongoose.Schema({ //CustomRubrics Schema
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
    }

    
})
const CustomRubrics = mongoose.model("customRubric", CustomRubricsSchema)
module.exports = CustomRubrics