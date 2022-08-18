import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import Header from "../Header/Header";



const CoordinatorViewAvailableProjects = ({history}) =>{
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
  alert("Deleted Successfully");
  console.log(_id)
  axios.delete(`/api/AvailableProject/deleteProjectDetails/${_id}`).then((res) => {
    this.fetchProjectsData();
  });
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
      <h1 id="caption" className="">All projects</h1>
      <br/><br/>
      <center>
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
     <a href="/createNewProject">Add New Project</a> 
      </button>
        </center>
        
         <ul>
        {ProjectsData.map(project => {
          return (
            <div className="card" style={{borderRadius:"20px",height:"275px"}}>
        <center><p style={{backgroundColor: "#8256D0",fontSize:"large",fontWeight:"bold",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",borderRadius:"2px"}}>{project.projectName}</p></center>
      <div>
                   
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Description</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.projectDescription}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Bidding Count</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.projectBiddingCount}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Supervised By</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.projectSupervisedBy}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Project Type</b>:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{project.projectType}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Published Date</b>: &nbsp;&nbsp;{project.publishedDate}</li>
                    <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"55px",borderRadius:"5px",color:"white",margin:"18px",padding:"2px",marginLeft:"20px"}}> <a href={`/updateProjectDetails/${project._id}`}>&nbsp;   Edit</a></div>
                    <div className="placeBidToBtn bg-red-800 hover:bg-red-500 w-[60px] ml-[20px] rounded-[5px]" > <button  onClick={() => removeData(project._id)}>  &nbsp; Delete </button></div>

      </div>
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




   
  