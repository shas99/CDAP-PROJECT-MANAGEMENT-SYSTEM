import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./GroupScreen.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Swal from 'sweetalert2';
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

const GroupScreen = ({history}) => {
    const Swal = require('sweetalert2')
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");


    const [member_1, setMember1] = useState("");
    const [member_2, setMember2] = useState("");
    const [member_3, setMember3] = useState("");
    const [member_4, setMember4] = useState("");
    const [member_5, setMember5] = useState("");
    const [group,setgroup] = useState("")
    const [fetchGroupData, setGroupData] = useState("");
    const [bio,setBio] = useState("")
    const [supervisor, setSupervisor] = useState("");
    const [coSupervisor, setCoSupervisor] = useState("");
    const [marks, setMarks] = useState({})


    useEffect(() => {
        const fetchGroupData = async () => {
            const groupconfig = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
      
            try {
              console.log(groupconfig)
              const { data} = await axios.get("/api/group/group",groupconfig);
              const groupArray = data.data.split("/")
              //console.log("This is groupID"+groupArray[0])
              const group1 = groupArray[0].split(",")
              console.log("THis is group array ")
              setgroup(group1)
              setGroupData(groupArray[0]);
              setBio(groupArray[2])

              //Set data
              setSupervisor();
              setCoSupervisor()

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
  


    

    
    fetchPrivateDate();
    fetchGroupData()
  }, [history]);



  const retreiveMarks = async () => {
    //get request to backend with body
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
  
  
  
      const { data } = await axios.post(
        `/api/MarkingRubrik/getSelectedRubrics/`,
        {
          batchID:"2022-Reg",groupid:"628db5bc8fcfac348c624a34"
        }
      );
  
        // console.log(data.data)
        //render the object from data.data to the screen
  
    setMarks(marks => data.data)
    console.log("Marks55")
    console.log(marks)
    console.log("Marks55")
  }



  
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
        alert("Successfully Submited!")
        try {
          const { data } = await axios.post(
            "/api/group/groupregister",
            { member_1,member_2,member_3,member_4,member_5 },
            config
          );

          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          
          Toast.fire({
            icon: 'success',
            title: 'You Have Successfully Registered Your Group!'
          })
    
    
    
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
        <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="StudentGroups"/>
        </div>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {/* {privateData}   */}
        &nbsp;&nbsp;&nbsp;&nbsp;
        {/* <button onClick={logOutHandler} id="logout">Log Out</button> */}
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
          {fetchGroupData != "" &&
          <div id="card" style={{height:"30rem",marginTop:"-700px"}}>

            <h1 id="caption" style={{color:"#8256D0"}}>Your group members are</h1>
            <button onClick={retreiveMarks}>Get Marks</button>
            {/* display marks */}
            <div>
              {Object.keys(marks).map((key) => {
                return (
                  <div>
                    <p>{key}</p>
                    <p>{marks[key]}</p>
                  </div>
                );
              })}
            </div>
            <hr id="hr"></hr>
            <p id="List">
            <div className="grouplists">{listHandler()}</div><br/>

            <h1 id="caption" style={{color:"#8256D0"}}>Supervisor Details</h1>
            <hr id="hr"></hr>
            {/* <p className="BioText">Supervisor Details</p> */}
            <br/>
            <p>Supervisor : {supervisor} <br/> Co-Supervisor : {coSupervisor}</p>
            </p>

{/* Do we need to add this ? */}

            {/* <p className="BioText">Bio</p> 
            <br/> */}
            {/* <p>{bio}</p> */}
          </div>
          
          }
           {fetchGroupData == "" &&
           <><h1 id="caption" style={{marginTop:"-850px",marginBottom:"-110px"}}>You are not in a group. Fill this form to register to a group</h1></>
           }
          {fetchGroupData == "" &&
          <div className="group-screen">
            
          <div>        
          <form onSubmit={groupregisterHandler} className="groupprofile-screen__form" style={{color:"white",boxShadow:"box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.2),",background:"#161b22",borderRadius:"5px",borderWidth:"2px",borderStyle:"solid",borderColor:"#21262d",padding:"1.5rem",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontWeight:"bold",fontSize:"large"}}>
      <h3 className="login-screen__title">Group registration</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <label>
           Member 1 - Student ID:</label><br/><br/>
          <input type="text" 
          className = "input" id="groupFormInput"
          name="name" 
          onChange={(e) => setMember1(e.target.value)}
          value={member_1} />
          
        
        </div>
        <div className="form-group">
        <label>
           Member 2 - Student ID:</label><br/><br/>
          <input type="text"  id="groupFormInput"
          name="name" 
          className = "input"
          onChange={(e) => setMember2(e.target.value)}
          value={member_2} />
          
        
          </div>
          <div className="form-group">
        <label>
           Member 3 - Student ID:</label><br/><br/>
          <input type="text"  id="groupFormInput"
          name="name" 
          className = "input"
          onChange={(e) => setMember3(e.target.value)}
          value={member_3} />
                  
                  </div>
                  <div className="form-group">
        <label>
           Member 4 - Student ID:</label><br/><br/>
          <input type="text"  id="groupFormInput"
          name="name" 
          className = "input"
          onChange={(e) => setMember4(e.target.value)}
          value={member_4} />
                  
                  </div>
                  <div className="form-group">
        {/* <label>
           Member 5 - Student ID:</label><br/><br/>
           <input type="text"  id="groupFormInput"
           name="name"
           className = "input"
           onChange={(e) => setMember5(e.target.value)}
          value={member_5} /> */}
        
        </div>

      <button type="submit" className="btn btn-primary1" id="groupProfileButton">
          Group Registration
        </button>

        {/* display all the marks, marks is an object */}
        {/* {Object.keys(marks).map((key) => (
          <div>
            <p>{key}</p>
            <p>{marks[key]}</p>
          </div>
        ))} */}

{/* <ul>
      {Object.entries(marks).map(([key, value]) => (
        <li key={key}>
          {key}: {value}
          {console.log(key)}
        </li>

      ))}
    </ul> */}


{/* retreiveMarks triggers when button clicked */}


      </form></div>
          </div>
      }
          <Footer/>
        </div>
        </>
      );
    };
    
    export default GroupScreen;