import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";



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

    // const fetchGroupData = async () => {
    //   const groupconfig = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   };

    //   try {
    //     const { data} = await axios.get("/api/auth/group",groupconfig);
    //     const groupArray = data.data.split("/")
    //     setGroupData(groupArray[0]);
    //   } catch (error) {

    //     // setError("Oops couldn't retreive group data");//fix this
    //   }
    // };

    //Supervisor suggestions moved to MatchedSupervisors component by Pasindu Vinod on 16/04/2022
    // const fetchsuggestions = async () => {
    //   const suggestconfig = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   };

    //   try {
    //     const { data} = await axios.get("/api/auth/group",suggestconfig);
    //     const sugArray = data.data.split("/")
    //     setsuggestions(sugArray[1]);
    //   } catch (error) {
    //     console.log(error)
    //     // setError("Oops couldn't retreive suggestions");//fix this
    //   }
    // };
    // fetchGroupData()
    //Supervisor suggestions moved to MatchedSupervisors component by Pasindu Vinod on 16/04/2022
    // fetchsuggestions()
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
    <p style={{color:"#FFF",textAlign:"right"}}>
    Hello, {privateData}  
    &nbsp;&nbsp;&nbsp;&nbsp;
   
    <button onClick={logOutHandler} id="logout">Log Out</button>
      </p>
      
        <Link to="/viewfeedback" id="Regs"><button className="buttons" onClick="/viewfeedback ">View Feedback</button></Link>
        <br/>
        <Link to="/viewmarks" id="Regs"><button className="buttons" onClick="/viewmarks ">View marks</button></Link>

     
      <p style={{color:"#FF0"}}>
      <br/><br/><br/><br/>
      <br/><br/>
      
      
        <br></br><Link to="matchedsupervisors" id="MatchedS"><button className="buttons" onClick="matchedsupervisors">Matched supervisors</button></Link><br></br>
      {/* Supervisor suggestions moved to MatchedSupervisors component by Pasindu Vinod on 16/04/2022 */}
      
      </p>
    
    </div>
    </>
  );
};

export default PrivateScreen;
