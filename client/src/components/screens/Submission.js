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
  const [labels,setLabel] = useState([]);
  const [input,setInput] = useState([]);
  const [length,setLength] = useState(0);

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
        // console.log(data.data.Fields[1]+" done");
        
  
        

        setSubmissionsData(data.data.Fields);
        const sub = data.data.Fields;
        
        // var l = sub.length;
        // console.log(SubmissionsData);


        for(var i = 0;i <sub.length;i++){//set arrays for inputboxes and labels
          if(i%2==0){

            setInput(input => [...input, sub[i]])
          }
          else{
            setLabel(label => [...label,sub[i]])
          }
       }
        

        
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
<form>
 {labels.map(label =>{
if(label == "Normal" || label == "normal"){
  return (<label>{label}:<input type="text"></input></label>)
}
// label
 }



)}
</form>
<br/>

{input.map(input =>(

input
)



)}



          <br></br>
   
        


      </ul> </div>
    </div>

  
  </>
);
};
export default Submission;