/*import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewAvailableProjects.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import React, { Component } from 'react'


export default class ViewAvailableProjects extends Component {

  constructor(props){

    super(props);
    
    this.state= {
    
    availableprojects:[],
    
    
    };
    
    }
    componentDidMount(){

      this.retrieveAvailableProjects();
      
      
      }
      retrieveAvailableProjects(){

        axios.get('/api/AvailableProject/availableProjects').then((res)=> {
        
        if(res.data.success){
        
        this.setState({
        
        availableprojects: res.data.AvailableProject
        
        });
        
        }
        
        });
        
        }
  render() {
    const {
      projectName,
      projectDescription,
      projectBiddingCount
    } = this.retrieveAvailableProjects;

    return (
  
    <div>
      <h4>{projectName}</h4>

    </div>
    );
  }
}*/

import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewAvailableProjects.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewAvailableProjects = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    const [projects,setprojects] = useState("")
    
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
  

      const fetchprojects = async () => {
        const projectsconfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        try {
          const { data} = await axios.get("/api/AvailableProject/availableprojects",projectsconfig);
          const projArray = data.data.split("/")
          const projectsArray = projArray[1].split(",")
          // console.log(suggArray)
          projectsArray.map((a) => console.log(a))
          setprojects(projectsArray);
        } catch (error) {
          console.log(error)
          // setError("Oops couldn't retreive suggestions");//fix this
        }
      };
    //   fetchGroupData()
      fetchprojects()
      fetchPrivateDate();
    }, [history]);
  
    //Logout feature
    const logOutHandler=()=>{
      localStorage.removeItem("authToken");
      history.push("/login");
  
    };

    const listHandler=()=>{
      try{

        const lists = projects.map((n)=>
        <li>{n}</li>)
        return(
          <ul>{lists}</ul>
        )
      }catch(e){
        console.error(e)
      }
      // <ul>
      // {suggestions.map((m) => <li>{m}</li>)}
      // </ul>
  
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
          <div id="card">

          <p style={{color:"#FFF"}}>
          
          
          <h1 id="caption">All projects</h1>
          <hr id="hr"></hr>
          <p id="List">
          {listHandler()}
          </p>
          </p>
          </div>
        <Footer/>
        </div>
        </>
      );
    };
    
    export default ViewAvailableProjects;
