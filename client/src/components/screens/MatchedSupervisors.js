import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";


const MatchedSupervisors = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    const [suggestions,setsuggestions] = useState("")
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
  
    //   const fetchGroupData = async () => {
    //     const groupconfig = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //       },
    //     };
  
    //     try {
    //       const { data} = await axios.get("/api/auth/group",groupconfig);
    //       const groupArray = data.data.split("/")
    //       setGroupData(groupArray[0]);
    //     } catch (error) {
  
    //       // setError("Oops couldn't retreive group data");//fix this
    //     }
    //   };
      const fetchsuggestions = async () => {
        const suggestconfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        try {
          const { data} = await axios.get("/api/auth/group",suggestconfig);
          const sugArray = data.data.split("/")
          setsuggestions(sugArray[1]);
        } catch (error) {
          console.log(error)
          // setError("Oops couldn't retreive suggestions");//fix this
        }
      };
    //   fetchGroupData()
      fetchsuggestions()
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
        
        <p style={{color:"#FF0",textAlign:"right"}}>
        Hello, {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FF0"}}>
          <br/><br/><br/><br/>
          
          <h1 id="caption">Your Supervisor suggestions are</h1>
          <p id="data">{suggestions}</p>
          </p>
        
        </div>
        </>
      );
    };
    
    export default MatchedSupervisors;