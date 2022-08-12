import '../../styles/main.css';
import './SubmissionsM.css';
import { format } from 'date-fns'

import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../Header/Header";
import { Batch } from 'aws-sdk';

import Parser from 'html-react-parser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';




const SubmissionMilestones = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [submissionArray, setSubmissionArray] = useState("");
  const [batchID, setBatchID] = useState("");
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
        console.log(array)

        
      }catch(error){
        // setError("Data not fetched");
        
      }
    
    }

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

        
      }catch(error){
        // setError("Data not fetched");
        
      }
    
    }




    fetchSubmissionsData()
    fetchPrivateDate()
    fetchbatchID()
  }, [history])

//   const objectToArray = obj => {
//         const keys = Object.keys(obj);
//     const res = [];
    
//     for(let i = 0; i < keys.length; i++){
//        res.push(obj[i]);
//        setSubmissionArray(res)
//       //  console.log(projectarray);
        
       
       

//     };
//     return res; 

    

//  };


 



 return error ? ( 

  
  <span className="error-message">{error}</span>
) : ( 

  <>
  <div id="back">
  
  <Header/>
  <br></br>
  <h1 id="caption" className="">RP Submissions Page {batchID}</h1>
      <br/><br/>
        
         <ul>
         {console.log("SubmissionsData")}
         {console.log(SubmissionsData)}
         {console.log("SubmissionsData")}
        {SubmissionsData.map(submission => {
          if(batchID == submission.BatchID && submission.visibility == true){
          return (
                     

            
            <div className="card" style={{borderRadius:"20px",minHeight:"",width:"90%"}}>
            
              <div className="Heading">
                <p>{submission.Heading}</p>
              </div>
              <div id="content">
              <br></br><br></br>
              <li className="des"><p>{Parser(submission.Description)}</p></li>
              <li className="link"><p>{submission.SubmissionPageLink}</p></li><br></br>
              </div>
              <div className="submitbtn" style={{backgroundColor:'#8256D0',width:"80px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"8px",padding:"2px",marginLeft:"30px"}}> <a href={`/Submission/${submission._id}`}>&nbsp;&nbsp;      <FontAwesomeIcon className="btnicon" icon={faArrowUpFromBracket} />
              &nbsp;&nbsp;Add Submission&nbsp;&nbsp;</a></div>

              <div className="date"><p >Updated on {submission.Date}</p></div>
              
            </div>
            
          )}

        })} 
      </ul>
    </div>

  
  </>
);
};
export default SubmissionMilestones;