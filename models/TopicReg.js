const mongoose = require('mongoose')


const TopicRegSchema = new mongoose.Schema({//Topic Registration Model

    
    groupID: {
        type: String
    },
    Topic: {
        type: String
    },
    topic_1: {
        type: String
    },
    topic_2: {
        type: String
    },
    topic_3: {
        type: String
    },
    topic_4: {
        type: String
    },
    topic_5: {
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