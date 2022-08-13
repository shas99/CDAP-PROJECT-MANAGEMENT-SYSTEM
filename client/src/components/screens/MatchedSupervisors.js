import { useState, useEffect } from "react";
// import React from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { render } from "@testing-library/react";

const MatchedSupervisors = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    const [suggestions,setsuggestions] = useState([]);
    const [SupervisorName, setSupervisorName] = useState([]);
    const [SupervisorBatch, setSupervisorBatch] = useState([]);
    const [batchID, setBatchID] = useState("");
    const [batchType, setBatchType] = useState("");
    const [Projects, setProjects] = useState([]);
    const [ProjectID, setProjectID] = useState("");
    const [ProjectName, setProjectName] = useState("");
    const [ProjectDescription, setProjectDescription] = useState("");
    const [SelectedSupervisors, setSelectedSupervisors] = useState([]);
    const [SelectedProject, setSelectedProject] = useState("");
    // const [visible, setVisible] = React.useState(false);

    
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


      const fetchAvailableSupervisors = async () => {
        const supconfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };


        const ab = localStorage.getItem("authToken")
        try {
          const {data} =  await axios.get("/api/group/showSupervisors",{params: {ab}}, supconfig); //need to pass the batch id as a parameter to backend
          const array = Object.entries(data.data)

          setSupervisorName(array);
          //console.log(array)
          
        }
        catch(error){}
      };


      const fetchbatchID = async () =>{
        const submissionsconfig = {
          headers: {
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("authToken")}`,
          },
        }
  
        try{
          const{data} = await axios.get("/api/STDAvailableSubmissions/batchID",submissionsconfig);
          //const array = Object.entries(data.data)
          setBatchID(data.data);
          const batch = data.data;
          const b = batch.split("-");
          //console.log(b+"batch")
          if(b[1]=="Reg" || b[1]=="reg"){
            setBatchType(6);
            
          }
          else if(b[1]=="June" || b[1]=="june"){
            setBatchType(2);
          };
           
          
        }catch(error){
          
        }
      
      }

      const fetchAvailableProjects = async () => {
        const projectConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };


        //const ab = localStorage.getItem("authToken")
        try {
          const {data} =  await axios.get("/api/AvailableProject/availableProjects", projectConfig); //need to pass the batch id as a parameter to backend
          const array = Object.entries(data.data)

          setProjects(array);
          console.log(array)
          
        }
        catch(error){}
      };


     
      // const fetchsuggestions = async () => {
      //   const suggestconfig = {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //     },
      //   };
  
      //   try {
      //     const { data} = await axios.get("/api/group/group",suggestconfig);
      //     const sugArray = data.data.split("/")
      //     const suggArray = sugArray[1].split(",")
      //     console.log(suggArray)
      //     // console.log(suggArray)
      //     suggArray.map((a) => console.log(a))
      //     setsuggestions(suggArray);
      //   } catch (error) {
      //     console.log(error)
      //     // setError("Oops couldn't retreive suggestions");//fix this
      //   }
      // };
    //   fetchGroupData()
      // fetchsuggestions()

    // const fetchProjectDescription = async ()=>{
    //     const PID = ProjectID;
    //     console.log(PID)
    //     const projectConfigto = {
    //       headers: {
    //         "Content-Type": "application/json",
    //         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //       },
    //     };
     
    //     try{
    //       const{data} = await axios.get("/api/AvailableProject/availableProjects/${PID}",projectConfigto);
    //       const description = data.projectDescription
    //       console.log(description)
    //       setProjectDescription(description)

         
    //     }catch(error){
          
          
    //     }
        
  
    // }

    // const fetchhandleSubmit  = async () => {
    //   const subconfig = {
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
    //     },
    //   };


    //   const ab = localStorage.getItem("authToken")
    //   try {
    //     const {data} =  await axios.post("/api/group/showSupervisors",{params: {ab}}, subconfig); //need to pass the batch id as a parameter to backend
    //     const array = Object.entries(data.data)

    //     setSupervisorName(array);
    //     //console.log(array)
        
    //   }
    //   catch(error){}
    // };



       fetchbatchID()
      fetchPrivateDate()
      fetchAvailableSupervisors()
      fetchAvailableProjects()
      // fetchProjectDescription()
      // fetchSupervisorBiddingDetails()
     
    }, [history]);

    // const updateSupervisors = e =>{
    //     let newarr = [...SelectedSupervisors];
    //     newarr.push(e.target.value)
    //     setSelectedSupervisors(newarr);
    // } 
    
    
    // Submit form
      const SubmitBidding = async (e) => {
        e.preventDefault();
   
       const pconfig = {
         header: {
           "Content-Type": "application/json",
         },
       };
      
       alert("Successfully Submited!")
       try {
         const { data } = await axios.post(
           "http://localhost:5000/api/",
           { SelectedProject,SelectedSupervisors },
           pconfig
           
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

//https://stackoverflow.com/questions/71679422/checkbox-check-and-uncheck-to-remove-values-in-react-js

    const updateSupervisors = (e) => { 
      if (e.target.checked) { setSelectedSupervisors((oldArray) => [...oldArray, e.target.value]); } 
      else { removesupervisor(e); console.log(SelectedSupervisors) } 
  }
  const removesupervisor = (e) => { setSelectedSupervisors([...SelectedSupervisors.filter((supervisor) =>
     supervisor !== e.target.value)]) }
  
    //Logout feature
    // const logOutHandler=()=>{
    //   localStorage.removeItem("authToken");
    //   history.push("/login");
  
    // };

    // const listHandler=()=>{
    //   try{

    //     const lists = suggestions.map((n)=>
    //     <li>{n}</li>)
    //     return(
    //       <ul>{lists}</ul>
    //     )
    //   }catch(e){
    //     console.error(e)
    //   }
    //   // <ul>
    //   // {suggestions.map((m) => <li>{m}</li>)}
    //   // </ul>
  
    // };

    

  
    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back">
        <Header/>
        {/* <p style={{color:"#FFF",textAlign:"right"}}> */}
        {/* {privateData}   */}
        {/* &nbsp;&nbsp;&nbsp;&nbsp; */}
       
        {/* <button onClick={logOutHandler} id="logout">Log Out</button> */}
          {/* </p> */}
          {/* <div id="card"> */}

          {/* <p style={{color:"#FFF"}}> */}
          
          
          {/* <h1 id="caption">Your Supervisor suggestions are</h1>
          <hr id="hr"></hr>
          <p id="List">
          {listHandler()}
          </p> */}



          {/* </p> */}
          {/* </div> */}



          {/* US-01 Pasindu Vinod*/}
          
          <div style={{color:"white",width:"100%"}}>
            <p className="text-center text-2xl font-semibold ml-10 mt-5">Place Bids for Supervisors {batchID}</p>
            <br/>
            <div id="Supervisors" style={{display:"in"}}>
              <div>
                <caption className="text-center mt-5">
                  Select supervisor
                </caption>
              <form onSubmit={SubmitBidding}>
              <table id = "stable">
                
                 
                  {SupervisorName.map (supervisor => 
                  <tr>
                    <td><input type="checkbox" value={supervisor[1][0]} name="supervisor" onChange={(e) => {updateSupervisors(e)}}></input></td>
                    <td>{supervisor[1][1]}</td>
                    <td>{supervisor[1][2]}/{batchType}</td>
                  </tr>
                  )}
                
            </table>
            {/* {console.log("Selected supervisors"+SelectedSupervisors)} */}
           

           
           
              <h3 className="ml-15 mt-5">
              Select Project
              </h3>
              <table style={{width:"700px"}}>
              {/* <select id = "Project" name="Project" style={{color:"black"}} onChange={e => {setProjectID(e.target.value)}}> */}
                {/* <option>Select a Project</option> */}

                <tr>
                  <th style={{width:"8rem"}}>Project Category </th>
                  <th style={{width:"rem"}}>Project Name</th>
                  <th style={{width:"6rem"}}>Project Description</th>
                  <th style={{width:"6rem"}}></th>

                </tr>
                
                {/* {Projects.map (project => 
                <tr>
                  <td>{project[1].projectType}</td>
                  <td>{project[1].projectName}</td>
                  <td>{project[1].projectDescription}</td>
                  <td>
                    
                    <input type="radio" value={project[1]._id} name="project"></input>

                  </td>
                </tr>
                  
                )} */}

                {Projects.map (project =>{  
                  if(project[1].projectStatus == false){
                    return(
                    <tr>
                      <td>{project[1].projectType}</td>
                      <td>{project[1].projectName}</td>
                      <td>{project[1].projectDescription}</td>
                      <td>
                        <input type="radio" name="project" value={project[1]._id} onChange={(e) => setSelectedProject(e.target.value)}/> 
                      </td>
                    </tr>
                    )
                  }else{
                    return(
                    <tr>
                      <td>{project[1].projectType}</td>
                      <td>{project[1].projectName}</td>
                      <td>{project[1].projectDescription}</td>
                      <td>
                        Taken 
                      </td>
                    </tr>
                    )
                  }                          
                               
                  })}
                


              {/* </select>  */}
              </table>

              {/* <input type="submit">Place Bid</input> */}
              <button type="submit">Place Bid</button>

              {/* <button onClick={e => {}}>Find Project</button> */}

              {/* <button onClick={() => setVisible(true)}>Show</button>
      {visible && <div><select></select></div>} */}


              {/* <select id = "Project" name="Project" style={{color:"black"}} onChange={e => {setProjectDescription(e.target.value)}}>
                
                {Projects.map (projecta => 
                   <option>{projecta[1].projectName}</option>
                )}
              </select>  */}


              
            </form>
            </div>

            </div>
          </div>


        <Footer/>
        </div>
        </>
      );
    };
    
    export default MatchedSupervisors;
