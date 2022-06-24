const mongoose = require('mongoose')

const MarkingRubrikSchema = new mongoose.Schema({ //Rubrik Schema

    //Append fields based on marking rubrik variables

    affectedTotalContribution:{

    },
    excellentGradeRange:{
        type:String
    },
    goodGradeRange:{
        type:String
    },
     averageGradeRange:{
        type:String
     },
     belowAverageGradeRange:{
        type:String
     },
     affectedL01Grade:{
        type:String
     },
     affectedL02Grade:{
        type:String
     },
     affectedL03Grade:{
        type:String
     },
     affectedL04Grade:{
        type:String
     },
     affectedL05Grade:{
        type:String
     }

 
})
const MarkingRubrik = mongoose.model("markingRubrik", MarkingRubrikSchema)
module.exports =MarkingRubrik