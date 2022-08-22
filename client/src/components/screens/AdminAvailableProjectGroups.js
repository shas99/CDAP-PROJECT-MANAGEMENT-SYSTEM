import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import Header from "../Header/Header";



const AdminAvailableProjectGroups = ({history}) =>{
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
        const{data} = await axios.get("/api/group/viewgroups",projectsconfig);
        console.log(data)
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
    fetchPrivateDate()
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
 



  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div style={{backgroundColor:"#22272E"}}>
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminStudentGroups"/>
       </div>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="" style={{marginTop:"-475px"}}>All Groups</h1>
      <br/><br/>


    

        
         <ul>
        {ProjectsData.map(project => {
          return (
           <div>
      <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ml-[35rem]" >
              <center><p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{project.name}</p></center>
            <div className='mb-3 font-normal text-gray-700 dark:text-gray-400 ml-[4rem]'>
                        
                          <li ><b>Member 1</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_1}</li> 
                          <li><b>Member 2</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_2}</li> 
                          <li><b>Member 3</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_3}</li>
                          <li ><b>Member 4</b>:&nbsp;&nbsp;&nbsp;&nbsp;{project.member_4}</li>
                          <li ><b>Member 5</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_5}</li> <br/>
                          <div className="placeBidToBtn" > <a href={`/adminViewGroup/${project._id}`} className=" ml-[3.5rem] inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Group</a></div>
                          <br/>
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
export default AdminAvailableProjectGroups;




   
  