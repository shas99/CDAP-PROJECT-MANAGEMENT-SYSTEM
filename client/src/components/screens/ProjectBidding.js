import axios from 'axios';
import React from 'react'
import "./GroupScreen.css";
import {useParams} from 'react-router-dom';
import { useState } from "react";

import "./ProjectBiddingScreen.css";
export default function ProjectBidding() {
  const [bidPlacedGroup, setBiddingPlacedGroup] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    // const [error, setError] = useState("");
    const [projectName,setProjectName] =useState("");
    const [projectDesc,setProjectDesc] =useState("");
    const [projectSupervisedBy,setProjectSupervisedBy]=useState("");
    
        const params =useParams();
        const projectID = params.id;
        console.log(projectID)
    

    //*******BIDDING PLACE HANDLER FUNCTION *******/
    const biddingPlaceHandler = async (e) => {
      e.preventDefault();
      try {
        
        const { data } = await axios.put(
          `http://localhost:5000/api/AvailableProject/availableProjects/placeBidding/${projectID}`,
          { bidPlacedGroup,date,time }
          );
          alert("Bidding success")
        console.log(data)
        console.log(bidPlacedGroup)
       
      } catch (error) {
        // setError(error.response.data.error);  
        // console.log(error.response.data.error)
        alert("Error bidding notset")
            
      }
    };
    const getRelevantProjectData =async ()=>{
     
      try{
        const{data}=await axios.get(`http://localhost:5000/api/AvailableProject/availableProjects/${projectID}`);
        console.log(data.availableProjects.projectSupervisedBy)
        setProjectName(data.availableProjects.projectName)
        setProjectDesc(data.availableProjects.projectDescription)
        setProjectSupervisedBy(data.availableProjects.projectSupervisedBy)

      }catch(error){
        
        
      }
      

    }
    getRelevantProjectData();


  return (
    
    <div div className="bid-screen"> 
      {/* Project Details  */}
      <h1 className="bid-screen__title ">Project details</h1>
      
      < div className="bidcard">
        <h1>{projectName}</h1>
        <h1>{projectDesc}</h1>
        <h1>{projectSupervisedBy}</h1>
       <br></br> </div>
     

        {/* <div id="card">

            <h1 id="caption">Your group members are</h1>
            <hr id="hr"></hr>
            <p id="List">
            {listHandler()}
            </p>
          </div> */}

          {/* Form  */}
          <form onSubmit={biddingPlaceHandler} className="bid-screen__form"  >
       <div >
        <label className="form-group" >
          Your Group ID:</label><br></br>
          <input type="text" 
          className = "input"
          name="name" 
          onChange={(e) => setBiddingPlacedGroup(e.target.value)}
          value={bidPlacedGroup} />  
        </div>
        <div>
        <label className="form-group">
           Date:</label><br></br>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setDate(e.target.value)}
          value={date} />
          </div>
          <div>
        <label>
           Time :</label><br></br>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setTime(e.target.value)}
          value={time} />
          </div>
      <button type="submit" className="btn btn-primary1" id="Log1Button">
         Place Bid
         </button>

        
      </form>
     

    </div>
   
  )
}
