import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import Header from "../Header/Header";
import Swal from 'sweetalert2'



const CoordinatorViewAvailableProjects = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");

  const Swal = require('sweetalert2');
  useEffect(() => {

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/adminPrivate/adminPrivate", config);
        
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/AvailableProject/availableprojects",projectsconfig);
        //console.log(typeof data.data);
        const array = Object.entries(data.data)
        setProjectsData(data.data);
       // console.log(array);

        // console.log(ProjectsData)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        
      }
    
    }




    fetchProjectsData()
    // fetchPrivateDate()
  }, [history])
  const objectToArray = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for(let i = 0; i < keys.length; i++){
       res.push(obj[keys[i]]);
       setprojectarray(res)
      //  console.log(projectarray);
      
       
       

    };
    return res; 

 };
 
 
const removeData = (_id) => {
  // alert("Deleted Successfully");
  // console.log(_id)
  // axios.delete(`/api/AvailableProject/deleteProjectDetails/${_id}`).then((res) => {
  //   this.fetchProjectsData();
  // });
  try{
    Swal.fire({
      title:'Do you want to remove the project?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Delete',
      denyButtonText:`Don't delete`,

    }).then((result) =>{
      if(result.isConfirmed){
        Swal.fire('Deleted!','','success')
        axios.delete(`/api/AvailableProject/deleteProjectDetails/${_id}`).then((res) => {
            this.fetchProjectsData();
          });

      }else if(result.isDenied){
        Swal.fire('Not deleted','','info')
      }
    })
  }catch(error){
    alert("Delete not set");
  }
};


  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div style={{backgroundColor:"#22272E"}}>
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminProjects"/>
       </div>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="" style={{marginTop:"-575px"}}>All projects</h1>
      <br/><br/>
      <center>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
     <a href="/createNewProject">Add New Project</a> 
<br/>
      </button>
<br/> <br/>

    


        </center>
        
         <ul className='grid-flow-row '>
        {ProjectsData.map(project => {
          return (
            <div>
            <div className="ml-[35rem] p-6 max-w-sm w-[90rem] bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <center><p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{project.projectName}</p></center>
      <div className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                   
                    <li ><b>Description</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.projectDescription}</li> 
                    <li ><b>Bidding Count</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.projectBiddingCount}</li> 
                    <li><b>Supervised By</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.projectSupervisedBy}</li>
                    <li ><b>Project Type</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.projectType}</li>
                    <li ><b>Published Date</b>: &nbsp;&nbsp;{project.publishedDate}</li> <br/>
                    <div> <a href={`/updateProjectDetails/${project._id}`} className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Edit</a></div> <br/>
                    <div className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800" > <button  onClick={() => removeData(project._id)}> Delete </button></div>

      </div>
      </div>
      <br/>
      </div>
            
          )

        })} 
      </ul>  
      <br/>
      
      <br/>
     
      <br/><br/>
    


      <br/>
    

</div>
    
    
    
    
  )
}
export default CoordinatorViewAvailableProjects;




   
  