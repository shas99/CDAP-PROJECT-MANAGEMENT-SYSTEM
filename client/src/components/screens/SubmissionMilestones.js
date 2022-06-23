import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../Header/Header";



const SubmissionMilestones = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [submissionArray, setSubmissionArray] = useState("");
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

    const fetchSubmissionsData = async () =>{
      const submissionsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/STDAvailableSubmissions/availableSubmissions",submissionsconfig);
        const array = Object.entries(data.data)
        setSubmissionsData(data.data);

        
      }catch(error){
        // setError("Data not fetched");
        
      }
    
    }




    fetchSubmissionsData()
    fetchPrivateDate()
  }, [history])

  const objectToArray = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for(let i = 0; i < keys.length; i++){
       res.push(obj[keys[i]]);
       setSubmissionArray(res)
      //  console.log(projectarray);
      
       
       

    };
    return res; 

 };
 



 return error ? ( 
  
  <span className="error-message">{error}</span>
) : ( 

  <>
  <div id="back">
  <Header/>
  <h1 id="caption" className="">RP Submissions Page</h1>
      <br/><br/>


        
         <ul>
        {SubmissionsData.map(submission => {
          return (
            <div className="card" style={{borderRadius:"20px",height:"225px"}}>
        <center><p style={{backgroundColor: "#8256D0",fontSize:"large",fontWeight:"bold",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",borderRadius:"2px"}}>{submission.BatchID}</p></center>
      <div>
                   
                    {/* <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Visibility</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{submission.visibility}</li>  */}
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Heading</b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.Date}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Description</b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.Description}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Heading</b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.Heading}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Heading</b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.SubmissionPageLink}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Heading</b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.visibility}</li> 

                    {/* <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"80px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"8px",padding:"2px",marginLeft:"30px"}}> <a href={`/availableProjects/${project._id}`}>Place Bid</a></div> */}
      </div>
      </div>
            
          )

        })} 
      </ul>
    </div>

  
  </>
);
};
export default SubmissionMilestones;