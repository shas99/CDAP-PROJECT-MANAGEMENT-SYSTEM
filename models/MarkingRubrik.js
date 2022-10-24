const mongoose = require('mongoose')

const MarkingRubrikSchema = new mongoose.Schema({ //Rubrik Schema

    //Append fields based on marking rubrik variables
    markingRubrikType:{
        type:String
    },
    affectedTotalContribution:{
        type:String
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
     },
     statusDocumentDescription01:{
      type:String
     },
     statusDocumentDescription02:{
      type:String
     },
     statusDocumentDescription03:{
      type:String
     },
     statusDocumentDescription04:{
      type:String
     },
     statusDocumentDescription05:{
      type:String
       },
     statusDocumentDescription06:{
      type:String
       },

      marksEntitledForStatusDocumentDescription01:{
      type:String
      },
      marksEntitledForStatusDocumentDescription02:{
         type:String
      },
      marksEntitledForStatusDocumentDescription03:{
         type:String
      },
      marksEntitledForStatusDocumentDescription04:{
         type:String
      },
      marksEntitledForStatusDocumentDescription05:{
         type:String
      },
      marksEntitledForStatusDocumentDescription06:{
         type:String
      }


 
})
const MarkingRubrik = mongoose.model("markingRubrik", MarkingRubrikSchema)
module.exports =MarkingRubrik