import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./StudentTopicRegistrationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const TopicRegistration = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    // const [suggestions,setsuggestions] = useState("")
    const [groupleader, setgroupleader] = useState("");
    const [groupID, setgroupID] = useState("");
    const [topic_1, settopic_1] = useState("");
    const [topic_2, settopic_2] = useState("");
    const [topic_3, settopic_3] = useState("");
    const [topic_4, settopic_4] = useState("");
    const [topic_5, settopic_5] = useState("");
    const [group,setgroup] = useState("")
    const [fetchGroupData, setGroupData] = useState("");
    useEffect(() => {
        const fetchGroupData = async () => {
            const groupconfig = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
      
            try {
              const { data} = await axios.get("/api/auth/group",groupconfig);
              const groupArray = data.data.split("/")
              console.log(groupArray[0])
              const group1 = groupArray[0].split(",")
              setgroup(group1)
              setGroupData(groupArray[0]);
            } catch (error) {
      
              // setError("Oops couldn't retreive group data");//fix this
            }
          };
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
  


    //   fetchGroupData()

      fetchPrivateDate();
      fetchGroupData()
    }, [history]);
  
    //Logout feature
    const logOutHandler=()=>{
      localStorage.removeItem("authToken");
      history.push("/login");
  
    };
    const groupregisterHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
    
        try {
          const { data } = await axios.post(
            "/api/group/topicregister",
            { groupleader,groupID,topic_1,topic_2,topic_3,topic_4,topic_5 },
            config
          );
    
    
    
          history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
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
          
          </p>
        
           <h1 id="caption">Student Topic Registration</h1>
          
          
          <div className="group-screen">
            
          <div>        
          <form onSubmit={groupregisterHandler} className="group-screen__form">
      <h3 className="login-screen__title">Topic Assessment Form</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <label>
           Group Leader Name:</label>
          <input type="text" 
          className = "input"
          name="name" 
          onChange={(e) => setgroupleader(e.target.value)}
          value={groupleader} />
          
        
        </div>
        <div className="form-group">
        <label>
           Group ID:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setgroupID(e.target.value)}
          value={groupID} />
          
        
          </div>
          <div className="form-group">
        <label>
           Project Topic 1:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => settopic_1(e.target.value)}
          value={topic_1} />
                  
                  </div>
                  <div className="form-group">
        <label>
           Project Topic 2:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => settopic_2(e.target.value)}
          value={topic_2} />
                  
                  </div>
                  <div className="form-group">
        <label>
           Project Topic 3:</label>
          <input type="text" 
          name="name"
          className = "input"
          onChange={(e) => settopic_3(e.target.value)}
          value={topic_3} />
        
        </div>

        <div className="form-group">
        <label>
           Project Topic 4:</label>
          <input type="text" 
          name="name"
          className = "input"
          onChange={(e) => settopic_4(e.target.value)}
          value={topic_4} />
        
        </div>

        <div className="form-group">
        <label>
           Project Topic 5:</label>
          <input type="text" 
          name="name"
          className = "input"
          onChange={(e) => settopic_5(e.target.value)}
          value={topic_5} />
        
        </div>

        



      <button type="submit" className="btn btn-primary1" id="Log1Button">
          Submit!
        </button>

        
      </form></div>
          </div>
      
          <Footer/>
        </div>
        </>
      );
    };
    
    export default TopicRegistration;