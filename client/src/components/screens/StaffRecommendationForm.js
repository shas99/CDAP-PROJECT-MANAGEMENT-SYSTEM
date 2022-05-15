import { useState, useEffect } from "react";
import axios from "axios";
import InputRange from 'react-input-range';
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./StaffRecommendationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
        <div id="back">
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
           <h1 id="caption">Topic Interestings</h1>
           <br/>
           
      
          
          <div className="group-screen">
            
          <div>        
          <form onSubmit={StaffRecommendationFormHandler} className="group-screen__form" style={{paddingTop:"2rem",maxHeight:"65rem"}}>
      <h3 className="login-screen__title" style={{paddingTop:"1rem"}}>Topic Interesting Form</h3>
      {error && <span className="error-message">{error}</span>}
      
      <div className="form-group" style={{paddingTop:"1rem"}}>
        <label className="TopicNames" style={{paddingTop:"0.5rem",width:"70%"}}>Staff ID:</label>
          <input type="text" 
          className = "input" style={{height:"0.5rem"}}
          name="name" 
          onChange={(e) => setStaffID(e.target.value)}
          value={StaffID} />
        
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">1. Mobile Application Development &nbsp;&nbsp;&nbsp;&nbsp;{Q1}/10</label>
          <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          value={Q1}
          onChange={(e) => setQ1(e.target.value)}
           />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">2. Web Application Development&nbsp;&nbsp;&nbsp;&nbsp;{Q2}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1} 
          value={Q2}
          onChange={(e) => setQ2(e.target.value)}
          />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">3. Machine Learning&nbsp;&nbsp;&nbsp;&nbsp;{Q3}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ3(e.target.value)}
          value={Q3} />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">4. Artificial Intelligence&nbsp;&nbsp;&nbsp;&nbsp;{Q4}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ4(e.target.value)}
          value={Q4} />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">5. Robotics&nbsp;&nbsp;&nbsp;&nbsp;{Q5}/10</label><br/>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ5(e.target.value)}
          value={Q5} />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">6. Cloud Computing&nbsp;&nbsp;&nbsp;&nbsp;{Q6}/10</label>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ6(e.target.value)}
          value={Q6} />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">7. IOT&nbsp;&nbsp;&nbsp;&nbsp;{Q7}/10</label><br/>
        <input type="range" style={{width:"80%"}}
          max="10"
          min="1"
          step={1}
          onChange={(e) => setQ7(e.target.value)}
          value={Q7} />
        </div>
        <br/>  


      <button type="submit" className="btn btn-primary1" id="Log1Button">
          Submit
        </button>

        
      </form></div>
          </div>
      
          <Footer/>
        </div>
        </>
      );
    };
    
    export default StaffRcommendationInputs;