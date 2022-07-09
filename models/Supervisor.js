const mongoose = require('mongoose')


const SupervisorSchema = new mongoose.Schema({//Topic Registration Model


    StaffID: {
        type: String
    },
    Name: {
        type: String
    },
    Reg_Bidders:{
        type: Array
    },
    June_Bidders:{
        type : Array
    },
    Reg_Groups:{
        type: Array
    },
    June_Groups:{
        type: Array
    }, 

    
    


})

const Supervisor = mongoose.model("Supervisor", SupervisorSchema)

module.exports = Supervisor