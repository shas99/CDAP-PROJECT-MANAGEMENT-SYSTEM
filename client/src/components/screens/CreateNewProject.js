import React from 'react'
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'
export default function CreateNewProject() {

    const Swal = require('sweetalert2')

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projectSupervisedBy,setProjectSupervisedBy]= useState("");
    const [projectType,setProjectType]=useState("");

    // Need Create project handler 
    //*******CREATE PROJECT HANDLER FUNCTION *******/
     const createProjectHandler = async (e) => {
        e.preventDefault();
        try {
          
          
            //SUCCESS SWEET ALERT MESSAGE
            Swal.fire({
              title: 'Do you want to save the changes?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Save',
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
                const { data } =  axios.post(
                  `/api/AvailableProject/addProjectDetails`,
                  {projectName,projectDescription,projectSupervisedBy,projectType} 
                  );
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
              }
            })
         
        } catch (error) {
          // setError(error.response.data.error);  
          // console.log(error.response.data.error)
          alert("Error Announcement notset")
              
        }
      };
  return (
    <div className='bg-gray-900 w-130  h-[55rem] '>
       
        {/* Need to add the form to create a new project */}
        <form className=' w-[35rem] absolute rounded top-[190px] right-[350px] h-auto' onSubmit={createProjectHandler}>
        <h1 className='  text-4xl text-gray-100 '>Add a New Project</h1> <br/>
        <div class="ml-[20rem] mt-[-5rem]">
                                                                                    
        <img src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-project-crowdfunding-flaticons-lineal-color-flat-icons.png"/>                                                               
                                                                          
        </div> <br/>


 
 <br/>
  <div class="mb-6 w-56 ">
    <label for="email" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Project Name</label>
    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light left-50"  required="" onChange={(e) => setProjectName(e.target.value)}
          value={projectName}/>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Project Supervised By</label>
    <input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setProjectSupervisedBy(e.target.value)}
          value={projectSupervisedBy}/>
  </div>
 

  <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Project Type</label>
    <input type="text" id="deadline" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setProjectType(e.target.value)}
          value={projectType} />
  </div>


  <label for="message" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-400">Description</label>
<textarea id="message" rows="4" class="block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={(e) => setProjectDescription(e.target.value)}
          value={projectDescription}></textarea>

  
  <button type="submit" class="text-white bg-purple-900 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Enter Project</button> &nbsp;
  <button type="submit" class="text-white bg-purple-900 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">  <a href='/coordinatorViewProjects'> Projects</a></button>

</form>



    </div>
  )
}
