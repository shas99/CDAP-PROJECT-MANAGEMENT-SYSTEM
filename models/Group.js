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
    },
    g_approval:{
        type:Boolean
    },
    suggestions:
    {
        type:String
    },
    g_members:
    {
        type:Array
    }
  


})

const Group = mongoose.model("Group", GroupSchema)

module.exports = Group