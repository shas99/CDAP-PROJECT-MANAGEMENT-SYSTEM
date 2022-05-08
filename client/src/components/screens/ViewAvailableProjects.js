import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewAvailableProjects.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const ViewAvailableProjects = ({history}) =>{
  const [fetchProjectsData, setProjectsData] = useState("")
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
        const { data} = await axios.get("/api/private", config);
        
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/AvailableProject/availableProjects",projectsconfig);
        setProjectsData(data.data);
      }catch(error){

        
      }
    }
    fetchProjectsData()
    fetchPrivateDate()
  }, [history])

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    <div className="view-availableprojects">
      <Header/>
  <br/>
      <h1 id="caption">All projects</h1>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="availableprojects-topic"><b>Project 1 </b></h4> 
        <hr id="hr1"></hr>
        <p className="availableprojectscontent"> {fetchProjectsData}</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="availableprojects-topic"><b>Project 2 </b></h4> 
        <hr id="hr1"></hr>
        <p className="availableprojectscontent"> Not Available</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="availableprojects-topic"><b>Project 3 </b></h4> 
        <hr id="hr1"></hr>
        <p className="availableprojectscontent"> Not Available</p> 
      </div>
      </div>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="availableprojects-topic"><b>Project 4 </b></h4> 
        <hr id="hr1"></hr>
        <p className="availableprojectscontent">Not Available</p> 
      </div>
     
      </div>


      <br/>
      <Footer/>
      
</div>
    
    
    
    
  )
}
export default ViewAvailableProjects;