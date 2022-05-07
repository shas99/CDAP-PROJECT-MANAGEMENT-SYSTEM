const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectbidlistSchema = new Schema({
    groupID: {
        type: String,
    },
    projects: [{
        projectID: {
            type: String,
        },
        name: String,
        quantity: {
            type: Number,
            required: true,
            min: [1, 'Quantity can not be less then 1.'],
            default: 1
        },
       
    }],
   
});
module.exports = Projectbidlist = mongoose.model('projectbidlist',ProjectbidlistSchema);