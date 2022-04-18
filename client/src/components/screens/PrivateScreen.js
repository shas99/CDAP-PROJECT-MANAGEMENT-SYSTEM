import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



const PrivateScreen = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  // const [fetchGroupData, setGroupData] = useState("");
  // const [member_1, setMember1] = useState("");
  // const [member_2, setMember2] = useState("");
  // const [member_3, setMember3] = useState("");
  // const [member_4, setMember4] = useState("");
  // const [member_5, setMember5] = useState("");
  // const [group,setgroup] = useState("")
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

  // const groupregisterHandler = async (e) => {
  //   e.preventDefault();

  //   const config = {
  //     header: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   try {
  //     const { data } = await axios.post(
  //       "/api/auth/groupregister",
  //       { member_1,member_2,member_3,member_4,member_5 },
  //       config
  //     );



  //     history.push("/");
  //   } catch (error) {
  //     setError(error.response.data.error);
  //     setTimeout(() => {
  //       setError("");
  //     }, 5000);
  //   }
  // };




  
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
      
        
        {/* <Link to="GroupScreen" id="MatchedS"><button className="buttons" onClick="GroupScreen">Group</button></Link><br></br> */}

      {/* Supervisor suggestions moved to MatchedSupervisors component by Pasindu Vinod on 16/04/2022 */}
      

  
    <Footer/>

     </div>
    </>
  );
};

export default PrivateScreen;