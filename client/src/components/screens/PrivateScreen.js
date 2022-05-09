import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/private", config);
        
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };



    fetchPrivateDate();
  }, [history]);

  //Logout feature
  const logOutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");

  };

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) : ( 

    <>
    <div id="back">

      <Header/>
    <h1 id="caption">Welcome to your dashboard {privateData}</h1>
    <p style={{color:"#FFF",textAlign:"right"}}>
 
    <button onClick={logOutHandler} id="logout">Log Out</button>
      </p>
      

      <Link to="/viewfeedback" id="Regs"><button className="buttons" onClick="/viewfeedback ">View Feedback</button></Link>
        <br/>
        <Link to="/viewmarks" id="Regs"><button className="buttons" onClick="/viewmarks ">View Marks</button></Link>
        
       
          <br/>


      <Link to="groupscreen" id="GroupConfig"><button className="buttons" onClick="groupscreen">My Group</button></Link>
        <br></br><Link to="matchedsupervisors" id="MatchedS"><button className="buttons" onClick="matchedsupervisors">Matched Supervisors</button></Link><br></br>
        <Link to="/topicregistration" id="Regs"><button className="buttons" onClick="/topicregistration ">Student - Topic Registration Form</button></Link>
      <br></br>
        <Link to="/viewavailableprojects" id="Regs"><button className="buttons" onClick="/viewavailableprojects ">View Available Projects</button></Link>
  
    <Footer/>

     </div>
    </>
  );
};

export default PrivateScreen;