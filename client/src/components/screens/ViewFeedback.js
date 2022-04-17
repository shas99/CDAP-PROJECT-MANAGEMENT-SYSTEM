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
  <br/>
      <h1 id="caption">My Feedbacks</h1>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 1 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> {fetchFeedbackData}</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 2 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> Not available</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 3 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> Not available</p> 
      </div>
      </div>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="feedback-topic"><b>Milestone 4 </b></h4> 
        <hr id="hr1"></hr>
        <p className="feedbackcontent"> Not available</p> 
      </div>
     
      </div>


      <br/>
      
</div>
 
    
)  
};

export default ViewFeedback;
