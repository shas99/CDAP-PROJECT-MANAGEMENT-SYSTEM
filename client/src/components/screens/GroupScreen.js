import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import { Link } from "react-router-dom";

const GroupScreen = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    const [suggestions,setsuggestions] = useState("")
    const [member_1, setMember1] = useState("");
    const [member_2, setMember2] = useState("");
    const [member_3, setMember3] = useState("");
    const [member_4, setMember4] = useState("");
    const [member_5, setMember5] = useState("");
    const [group,setgroup] = useState("")
    const [fetchGroupData, setGroupData] = useState("");
    useEffect(() => {
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
              console.log(groupArray[0])
              const group1 = groupArray[0].split(",")
              setgroup(group1)
              setGroupData(groupArray[0]);
            } catch (error) {
      
              // setError("Oops couldn't retreive group data");//fix this
            }
          };
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
          const suggArray = sugArray[1].split(",")
          // console.log(suggArray)
          suggArray.map((a) => console.log(a))
          setsuggestions(suggArray);
        } catch (error) {
          console.log(error)
          // setError("Oops couldn't retreive suggestions");//fix this
        }
      };
    //   fetchGroupData()
      fetchsuggestions()
      fetchPrivateDate();
      fetchGroupData()
    }, [history]);
  
    //Logout feature
    const logOutHandler=()=>{
      localStorage.removeItem("authToken");
      history.push("/login");
  
    };
    const groupregisterHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
          const { data } = await axios.post(
            "/api/auth//groupregister",
            { member_1,member_2,member_3,member_4,member_5 },
            config
          );
    
    
    
          history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };

      const listHandler=()=>{
        try{
    
          const lists = group.map((n)=>
          <li>{n}</li>)
          return(
            <ul>{lists}</ul>
          )
        }catch(e){
          console.error(e)
        }
        // <ul>
        // {suggestions.map((m) => <li>{m}</li>)}
        // </ul>
    
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
    
          {listHandler()}
          </p>
        
        </div>
        </>
      );
    };
    
    export default GroupScreen;