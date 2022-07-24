import React from 'react'
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
import {useParams} from 'react-router-dom';
import  {useEffect } from 'react';

export default function UpdateProjectDetails() {

    // Need to set form variables
    const [oldprojectName, oldsetProjectName] = useState("");
    const [oldprojectDescription, oldsetProjectDescription] = useState("");
    const [oldprojectSupervisedBy, oldsetProjectSupervisedBy] = useState("");
    const [oldprojectType, oldsetProjectType] = useState("");

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectSupervisedBy, setProjectSupervisedBy] = useState("");
    const [projectType, setProjectType] = useState("");



    const params =useParams();
        const projectID = params.id;

      //  Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
   // Retrieve specific projec details api needed
   const getRelevantProjectData =async ()=>{
     
    try{
      const{data}=await axios.get(`/api/AvailableProject/availableProjects/${projectID}`);
      //setvalues for form
      oldsetProjectName(data.availableProjects.projectName)
      oldsetProjectDescription(data.availableProjects.projectDescription)
      oldsetProjectSupervisedBy(data.availableProjects.projectSupervisedBy)
      oldsetProjectType(data.availableProjects.projectType)

    }catch(error){
      
      
    }
    

  }
  getRelevantProjectData();

  });   
   
    // Update specific project details api needed
 //*******UPDATE PROJECT DETAILS HANDLER FUNCTION *******/
 const updateProjectDetailsHandler = async (e) => {
  e.preventDefault();
  try {
    
    const { data } = await axios.put(
      `/api/AvailableProject/updateProjectDetails/${projectID}`,
      { projectName ,projectSupervisedBy , projectType ,projectDescription }
      );
      alert("Project Details Updated Successfully")
    console.log(data)
  } catch (error) {
    alert("Error Updating notset")
        
  }
};

    // delete specific project details api needed


  return (
    <div className='bg-gray-900 w-130  h-[50rem] ' > Update Project

        {/* Need a template form to take inputs from the user (done)
        The form should fetch specific project details from the database 
        The form should update the project details in the database */}
        <form className=' w-[35rem] absolute rounded top-[110px] right-[350px] h-auto' onSubmit={updateProjectDetailsHandler} >
 <br/>
  <div class="mb-6 w-56 ">
    <label for="email" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Project Name</label>
    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light left-50"  required="" onChange={(e) => setProjectName(e.target.value)} placeholder={oldprojectName}
          value={projectName} />
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Supervised By</label>
    <input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required=""
      placeholder={oldprojectSupervisedBy} onChange={(e) => setProjectSupervisedBy(e.target.value)}
      value={projectSupervisedBy} />
  </div>
  {/* <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Time </label>
    <input type="text" id="time" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setaTime(e.target.value)}
          value={time} />
  </div> */}

  <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Project Type</label>
    <input type="text" id="deadline" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" 
        placeholder={oldprojectType} onChange={(e) => setProjectType(e.target.value)}
        value={projectType}   />
  </div>

  


  <label for="message" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-400">Description</label>
<textarea id="message" rows="4" class="block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." 
   placeholder={oldprojectDescription}   onChange={(e) => setProjectDescription(e.target.value)}
  value={projectDescription}     ></textarea>

  
  <button type="submit" class="text-white bg-purple-900 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Update Details</button>

</form>

        


    </div>
  )
}
