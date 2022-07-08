const mongoose = require('mongoose')

const StatusDocument1MarksSchema = new mongoose.Schema({


    projectNo: {
        type: String
    },
    studentIDs: {
        type: String
    },
    ganttchartmarks:{
        type: String
    },
    actualtimemarks:{
        type: String
    },
    breakdownmarks:{
        type: String
    },
    managementtoolmarks:{
        type: String
    },
    ganttchartremarks:{
        type: String
    },
    actualtimeremarks:{
        type: String
    },
    breakdownremarks:{
        type: String
    },
    managementtoolremarks:{
        type: String
    },
    supervisor:{
        type: String
    },
    cosupervisor:{
        type: String
    }
})

const enterstatusdocument1marks = mongoose.model("enterstatusdocument1marks", StatusDocument1MarksSchema)

module.exports = enterstatusdocument1marks