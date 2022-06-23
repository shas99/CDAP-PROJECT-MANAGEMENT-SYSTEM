import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";

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
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="">All Groups</h1>
      <br/><br/>


        
         <ul>
        {ProjectsData.map(project => {
          return (
            <div className="card" style={{borderRadius:"20px",height:"225px",width:"30rem",margin:"15px auto"}}>
        <center><p style={{backgroundColor: "#8256D0",fontSize:"large",paddingTop:"01px",fontWeight:"bold",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",borderRadius:"2px",width:"30rem",margin:"0 auto",textAlign:"center",alignContent:"center"}}>{project.name}</p></center>
      <div>
                   
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 1</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_1}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 2</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_2}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 3</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_3}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 4</b>:&nbsp;&nbsp;&nbsp;&nbsp;{project.member_4}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 5</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_5}</li>
                    <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"80px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",padding:"2px",width:"120px",textAlign:"center",margin:"0 auto"}}> <a href={`/viewgroup/${project._id}`}>View Group</a></div>
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
export default AdminAvailableProjectGroups;




   
  