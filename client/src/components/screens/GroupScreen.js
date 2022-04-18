import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./GroupScreen.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const GroupScreen = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    const [suggestions,setsuggestions] = useState("")
    const [member_1, setMember1] = useState("");
    const [member_2, setMember2] = useState("");
    const [member_3, setMember3] = useState("");
    const [member_4, setMember4] = useState("");
    const [member_5, setMember5] = useState("");
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
            "/api/auth//groupregister",
            { member_1,member_2,member_3,member_4,member_5 },
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

      const listHandler=()=>{
        try{
    
          const lists = group.map((n)=>
          <li>{n}</li>)
          return(
            <ul>{lists}</ul>
          )
        }catch(e){
          console.error(e)
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
          {fetchGroupData != "" &&
          <div>

            <h1 id="caption">Your group members are</h1>
            
            {listHandler()}
          </div>
          
          }
           {fetchGroupData == "" &&
           <><h1>You are not in a group. Fill this form to register to a group</h1></>
           }
          {fetchGroupData == "" &&
          <div className="group-screen">
            
          <div>
          
          <form onSubmit={groupregisterHandler} className="group-screen__form">
      <h3 className="login-screen__title">Group registration</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <label>
           Member 1:</label>
          <input type="text" 
          name="name" 
          onChange={(e) => setMember1(e.target.value)}
          value={member_1} />
          
        
        </div>
        <div className="form-group">
        <label>
           Member 2:</label>
          <input type="text" 
          name="name" 
          onChange={(e) => setMember2(e.target.value)}
          value={member_2} />
          
        
          </div>
          <div className="form-group">
        <label>
           Member 3:</label>
          <input type="text" 
          name="name" 
          onChange={(e) => setMember3(e.target.value)}
          value={member_3} />
                  
                  </div>
                  <div className="form-group">
        <label>
           Member 4:</label>
          <input type="text" 
          name="name" 
          onChange={(e) => setMember4(e.target.value)}
          value={member_4} />
                  
                  </div>
                  <div className="form-group">
        <label>
           Member 5:</label>
          <input type="text" 
          name="name" 
          onChange={(e) => setMember5(e.target.value)}
          value={member_5} />
        
        </div>

      <button type="submit" className="btn btn-primary1" id="Log1Button">
          Group Registration
        </button>

        
      </form></div>
          </div>
      }
          <Footer/>
        </div>
        </>
      );
    };
    
    export default GroupScreen;