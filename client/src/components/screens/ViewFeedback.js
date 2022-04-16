import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewFeedback.css";
// import { Link } from "react-router-dom";

const ViewFeedback = ({history}) => { 
  const [fetchFeedbackData, setFeedbackData] = useState("")

  useEffect(() => {

    const fetchFeedbackData = async () => {
      const feedbackconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/auth/viewfeedback",feedbackconfig);
       
        setFeedbackData(data.data);
        
      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchFeedbackData()

  }, [history]);
  

  
  return   ( 
  
   
<div className="view-feedback">
  <center>
      <h1>My Feedbacks</h1>
      <div class="card">
  <div class="container">
    <h4><b>John Doe</b></h4> 
    <p>Architect & Engineer</p> 
  </div>
</div>
      
      {fetchFeedbackData}<br/><br/><br/><br/>
  </center>
</div> 
    
  )  
};

export default ViewFeedback;