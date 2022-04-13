const mongoose = require('mongoose')


const GroupSchema = new mongoose.Schema({//Group model

    member_1: {
        type: String
    },
    member_2: {
        type: String
    },
    member_3: {
        type: String
    },
    member_4: {
        type: String
    },
    member_5: {
        type: String
    }

  


})

const Group = mongoose.model("Group", GroupSchema)

module.exports = Group