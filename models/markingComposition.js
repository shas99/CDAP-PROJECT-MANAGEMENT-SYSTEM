const mongoose = require('mongoose')

const markingCompositionfromtemplateSchema = new mongoose.Schema({ //CustomRubrics Schema
    BatchID: {
        type: String
    },
    selectedRubric:{
        type: Array
    }    
})
const Markingcomposition = mongoose.model("markingcomposition", markingCompositionfromtemplateSchema)
module.exports = Markingcomposition