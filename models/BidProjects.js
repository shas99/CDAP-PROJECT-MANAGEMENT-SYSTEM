const mongoose = require('mongoose')


const BidProjectSchema = new mongoose.Schema({//Available project bidding


    GroupID: {//Group name
        type : String
    },
    StaffID: {
        type : String
    },
    BatchID: {
        type : String
    },
    ProjectID: {
        type: String
    },
    Approved: {
        type : Boolean
    },
    rejected: {
        type: Boolean
    },
    CosuperID:{
        type: String
    },

})

const BidProject = mongoose.model("BidProject", BidProjectSchema)

module.exports = BidProject