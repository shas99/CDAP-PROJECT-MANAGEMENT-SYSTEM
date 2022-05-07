// const User = require('../models/User')
const AvailableProject = require('../models/AvailableProject')
// const topicReg = require('../models/AvailableProject')


//To view Available Projects
exports.viewAvailableProjects =async(req,res,next) => {

// console.log("Hello Project!")


try{

    const availableProjects = await AvailableProject.find()//group that is approved and have this perticular member
    console.log("Projects",availableProjects)// 

    res.status(201).json({
        success: true,
        data: res.AvailableProject
    })

    

}catch(error){
    res.status(500).json({success:false, error:error.message})
}

};

//To view a specific project
exports.viewspecificproject = async(req,res,next) => {
    
    try{
        const availableprojectid = req.params.id;
        const availableProjects = await AvailableProject.findById(availableprojectid)//group that is approved and have this perticular member
        console.log("Projects",availableProjects)// 
    
        res.status(201).json({
            success: true,
            data: res.AvailableProject
        })
    
        
    
    }catch(error){
        res.status(500).json({success:false, error:error.message})
    }
}

//final increase count
exports.increasebidcount = async(req,res,next) => {
    try{
        const availableprojectid = req.body;
        const projectcount = await AvailableProject.findById(availableprojectid)
        console.log(projectcount);
        projectcount.projectBiddingCount = projectcount.projectBiddingCount + 1; 
        await projectcount.save();
        
        

    }catch(error){
        res.status(500).json({success:false, error:error.message})

    }
}

//Increase project count
module.exports.add_projectbidlist_project = async (req,res) => {
    const userId = req.params.id;
    const { projectBiddingCount } = req.body;

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


