const mongoose = require('mongoose')


const SupervisorSchema = new mongoose.Schema({//Topic Registration Model


    StaffID: {
        type: String
    },
    Name: {
        type: String
    },
    Bidders:{
        type: Array
    },
    Groups:{
        type: Array
    }, 
    
    


})

const Supervisor = mongoose.model("Supervisor", SupervisorSchema)

module.exports = Supervisor