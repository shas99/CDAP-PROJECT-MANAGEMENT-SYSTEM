import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  //const [fetchGroupData, setGroupData] = useState("");
  //Supervisor suggestions moved to MatchedSupervisors component by Pasindu Vinod on 16/04/2022
  // const [suggestions,setsuggestions] = useState("")
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
      
        <Link to="/viewfeedback" id="Regs"><button className="buttons" onClick="/viewfeedback ">View Feedback</button></Link>
        <br/>
        <Link to="/viewmarks" id="Regs"><button className="buttons" onClick="/viewmarks ">View marks</button></Link>
          <br/>
      
        <Link to="groupconfiguration" id="GroupConfig"><button className="buttons" onClick="groupconfiguration">Group Configuration</button></Link>
        <br></br><Link to="matchedsupervisors" id="MatchedS"><button className="buttons" onClick="matchedsupervisors">Matched supervisors</button></Link><br></br>
      {/* Supervisor suggestions moved to MatchedSupervisors component by Pasindu Vinod on 16/04/2022 */}
      
  
    <Footer/>
    </div>
    </>
  );
};

export default PrivateScreen;
