import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
    }, [history]);
  
    //Logout feature
    const logOutHandler=()=>{
      localStorage.removeItem("authToken");
      history.push("/login");
  
    };

    const listHandler=()=>{
      try{

        const lists = suggestions.map((n)=>
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
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          <h1 id="caption">Your Supervisor suggestions are</h1>
    
          {listHandler()}
          </p>
        <Footer/>
        </div>
        </>
      );
    };
    
    export default MatchedSupervisors;
