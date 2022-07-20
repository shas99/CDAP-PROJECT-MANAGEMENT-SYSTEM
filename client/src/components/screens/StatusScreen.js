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
  const [status, setStatus] = useState([]);
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

    const Status = async () => {
      // let x = [];
      // console.log("feedback")
      // console.log(feedbackData);
      // console.log("feedback")

      // for(var i=0;i<feedbackData.length;i++){
      //   for(var j=0;j<heading.length;j++){
      //     if(feedbackData[i].Heading===heading[j]){
      //       x.push(1);
      //     }


      //   }
      //   console.log("test")
      //   console.log(x.length+"  " + i)
      //   console.log("test")
      //   if(x.length!=i+1){
      //     // console.log("test")
      //     // console.log(x.length+"  " + i)
      //     // console.log("test")
      //     // x.push(0);
      //     // console.log(x.length+"ffff")

      //   }

      // }
      // setStatus(x);

            const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          let testing123 = [0];
        // const {data} = await axios.get("/api/staff/statusArray",{testing123});
        const { data } = await axios.get(
          "/api/staff/statusArray",
          {params:{ testing123 }},
        );
        console.log(data.data);
        
      } catch (error) {


      }

    }
  


    fetchFeedbackData()
    fetchPrivateDate()
    Status()
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


{console.log(status)}
</div>
    
)  
};

export default Status;
