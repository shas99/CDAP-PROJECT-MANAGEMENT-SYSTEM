const mongoose = require('mongoose')


const TopicRegSchema = new mongoose.Schema({//Topic Registration Model


    groupID: {
        type: String
    },
    Topic: {
        type: String
    },
    topicdescription: {
        type: String
    },
    abstract: {
        type: String
    },
    researchProblem: {
        type: String
    },
    solution: {
        type: String
    },
    systemOverview: {
        type: String
    },

    objective:{
        type: String
    },
    
    projecttask:{
        type: String
    },

    technologies:{
        type: String
    }
    
    


})

const TopicReg = mongoose.model("TopicReg", TopicRegSchema)

module.exports = TopicReg