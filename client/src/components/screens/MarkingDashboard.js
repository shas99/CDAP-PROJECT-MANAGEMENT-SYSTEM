import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../StaffSideNavigationBar/StaffSideNavigationBar';
import Header from "../Header/Header";
import './StaffAvailableProject.css'
import e from 'cors';
import { Link } from 'react-router-dom';


const MarkingDashboard = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
  const [handleSearchArea, useHandleSearchArea] = useState("");
  const [searchtext, setSearchText] = useState("");
  const [stID, setStID] = useState("")
  useEffect(() => {

    var staffID
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/staffPrivate/staffPrivate", config);
        
        setPrivateData(data.data);
        setStID(data.data2)
        staffID = data.data2
        fetchProjectsData()
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
        const{data} = await axios.post(
          `/api/group/viewgroups`,
          {stID:staffID},
          projectsconfig);
        console.log(data)
        //console.log(typeof data.data);
        console.log("stID")
        console.log(stID)
        console.log("stID")
        const array = Object.entries(data.data)
        setProjectsData(data.data);
       // console.log(array);

        // console.log(ProjectsData)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        
      }
    
    }


    // fetchProjectsData()
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

 const searchBox = (e) =>{

  setSearchText(e.target.value)
 }

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    // make the background cover teh whole screen
    <div style={{backgroundColor:"#22272E", height:"100vh"
    }}>
      {/* cover the whole screen */}
      
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="StudentGroups"/>
        </div>
        {/* get the Link to center */}
        <div style={{marginTop:"-750px" ,marginLeft:"500px"}}>
<div>
    {/* Link to redirect with a button */}
    <Link to="/staffproject">
        <button className="btn btn-primary">Supervisor Marking</button>
    </Link>
    </div>
    <div>
    {/* Link to redirect with a button */}
    <Link to="/panelProject">
        <button className="btn btn-primary">Panel Marking</button>
    </Link>
    </div>
</div>



    
    </div>
    
    
  )
}
export default MarkingDashboard;




   
  