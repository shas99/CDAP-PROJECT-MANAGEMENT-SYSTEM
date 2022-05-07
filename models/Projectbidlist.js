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
const Projectbidlist = mongoose.model("Projectbidlist", ProjectbidlistSchema)

module.exports = Projectbidlist