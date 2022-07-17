import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"

const Status = ({history}) => { 
  const [feedbackData, setFeedbackData] = useState([])
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
  const [heading, setHeading] = useState([]);
  useEffect(() => {

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/student/retrieveData", config);

        setPrivateData(data.data);
        setHeading(data.data.heading);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchFeedbackData = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/status",userprofileconfig);
       
        setFeedbackData(data.data);
        
      } catch (error) {


      }
    };
  
    fetchFeedbackData()
    fetchPrivateDate()
  }, [history]);



  
  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :
  (

<div className="userprofileClass">
  <Header/>
  <br/>




<p className="userprofilecontent2"> {console.log(feedbackData)}</p>  

<p className="userprofilecontent1">Status of Submissions</p>
<br/>
existing forms
{feedbackData.map((data) => 

        <p className="userprofilecontent1">{data.Heading}</p>

)}

{console.log(heading)}

Completed forms
{heading.map((data) =>
  <p className="userprofilecontent1">{data}</p>
)}


</div>
 
    
)  
};

export default Status;
