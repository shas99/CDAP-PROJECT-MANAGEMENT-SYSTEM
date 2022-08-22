import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../Header/Header";



const AssignStaff = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
  const [groupID, setGroupID] = useState(localStorage.getItem("groupId"));
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
        const{data} = await axios.get("/api/staff/retreiveStaff",projectsconfig);
        // console.log(data)
   
        const array = Object.entries(data.data)
        console.log(data);
        setProjectsData(data.data);

        
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

 const assignController = async (id) => {
  console.log("works"+id)

  const config = {
    headers: {
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`,
    },
  }

  const { data } = await axios.put(
    `http://localhost:5000/api/staff/assignStaff`,
    {
      id,
      groupID
    },
    config
  );

 }



  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div style={{backgroundColor:"#22272E"}}>
      <Header/>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="">All Groups</h1>
      <br/><br/>

        
         <ul>
        {ProjectsData.map(project => {

          return (
            <div>
                <div className="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 ml-[35rem]">
                  <center><p className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{project.name}</p></center>
                <div className='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                            
                              {/* <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Staff ID</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project._id}</li>  */}
                              <li ><b>username</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.username}</li> 
                              <li ><b>email</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.email}</li>
                              <br/>
                              <div className=" ml-[7rem] inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" > <button onClick={e => assignController(`${project._id}`)}>Assign staff</button></div>
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
export default AssignStaff;




   
  