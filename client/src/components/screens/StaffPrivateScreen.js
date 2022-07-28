import { useState, useEffect } from "react";
import axios from "axios";
import "./StaffPrivateScreen.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faFileCircleCheck,faComment,faFile,faListCheck,faGraduationCap } from '@fortawesome/free-solid-svg-icons'





const StaffPrivateScreen = ({history}) => {
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
        const { data} = await axios.get("/api/staffPrivate/staffPrivate", config);
        
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
    <h1 id="caption">Welcome to Staff dashboard {privateData}</h1>
    <p style={{color:"#FFF",textAlign:"right"}}>
 
    <button onClick={logOutHandler} id="logout">Log Out</button>
      </p>
      
    {/* <div classname="row1">
      <div className="StaffRectangle-36">
      <Link to= "#" id="Regs"><button className="buttons" onClick="#">Add Feedback</button></Link>
      
      <div className="Rectangle-43">
      <Link to="#" id="Regs"><button className="buttons" onClick="#">Add Marks</button></Link>
      </div>
      
      <div className="Rectangle-43">
      <Link to="/staffreport" id="Regs"><button className="buttons" onClick="/staffreport ">View Report</button></Link>
      </div>
         
      <div className="Rectangle-43">
      <Link to="/staffrecommendationform" id="Regs"><button className="buttons" onClick="/staffrecommendationform ">Staff</button></Link>
      </div>
      <div className="Rectangle-43">
      <Link to="/staffproject" id="Regs"><button className="buttons" onClick="/staffproject ">View projects</button></Link>
      </div>
      <div className="Rectangle-43">
      <Link to="/staffproject" id="Regs"><button className="buttons" onClick="/staffproject ">View projects</button></Link>
      </div>
    </div> */}
    <div className="row1">
      <div className="StaffRectangle-36" >
      {/* <Link to="/viewfeedback" id="Regs"><button className="buttons" onClick="/viewfeedback ">My Feedbacks</button></Link> */}
      <br></br>
      <FontAwesomeIcon className = "fonticonsize" icon={faComment}  /> 

      {/* <i class="fa-solid fa-file-circle-check"></i> */}
      {/* <i class="fa-solid fa-file"></i> */}

      <Link to= "#" id="Regs"><button className="buttons" onClick="#">Add Feedback</button></Link>
        </div>

      <div className="StaffRectangle-37">
        {/* <Link to="/studenttopicinterestingform" id="Regs"><button className="buttons" onClick="/studenttopicinterestingform ">Student Topic Interestings</button></Link> */}
        
        <FontAwesomeIcon  className = "fonticonsize" icon={faFileCircleCheck} /> 
        {/* <i class="fa-solid fa-comment"></i> */}
        {/* <Link to="#" id="Regs"><button className="buttons" onClick="#">Add Marks</button></Link> */}
        <Link to="/markdashboard" id="Regs"><button className="buttons">Add marks</button></Link>
        </div>

      <div className="StaffRectangle-38">
      
      <FontAwesomeIcon  className = "fonticonsize" icon={faFile} /> 
      <Link to="/staffreport" id="Regs"><button className="buttons" onClick="/staffreport ">View Report</button></Link>
      </div>

      <div className="StaffRectangle-39">
      
      <FontAwesomeIcon  className = "fonticonsize" icon={faListCheck} /> 
      {/* <i class="fa-solid fa-list-check"></i> */}
      <Link to="/staffrecommendationform" id="Regs"><button className="buttons" onClick="/staffrecommendationform ">Staff</button></Link>
      </div>

      <div className="StaffRectangle-40">
      
      <FontAwesomeIcon  className = "fonticonsize" icon={faGraduationCap}  /> 
      {/* <i class="fa-solid fa-graduation-cap"></i> */}
      <Link to="/staffproject" id="Regs"><button className="buttons" onClick="/staffproject ">View Groups</button></Link>
      </div>
<<<<<<< HEAD

    

     

=======
      <br/>
      <div className="StaffRectangle-47">
      
      <FontAwesomeIcon  className = "fonticonsize" icon={faGraduationCap}  /> 
      {/* <i class="fa-solid fa-graduation-cap"></i> */}
      <Link to="/staffPlaceAnnouncement" id="Regs"><button className="buttons" onClick="/staffproject ">Place Announcement</button></Link>
      </div>
>>>>>>> 4c7471e6ece21d06a805a05a5e5824c68cac1838
      

      
        

      {/* <div className="row2">
        <div className="StudentRectangle-41">
      <br/><br/><br/><br/><br/><br/>
      <Link to="/topicregistration" id="Regs">Register Topic</Link>
      </div>
      <div className="StudentRectangle-42">
      <br/><br/><br/><br/><br/><br/>
      <Link to="/viewavailableprojects" id="Regs">Available Projects</Link>
      </div>
      <div className="StudentRectangle-43">
      <br/><br/><br/><br/><br/><br/>
      <Link to="/submissionmilestone" id="Regs">Submit File</Link>
      </div>
      </div>
 */}

        

                  
  
    <Footer/>

     </div>
     </div>
    </>
  );
};

export default StaffPrivateScreen;