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

module.exports = Project = mongoose.model('project',ProjectSchema);