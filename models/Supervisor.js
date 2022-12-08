const mongoose = require('mongoose')


const SupervisorSchema = new mongoose.Schema({//Topic Registration Model


    StaffID: {
        type: String
    },
    // Name: {
    //     type: String
    // },
    GroupID: {//Group name
        type : String
    },
    BatchID: {
        type : String
    },
    Approved: {
        type : Boolean
    },
    //recommended and project removed by pasinduV 10/11/22 for new bidding system
    // Recommended: {
    //     type : Boolean
    // },
    Project: {  //taf object id
        type: String
    },
    // Groupid: {//Group object ID
    //     type: String
    // },
    rejected: {
        type: Boolean
    },
    feedback: {
        type: String
    }

})

const Supervisor = mongoose.model("Supervisor", SupervisorSchema)

module.exports = Supervisor