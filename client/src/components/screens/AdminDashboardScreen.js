import { useState, useEffect } from "react";
import axios from "axios";
import "./StaffDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faDiagramProject,faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const AdminDashboard = ({history}) => {
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
        const { data} = await axios.get("/api/adminPrivate/adminPrivate", config);
        
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



<div className="StudentRectangle-42">
      <FontAwesomeIcon className="iconsstudentdash" icon={faDiagramProject} />
      <br/><br/>
      <Link to="/adminViewProjects" id="Regs">Available Projects</Link>
      </div>
      
    <div className="StudentRectangle-42">
      <FontAwesomeIcon className="iconsstudentdash" icon={faDiagramProject} />
      <br/><br/>
      <Link to="/markingconfiguations" id="Regs">Marking Configurations</Link>
      </div>


<div className="StaffRectangle-40">
      <FontAwesomeIcon  className = "fonticonsize" icon={faGraduationCap}  /> 
      {/* <i class="fa-solid fa-graduation-cap"></i> */}
      <Link to="/adminAvailableProjectGroups" id="Regs"><button className="buttons" onClick="/staffproject ">View Groups</button></Link>
      </div>

      <div className="StaffRectangle-40">
      <FontAwesomeIcon  className = "fonticonsize" icon={faGraduationCap}  /> 
      {/* <i class="fa-solid fa-graduation-cap"></i> */}
      <Link to="/submissionadmin" id="Regs"><button className="buttons" onClick="/submissionadmin ">Submissions</button></Link>
      </div>




 
<Footer/>

</div>
    </>
  );
};

export default AdminDashboard;