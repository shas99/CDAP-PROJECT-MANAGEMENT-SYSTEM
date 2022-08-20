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
    Recommended: {
        type : Boolean
    },
    Project: {
        type: String
    },
    Groupid: {//Group object ID
        type: String
    }
})

const Supervisor = mongoose.model("Supervisor", SupervisorSchema)

module.exports = Supervisor