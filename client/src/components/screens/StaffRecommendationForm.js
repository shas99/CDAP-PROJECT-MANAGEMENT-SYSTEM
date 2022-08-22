import { useState, useEffect } from "react";
import axios from "axios";
// import InputRange from 'react-input-range';
// import { Link } from "react-router-dom";
import "./StaffRecommendationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideNavigationBar from "../StaffSideNavigationBar/StaffSideNavigationBar";

const StaffRcommendationInputs = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    const [StaffID, setStaffID] = useState("");
    const [Q1, setQ1] = useState("5");
    const [Q2, setQ2] = useState("5");
    const [Q3, setQ3] = useState("5");
    const [Q4, setQ4] = useState("5");
    const [Q5, setQ5] = useState("5");
    const [Q6, setQ6] = useState("5");
    const [Q7, setQ7] = useState("5");

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
  
    
    const StaffRecommendationFormHandler = async (e) => {
         e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
       
        alert("Successfully Submited!")
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/staff/StaffRecommendationForm",
            { StaffID,Q1,Q2,Q3,Q4,Q5,Q6,Q7 },
            config
            
          );
          console.log(data)
            alert("Submitted!")

          history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
            console.log(error)
          }, 5000);
        }
        
      };

     

      
  
    return error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back" >
        <Header/>
        <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="StaffTopicInterestings"/>
        </div>
        {/* <p style={{color:"#FFF",textAlign:"right"}}> */}
        {/* {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp; */}
       
        {/* <button onClick={logOutHandler} id="logout">Log Out</button> */}
          {/* </p>
           */}
          {/* <p style={{color:"#FFF"}}>
          <br/><br/>
          </p> */}

<p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
           <h1 id="caption" style={{marginTop:"-675px"}}>Topic Interestings</h1> 
          
          <div className="group-screen" style={{height:"80rem"}}>
            
          <div>        
          <form onSubmit={StaffRecommendationFormHandler} className="group-screen__form" style={{paddingTop:"2rem",fontsize:"30px",maxHeight:"70rem",marginTop:"-400px",width:"1000px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", height:"800px"}}>
      <h3 className="login-screen__title" style={{paddingTop:"1rem",fontSize:"1.4rem"}}>Topic Interestings Form</h3>
      {error && <span className="error-message">{error}</span>}
      
      <div className="form-group" style={{paddingTop:"1rem"}}>
        <label className="TopicNames" style={{paddingTop:"0.5rem",width:"70%",fontWeight:"bold", margin:"0 auto", fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif", fontSize:"large"}}>Staff ID:</label> 
        <br/><br/>
        
          <input type="text" 
          className = "input" style={{height:"50px",width:"500px",color:"black", margin:"0 auto",color:"white"}}
          name="name" 
          onChange={(e) => setStaffID(e.target.value)}
          value={StaffID} />
        
        </div>
        <br/>
        <p style={{textAlign:"left",marginLeft:"5.5rem",fontSize:"1.3rem"}}>Show us your interesting</p><br/>
        <div className="form-group">
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",fontWeight:"normal"}}>1. Mobile Application Development &nbsp;&nbsp;&nbsp;&nbsp;{Q1}/10</label>
          <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          value={Q1}
          onChange={(e) => setQ1(e.target.value)}
           />
        </div>
        <br/>

        <div className="form-group" style={{marginTop:"-1rem"}}>
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",width:"30rem",fontWeight:"normal"}}>2. Web Application Development&nbsp;&nbsp;&nbsp;&nbsp;{Q2}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1} 
          value={Q2}
          onChange={(e) => setQ2(e.target.value)}
          />
        </div>
        <br/>

        <div className="form-group" style={{marginTop:"-1rem"}}>
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",width:"30rem",fontWeight:"normal"}}>3. Machine Learning&nbsp;&nbsp;&nbsp;&nbsp;{Q3}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ3(e.target.value)}
          value={Q3} />
        </div>
        <br/>

        <div className="form-group" style={{marginTop:"-1rem"}}>
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",width:"30rem",fontWeight:"normal"}}>4. Artificial Intelligence&nbsp;&nbsp;&nbsp;&nbsp;{Q4}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ4(e.target.value)}
          value={Q4} />
        </div>
        <br/>

        <div className="form-group" style={{marginTop:"-1rem"}}>
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",width:"30rem",fontWeight:"normal"}}>5. Robotics&nbsp;&nbsp;&nbsp;&nbsp;{Q5}/10</label><br/>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ5(e.target.value)}
          value={Q5} />
        </div>
        <br/>

        <div className="form-group" style={{marginTop:"-1rem"}}>
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",width:"30rem",fontWeight:"normal"}}>6. Cloud Computing&nbsp;&nbsp;&nbsp;&nbsp;{Q6}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ6(e.target.value)}
          value={Q6} />
        </div>
        <br/>

        <div className="form-group" style={{marginTop:"-1rem"}}>
        <label className="TopicNames" style={{textAlign:"left",fontSize:"1rem",width:"30rem",fontWeight:"normal"}}>7. IOT&nbsp;&nbsp;&nbsp;&nbsp;{Q7}/10</label><br/>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ7(e.target.value)}
          value={Q7} />
        </div>
        <br/>  


      <button type="submit" className="btn btn-primary1" id="Log1Button" style={{marginTop:"1rem",textAlign:"center"}}>
          Submit
        </button>

        
      </form></div>
          </div>
      
          {/* <Footer/> */}
        </div>
        </>
      );
    };
    
    export default StaffRcommendationInputs;