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

{/* {console.log(ProjectsData)} */}
        
         <ul>
        {ProjectsData.map(project => {
          return (
            <div className="card" style={{borderRadius:"20px",height:"225px",width:"30rem",margin:"15px auto"}}>
        <center><p style={{backgroundColor: "#8256D0",fontSize:"large",paddingTop:"01px",fontWeight:"bold",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",borderRadius:"2px",width:"30rem",margin:"0 auto",textAlign:"center",alignContent:"center"}}>{project.name}</p></center>
      <div>
                   
                    {/* <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Staff ID</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project._id}</li>  */}
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>username</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.username}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>email</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.email}</li>
                    <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"80px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",padding:"2px",width:"120px",textAlign:"center",margin:"0 auto"}}> <button onClick={e => assignController(`${project._id}`)}>Assign staff</button></div>
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
export default AssignStaff;




   
  