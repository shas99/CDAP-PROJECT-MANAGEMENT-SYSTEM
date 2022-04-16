import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";



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
        const { data} = await axios.get("/api/auth/viewfeedback",feedbackconfig);
        const groupArray = data.data.split("/")
        setFeedbackData(groupArray[0]);
      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchFeedbackData()

  }, [history]);

  
  
  return   ( 
  
    <>
    <div id="back">
    <div style={{background:"green",color:"white"}}>{}</div>
    <p style={{color:"#FF0",textAlign:"right"}}>
    Hello, {}  
    &nbsp;&nbsp;&nbsp;&nbsp;
   
   
      <h1>Your Feedbacks are</h1>
      {fetchFeedbackData}<br/><br/><br/><br/>
     
      </p>
    
    </div>
    </>
  )  
};

export default ViewFeedback;