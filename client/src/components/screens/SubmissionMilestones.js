import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./SubmissionMilestones.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const SubmissionMilestones = ({history}) =>{
  const [fetchMarksData, setMarksData] = useState("")
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

    const fetchMarksData = async () =>{
      const marksconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/student/viewmarks",marksconfig);
        setMarksData(data.data);
      }catch(error){

        
      }
    }
    fetchMarksData()
    fetchPrivateDate()
  }, [history])

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    <div className="view-feedback">
      <Header/>
  <br/>
      <h1 id="caption">Milestones  </h1>
      <br/><br/>
      <div className="card">
      <div className="container">
      <h4 id="marks-topic"><b>Milestone 1 - SRS Report </b></h4> <br/>
        <p>A software requirements specification (SRS) is a description of a software system to be developed. It is modeled after business requirements specification (CONOPS). The software requirements specification lays out functional and non-functional requirements, and it may include a set of use cases that describe user interactions that the software must provide to the user for perfect interaction.</p>
        <hr id="hr1"></hr> 
        <br/>
      <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"140px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"8px",padding:"2px",marginLeft:"30px"}}> <a href={`/submit`}>  Submit Milestone</a></div>

      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
      <h4 id="marks-topic"><b>Milestone 2 - TIS Report </b></h4> <br/>
        <p>An investigation report is a document that details the findings of an investigation as soon as a formal complaint is filed or an incident occurs. This is where investigators record the issues of the matter, analyze the evidence, and formulate a conclusion.</p>
        <hr id="hr1"></hr> 
        <br/>
      <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"140px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"8px",padding:"2px",marginLeft:"30px"}}> <a href={`/submit`}>  Submit Milestone</a></div>

      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
      <h4 id="marks-topic"><b>Milestone 3 - SAS Report </b></h4> <br/>
        <p>A software architecture document is a map of the software. We use it to see, at a glance, how the software is structured. It helps you understand the software's modules and components without digging into the code. It's a tool to communicate with others—developers and non-developers—about the software.</p>
        <hr id="hr1"></hr> 
        <br/>
      <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"140px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"8px",padding:"2px",marginLeft:"30px"}}> <a href={`/submit`}>  Submit Milestone</a></div>

      </div>
      </div>
      <br/><br/>
      <div className="card">
      <div className="container">
      <h4 id="marks-topic"><b>Milestone 4 - Handover Report </b></h4> <br/>
        <p>Include all the reports refined with the latest version applied and approved from your Supervisors</p>
        <hr id="hr1"></hr> 
        <br/>
      <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"140px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"8px",padding:"2px",marginLeft:"30px"}}> <a href={`/submit`}>  Submit Milestone</a></div>

      </div>
      </div>


      <br/>
      <Footer/>
      
</div>
    
    
    
    
  )
}
export default SubmissionMilestones;