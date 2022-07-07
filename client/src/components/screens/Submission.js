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
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';



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
  const [Key,setKey] = useState(0);
  const [formElements,setFormElements] = useState([]);
  const [entries,setEntries] = useState({})


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

        
  
        

        setSubmissionsData(data.data.Fields);
        const sub = data.data.Fields;
        


        //https://www.w3schools.com/react/react_forms.asp
        for(var i = 0;i <sub.length;i++){//set arrays for inputboxes and labels
          if(i%2==0){

            setLabel(input => [...input, sub[i]])

          }
          else{
            setInput(label => [...label,sub[i]])
            if(sub[i] == "Normal" || sub[i] == "normal"){
          
              formElements.push(<div><label>{sub[i-1]}:<input type="text" name={sub[i-1]} value={input.value} onChange={handleChange}></input></label><br/><br/></div>)
            }else if(sub[i] == "Rich"|| sub[i] == "rich"){
              console.log("yoo");
              formElements.push(<div><br/><label>{sub[i-1]}<CKEditor 
              editor={ClassicEditor}
              // data={topicdescription}
              // onChange={(event,editor)=>{
              //   const data = editor.getData()
              //   settopicdescription(data)
              // }}
              /></label></div>)
            }
          }
       }
       


      }catch(error){
        setError("Data not fetched" + error);
        
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
        setError("Data not fetched" + error);
        
      }
    
    }


    fetchSubmissionsData()
    fetchPrivateDate()
    fetchbatchID()
    

  }, [history])

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setEntries(entries => ({...entries, [name]:value}))

  }






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


</form>
<br/>

<div>{formElements}</div>

{console.log(entries)}


          <br></br>
   
        


      </ul> </div>
    </div>

  
  </>
);
};
export default Submission;