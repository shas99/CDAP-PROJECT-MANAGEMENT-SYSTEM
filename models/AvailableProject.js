const mongoose = require('mongoose')


const AvailableProjectSchema = new mongoose.Schema({//Topic Registration Model

  projectName: {
        type: String
    },
     projectDescription: {
        type: String
    },
    projectBiddingCount:{
      type:Number
    }
    
    
   
  


})

const AvailableProject = mongoose.model("availableProjects", AvailableProjectSchema)

module.exports = AvailableProject