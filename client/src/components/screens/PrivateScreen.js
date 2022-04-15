import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";

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
    <div style={{background:"green",color:"white"}}>{privateData}</div>
    <p style={{color:"#FF0",textAlign:"right"}}>
    Hello, {privateData}  
    &nbsp;&nbsp;&nbsp;&nbsp;
  
    <button onClick={logOutHandler} id="logout">Log Out</button>
      </p>
      <div className="button">
        <button onClick="/viewfeedback "><Link to="/viewfeedback" id="Regs">View Feedback</Link></button>
        <br/>
        <button onClick="/viewmarks "><Link to="/viewmarks" id="Regs">View marks</Link></button>

      </div>
    
    </div>
    </>
  );
};

export default PrivateScreen;
