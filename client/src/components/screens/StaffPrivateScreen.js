import { useState, useEffect } from "react";
import axios from "axios";
import "./StaffPrivateScreen.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



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
      
    <div classname="row">
      <div className="Rectangle-43">
      <Link to= "#" id="Regs"><button className="buttons" onClick="#">Add Feedback</button></Link>
      </div>

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
    </div>
        

                  
  
    <Footer/>

     </div>
    </>
  );
};

export default StaffPrivateScreen;