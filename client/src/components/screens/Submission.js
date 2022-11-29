// import '../../styles/main.css';
// import './SubmissionsM.css';
import { format } from 'date-fns'

import { useState, useEffect } from "react";
import axios from "axios";
import React from 'react';

import Header from "../Header/Header";
import { Batch } from 'aws-sdk';
import {useParams} from 'react-router-dom';

//import Parser from 'html-react-parser';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import Swal from 'sweetalert2'




const Submission = ({history}) =>{
  const Swal = require('sweetalert2')
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [Int1, setInt1] = useState(0)
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [batchID, setBatchID] = useState("");
  const [labels,setLabel] = useState([]);
  const [input,setInput] = useState([]);
  const [length,setLength] = useState(0);
  const [Key,setKey] = useState(0);
  const [formElements,setFormElements] = useState([]);
  const [entries,setEntries] = useState({})
  const [temp,setTemp] = useState("")
  const [id,setID] = useState([])
  const [flow,setFlow] = useState(0)
  const [pointer,setPointer] = useState(0)
  const [heading,setHeading] = useState("")

   const params =useParams();
   const subm = params.id;


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
        
        setHeading(data.data.Heading);

        formElements.push(<h1 style={{color:"white"}}>{data.data.Heading}</h1>)

        // check if the deadline has passed
        const deadline = new Date(data.data.Deadline);
        const today = new Date();
        if (today > deadline) {
          formElements.push(<h1 style={{color:"red"}}>Deadline has passed, Late submission</h1>)
          
        }
        else {
          formElements.push(<h1 style={{color:"white"}}>Deadline: {format(new Date(data.data.Deadline), 'dd/MM/yyyy')}</h1>)
        }

        //https://www.w3schools.com/react/react_forms.asp
        for(var i = 0;i <sub.length;i++){//set arrays for inputboxes and labels
          if(i%2==0){

            setLabel(input => [...input, sub[i]])

          }
          else{
            setInput(label => [...label,sub[i]])
            if(sub[i] == "Normal" || sub[i] == "normal"){
          
              formElements.push(<div id='content' style={{width:"180%",marginLeft:"-60%",textAlign:"left"}}><label style={{color:"white"}}>{sub[i-1]}:<div className='centerTxtbox' style={{width:"100%"}}><input type="text" style={{width:"100%",height:"40px"}} name={sub[i-1]} value={input.value} onChange={handleChange} required className="textbox"/></div></label><br/><br/></div>)
            }else if(sub[i] == "Rich"|| sub[i] == "rich"){
              
              console.log(i-1)
              setTemp(sub[i-1])


              formElements.push(<div style={{width:"180%",marginLeft:"-60%"}}> <button name={sub[i-1]} onClick={handleClick} className="w-[100%] gap-1  h-[78px] m-0-auto text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5" >{sub[i-1]}</button> <br/></div>)
 
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

  const handleChange = (event) => {//for normal textbox
    const name = event.target.name
    const value = event.target.value
    setEntries(entries => ({...entries, [name]:value}))
    console.log(event.target)

  }


  const handleClick = (event) => {//for rich text button
      console.log(event.target.name)
      setPointer(event.target.name)
      setFlow(flow+1)
      
  }

  const reduce = (event) => {//to change the flow

    setFlow(flow-1)
    const test = pointer
    console.log(entries[test])
}

const submitHandler = async (e) => {//post api to create an entry in mongodb
  e.preventDefault();

  const submissionDate = new Date();

  const config = {
    header: {
      "Content-Type": "application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`,
    },
  };

  try {


     //SUCCESS SWEET ALERT MESSAGE
     Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Saved!', '', 'success')
        const { data } =  axios.post(
          "/api/STDAvailableSubmissions/submissionForm",
          {entries,heading,submissionDate},
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`
            }
          }
        );
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info')
      }
    })
  } catch (error) {
    setError(error.response.data.error);
    setTimeout(() => {
      setError("");
    }, 5000);
  }
};

 return error ? ( 
  
  <span className="error-message">{error}</span>
) : ( 

  <div className='bg-gray-900  h-[85rem] '>
  {flow == 1 &&
<div  className='bg-gray-900 '>
  <br/> <br/> <br/> <br/> <br/> <br/>
  <div className='w-[60rem] ml-[17rem] '>
      <label>
     
         <CKEditor 
                    editor={ClassicEditor}
          

                    value={input.value}
                    data={entries[pointer]}
                    
                    onChange={(event,editor)=>{
                  

                      try{
                      const data = editor.getData()
                      setEntries(entries => ({...entries, [pointer]:data}))
                      }
                      catch(error){
                          console.log(error)
                      }
                    }}
                    
                    /></label>
                    <br/>
                    <button onClick={reduce} className="bg-purple-600 w-[15rem] h-[3.2rem] ml-[20rem] rounded hover:bg-purple-500">Back</button>
    </div>
    {console.log(entries[pointer])}
    {console.log(entries)}
    {console.log(pointer)}
  </div>
  }

  {flow == 0 &&
  <div>
  <Header/>
  <br></br>
  <h1 id="caption" className="">{batchID}</h1>
      <br/><br/>
      <div className="ml-[40.5rem] w-[20rem] mt-[-5rem]" >

         <ul>
<form>


</form>
<br/><br/><br/>

<div className=''>{formElements}</div>
<br/>
<button onClick={submitHandler} className="bg-green-700 h-[3.8rem] m-0-auto rounded hover:bg-green-600" style={{width:"90%", margin:"-15%"}}>Submit</button>
{console.log(entries)}

          <br></br>
   
        


      </ul> </div>
    </div>
}
</div>
  
);
};
export default Submission;