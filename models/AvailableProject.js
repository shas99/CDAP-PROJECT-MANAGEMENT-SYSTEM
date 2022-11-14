const mongoose = require('mongoose')

const AvailableProjectSchema = new mongoose.Schema({ //AvailableProject Schema

//   _id: {
//     type: Object
// },

//need to add a batch field for multipe batches
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
  batch:{
    trype:String
  },
  projectSupervisedBy:{
    type:String
  },
  StaffID:{
    type:String
  },
  publishedDate:{
    type:String
  },
  projectStatus:{
    type:Boolean
  },
  Approved:{ //is approved? once supervisor approved a team this should be updated
    type:Boolean
  },
  bidding:{
    GroupID:{
      type:String
    },
    date:{
      type:String
    },
    time:{
      type:String
    },
    approved:{
      type:Boolean
    },
    rejected:{
      type:Boolean
    }
  },
  allBiddings:[]
})
const AvailableProject = mongoose.model("availableProjects", AvailableProjectSchema)
module.exports = AvailableProject