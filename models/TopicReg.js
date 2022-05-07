const mongoose = require('mongoose')


const TopicRegSchema = new mongoose.Schema({//Topic Registration Model

    groupleader: {
        type: String
    },
    groupID: {
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
    }
    
    
   
  


})

const TopicReg = mongoose.model("TopicReg", TopicRegSchema)

module.exports = TopicReg