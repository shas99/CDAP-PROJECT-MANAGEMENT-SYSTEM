import { useState, useEffect } from "react";
import axios from "axios";
import "./GroupConfiguration.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const GroupConfiguration = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [fetchGroupData, setGroupData] = useState("")
  
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

    const fetchGroupData = async () => {
      const groupconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/auth/group",groupconfig);
        const groupArray = data.data.split("/")
        setGroupData(groupArray[0]);
      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchGroupData()
    
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
    <p style={{color:"#FFF",textAlign:"right"}}>
    {privateData}  
    &nbsp;&nbsp;&nbsp;&nbsp;
   
    <button onClick={logOutHandler} id="logout">Log Out</button>
      </p>
     
      <p style={{color:"#FFF"}}>
      <br/><br/><br/><br/>
      <h1>Your group members are</h1> <br/>
      {fetchGroupData}<br/><br/><br/><br/>
     
      </p>
    <Footer/>
    </div>
    </>
  );
};

export default GroupConfiguration;
