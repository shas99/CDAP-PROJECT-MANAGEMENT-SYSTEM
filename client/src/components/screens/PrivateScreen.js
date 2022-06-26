import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCommentDots, faFileArrowUp } from '@fortawesome/free-solid-svg-icons';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons';
import { faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';
import { faRegistered } from '@fortawesome/free-solid-svg-icons';
import { faDiagramProject } from '@fortawesome/free-solid-svg-icons';
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
    <div className="row1">
      <div className="StudentRectangle-36" >
      <FontAwesomeIcon className="iconsstudentdash" icon={faCommentDots} />

      

      {/* <Link to="/viewfeedback" id="Regs"><button className="buttons" onClick="/viewfeedback ">My Feedbacks</button></Link> */}
      <br></br><br></br>

      <Link to="/viewfeedback" id="Regs">My Feedbacks</Link>
        </div>

      <div className="StudentRectangle-37">
      <FontAwesomeIcon className="iconsstudentdash" icon={faFile} />
        {/* <Link to="/studenttopicinterestingform" id="Regs"><button className="buttons" onClick="/studenttopicinterestingform ">Student Topic Interestings</button></Link> */}
        <br></br>
        <Link to="/studenttopicinterestingform" id="Regs">Student Topic Interestings</Link>
        </div>

      <div className="StudentRectangle-38">
      <FontAwesomeIcon className="iconsstudentdash" icon={faGraduationCap} />
      <br/><br/>
      <Link to="/viewmarks" id="Regs">My Grades</Link>
      </div>

      <div className="StudentRectangle-39">
      <FontAwesomeIcon className="iconsstudentdash" icon={faPeopleGroup} />
      <br/><br/>
      <Link to="/groupscreen" id="Regs">My Group</Link>
      </div>

      <div className="StudentRectangle-40">
      <FontAwesomeIcon className="iconsstudentdash" icon={faHandshake} />
      <br/><br/>
      <Link to="/matchedsupervisors" id="Regs">Matched Supervisors</Link>
      </div>
        </div>

      <div className="row2">
        <div className="StudentRectangle-41">
        <FontAwesomeIcon className="iconsstudentdash" icon={faRegistered} />
      <br/><br/>
      <Link to="/topicregistration" id="Regs">Register Topic</Link>
      </div>

      <div className="StudentRectangle-42">
      <FontAwesomeIcon className="iconsstudentdash" icon={faDiagramProject} />
      <br/><br/>
      <Link to="/viewavailableprojects" id="Regs">Available Projects</Link>
      </div>

      <div className="StudentRectangle-43">
      <FontAwesomeIcon className="iconsstudentdash" icon={faFileArrowUp} />
      <br/><br/>
      <Link to="/submissionmilestone" id="Regs">Submit File</Link>
      </div>

      <div className="StudentRectangle-43">
<br/><br/><br/><br/><br/><br/>
<a target="_blank" href="https://cdap-app-365.herokuapp.com/" id="Regs">Schedule Meeting</a>

</div>

      </div>


        {/* <Link to="/viewmarks" id="Regs"><button className="buttons" onClick="/viewmarks ">My Grades</button></Link>
        <br/><br/> */}
      {/* <Link to="groupscreen" id="GroupConfig"><button className="buttons" onClick="groupscreen">My Group</button></Link> <br/><br/> */}
      {/* <Link to="matchedsupervisors" id="MatchedS"><button className="buttons" onClick="matchedsupervisors">Matched Supervisors</button></Link>
      <br/><br/>   */}
        {/* <Link to="/topicregistration" id="Regs"><button className="buttons" onClick="/topicregistration ">Register Topic </button></Link>
      <br/><br/> */}
        {/* <Link to="/viewavailableprojects" id="Regs"><button className="buttons" onClick="/viewavailableprojects ">Available Projects</button></Link>
        <br/><br/><Link to="/submissionmilestone" id="Regs"><button className="buttons" onClick="/submit ">Submit File</button></Link> */}
    <Footer/>

     </div>
    </>
  );
};

export default PrivateScreen;