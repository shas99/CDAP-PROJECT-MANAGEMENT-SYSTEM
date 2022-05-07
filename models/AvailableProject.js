const mongoose = require('mongoose')


const AvailableProjectSchema = new mongoose.Schema({ //AvailableProject Schema

  projectName: {
        type: String
    },
     projectDescription: {
        type: String
    },
    projectBiddingCount:{
      type:Number
    },
    projectType:{
      type:String
    },
    projectSupervisedBy:{
      type:String
    },
    publishedDate:{
      type:String
    }
})

const AvailableProject = mongoose.model("availableProjects", AvailableProjectSchema)

module.exports = AvailableProject