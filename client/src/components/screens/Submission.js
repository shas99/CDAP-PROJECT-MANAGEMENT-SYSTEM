import '../../styles/main.css';
import './SubmissionsM.css';
import { format } from 'date-fns'

import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';

import Header from "../Header/Header";
import { Batch } from 'aws-sdk';
import {useParams} from 'react-router-dom';

import Parser from 'html-react-parser';




const Submission = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [Int1, setInt1] = useState(0)
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  //const [submissionArray, setSubmissionArray] = useState("");
  const [batchID, setBatchID] = useState("");

   const params =useParams();
   const subm = params.id;
   //console.log(subm);

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
       
        const{data} = await axios.get(`/api/STDAvailableSubmissions/availableSubmissions/${subm}`,submissionsconfig);
        //console.log(data.availableSubmissions.Fields);
        //const array = Object.entries(data.data.Fields);
        console.log(data.data.Fields[1]+" done");
        
        var i = 0;
        

        setSubmissionsData(data.data.Fields);
        const sub = data.data.Fields;
        var l = sub.length;
        console.log(l);
        
        // const rootElement = document.getElementById('root') 
        // const element = React.createElement (
        //   'div',{className:'container'},'Hello'
        // )
        // console.log(element)
        // return rootElement,element


        // console.log("sub - "+sub)
        for(var i = 0; i <l;i++){
          console.log(sub[i]);
          // if(i%2==0){
          //   setLabel(sub[i])
          // }

        }
        // setSub(sub)
        
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
  <h1 id="caption" className="">{batchID}</h1>
      <br/><br/>
      <div className="card" style={{borderRadius:"20px",minHeight:"",width:"90%"}}>

         <ul>
           
           {/* {label.map(label => {
             return(
             <p>{label}</p>
             )
           }
           )}
          { */}
          {/* console.log(sub) */}
          {console.log(SubmissionsData+"This is in the return")}
          {/* {let int1 = 0} */}
          {SubmissionsData.map(submission =>
          //  var len = submission.Fields.length;
          //     console.log(len);
          //       for(var i = 0; i < len; i++){
          //         if((i/2) == 0){
          //             <label> {submission.Fields[i]}</label>
                    
          //         }
          //         if((i%2) == 1){
          //             if(submission.Fields[i] == "Normal"){
          //                 <input type="text"
          //                 className="input"
          //                 />
                        
          //             } 
                      
                    
          //         }
          //       }

          {if((2/2) == 0){
          <div>  <p>{submission}</p><br/></div> 
          }}
         
 
 )}
          <br></br>
          {/* {SubmissionsData[2]} */}
          {/* } */}
        {/* {SubmissionsData.map(submission => {
          // var heading = submission.Heading;
          // document.getElementByID("caption").innerHTML = submission.Heading + batchID;
          //console.log("pasindu");
          console.log("submission.Fields"+submission.Fields[0]);
          // if(batchID == submission.BatchID && submission.visibility == true){
      
             
              //console.log("pasindu");
          //     var tu = submission.Fields[1];
          //     console.log(tu)
          //     return(
          //       <p>{tu}</p>
          //     )
            
              
           
            
          // }

        })}  */}
      </ul> </div>
    </div>

  
  </>
);
};
export default Submission;