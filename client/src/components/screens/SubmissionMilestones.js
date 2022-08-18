import '../../styles/main.css';
import './SubmissionsM.css';
import { format } from 'date-fns'

import { useState, useEffect } from "react";
import axios from "axios";

import Header from "../Header/Header";
import { Batch } from 'aws-sdk';

//import Parser from 'html-react-parser';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import SideNavigationBar from '../SideNavigationBar/sideNavigationBarComponent';




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
  <div id="back" className="bg-green" style={{height:"auto",paddingBottom:"3rem"}}>
  
  {/* <Header/> */}
  <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
  <SideNavigationBar page="StudentMilestones"/>
  </div>
  <br/>
  <h1 id="caption" className="" style={{marginTop:"-850px"}}>RP Submissions Page {batchID}</h1>
      <br/><br/>
        
         <ul>
         {console.log("SubmissionsData")}
         {console.log(SubmissionsData)}
         {console.log("SubmissionsData")}
        {SubmissionsData.map(submission => {
          if(batchID == submission.BatchID && submission.visibility == true){

          
            return (

            //Styled by Pasindu Vinod on 17/08/2022
            <div className="lg:w-2/3 px-8 py-5 bg-gray-800 rounded-lg shadow-md mt-10 ml-80">
            
              <div className="lg:w-2/1 px-8 py-5 bg-gray-900" >
                <p className="text-1xl font-semibold text-white font-sans">{submission.Heading}</p>
              </div>
              <div id="content" className="">
              <br></br><br></br>
              <li className="text-white text-left font-sans"><p>{submission.Description}</p></li>
              <li className="text-white font-sans"><p>{submission.SubmissionPageLink}</p></li><br></br>
              </div>
              <div className="lg:w-1/6 h-8 pt-2 text-white bg-violet-600 rounded-lg mt-5 font-sans"> <a href={`/Submission/${submission._id}`}>&nbsp;&nbsp;      <FontAwesomeIcon className="btnicon" icon={faArrowUpFromBracket} />
              &nbsp;&nbsp;Add Submission&nbsp;&nbsp;</a></div>
              <hr class="w-2/1 border-grey-900 my-4 mt-5"/>
              <div className="text-white text-xs mt-1 font-sans"><p >Updated on {submission.Date}</p></div>
              
            </div>
            
          )}

        })} 
      </ul>
    </div>

  
  </>
);
};
export default SubmissionMilestones;