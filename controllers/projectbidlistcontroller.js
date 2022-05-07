const Projectbidlist = require('../models/Projectbidlist');
const Project = require('../models/Project');


module.exports.get_projectbidlist_projects = async (req,res) => {
    const groupID = req.params.id;
    try{
        let projectbidlist = await Projectbidlist.findOne({groupID});
        if(projectbidlist &&  projectbidlist.Project.length>0 ){
            res.send(projectbidlist);
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.add_projectbidlist_project = async (req,res) => {
    const userId = req.params.id;
    const { projectID, quantity } = req.body;

    try{
        let projectbidlist = await Projectbidlist.findOne({groupID});
        let project = await Project.findOne({_id: projectID});
        if(!project){
            res.status(404).send('Project not found!')
        }
     
        const name = project.name;
        
        if(projectbidlist){
            // if projectbidlist exists for the group
            let projectIndex = projectbidlist.projects.findIndex(p => p.projectID == projectID);

            // Check if project exists or not
            if(projectIndex > -1)
            {
                let projectProject = projectbidlist.projects[projectIndex];
                projectProject.quantity += quantity;
                projectbidlist.projects[projectIndex] = projectProject;
            }
            else {
                projectbidlist.projects.push({ projectID, name, quantity});
            }
            
            projectbidlist = await projectbidlist.save();
            return res.status(201).send(projectbidlist);
        }
        else{
            // no projectbidlist exists, create one
            const newProjectbidlist = await Projectbidlist.create({
                projectID,
                projects: [{ projectID, name, quantity }],
                
            });
            return res.status(201).send(newProjectbidlist);
        }       
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}

module.exports.delete_project = async (req,res) => {
    const groupID = req.params.groupID;
    const projectID = req.params.projectID;
    try{
        let projectbidlist = await Projectbidlist.findOne({groupID});
        let projectIndex = projectbidlist.projects.findIndex(p => p.projectID == projectID);
        if(projectIndex > -1)
        {
            let projectProject = projectbidlist.projects[projectIndex];
           
            projectbidlist.projects.splice(projectIndex,1);
        }
        projectbidlist = await projectbidlist.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}


