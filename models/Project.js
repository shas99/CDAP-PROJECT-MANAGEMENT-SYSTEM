const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    projectname: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    projectID:{
        type: String
    },
});

const Project = mongoose.model("Project", ProjectSchema)

module.exports = Project