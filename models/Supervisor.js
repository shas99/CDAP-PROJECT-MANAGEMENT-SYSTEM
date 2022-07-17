const mongoose = require('mongoose')


const SupervisorSchema = new mongoose.Schema({//Topic Registration Model


    StaffID: {
        type: String
    },
    Name: {
        type: String
    },
    Bidders: {
        GroupID: {
            type : String
        },
        BatchID: {
            type : String
        },
        Approved: {
            type : Boolean
        },
        recommended: {
            type : Boolean
        },

    }

    
    


})

const Supervisor = mongoose.model("Supervisor", SupervisorSchema)

module.exports = Supervisor