import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
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
      
    <div className="Rectangle-43">
    <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      <Link to= "#" id="Regs"><button className="buttons" onClick="#">Add Feedback</button></Link>
      </div>
        <br/>
        <Link to="#" id="Regs"><button className="buttons" onClick="#">Add Marks</button></Link>
        
       
          <br/>
          <Link to="/staffreport" id="Regs"><button className="buttons" onClick="/staffreport ">View Report</button></Link>

          <Link to="/staffrecommendationform" id="Regs"><button className="buttons" onClick="/staffrecommendationform ">Staff</button></Link>
      <div className="Rectangle-43">
        <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
          <Link to="/staffproject" id="Regs"><button className="buttons" onClick="/staffproject ">View projects</button></Link>
        
          </div>{/* <img src="img/fa-solid_user-cog.png"
                  srcset="img/group-114@2x.png 2x,
                  img/group-114@3x.png 3x"
                  class="Group-114"/> */}

       
        

                  
  
    <Footer/>

     </div>
    </>
  );
};

export default StaffPrivateScreen;