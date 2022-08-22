import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import Header from "../Header/Header";
import { useParams } from 'react-router-dom';


const SupervisorViewBidding = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
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
        const{data} = await axios.get("/api/AvailableProject/ViewStaffBiddings",projectsconfig);
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
  alert("Deleted Successfully");
  console.log(_id)
  axios.delete(`/api/AvailableProject/deleteProjectDetails/${_id}`).then((res) => {
    this.fetchProjectsData();
  });
};


  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div className='bg-gray-900 h-[55rem]'>
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminProjects"/>
       </div>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="" style={{marginTop:"-475px"}}>All projects</h1>
      <br/><br/>
      <center>

        </center>
        {console.log(ProjectsData)}
         <ul>
        {ProjectsData.map(project => {
          return (
            

<div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ml-[35rem]">
    <a >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{project.GroupID}</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400"><b>Group Name : </b> {project.GroupID} <br/>
    <b>Batch ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {project.BatchID} </b>
    </p>
    <a href={`/viewBidding/${project._id}`} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        View Bidding
        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
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
export default SupervisorViewBidding;




   
  