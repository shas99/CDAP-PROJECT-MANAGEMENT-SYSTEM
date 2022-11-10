


import { useState, useEffect } from "react";
import axios from "axios";
import "./EditSubmissions.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useParams} from 'react-router-dom';
import Swal from 'sweetalert2'

import { faDiagramProject,faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Submission from "./SubmissionScreen";

const EditRubrics = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [Heading,setHeading] = useState("")
  const [Description,setDescription] = useState("")
  const [BatchID,setBatchID] = useState("")
  const [flow,setFlow] = useState(0)
  const [Fields,setField] = useState([])
  const [temp,setTemp] = useState("")
  const [visibility,setVisibility] = useState()
  const [SubmissionID,setSubmissionID] = useState(useParams().id)
  const [SubmissionData,setSubmissionData] = useState("")
  const [ID,setID] = useState(useParams().id)
  const [Fieldno,setFieldno] = useState()

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/adminPrivate/adminPrivate", config);
        
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchSubmissionData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",

        },
      };

      try {
     
        // const { data } = await axios.get(
        //   "http://localhost:5000/api/STDAvailableSubmissions/viewSpecificSubmission",
        //   {data:{ SubmissionID }},
   
          
        // );

        const { data } = await axios.get(
          "/api/markingRubrik/viewSpecificAbstractRubrics",
          {params:{ SubmissionID }},
        );

        
        setSubmissionData(data.data);
        setBatchID(data.data.BatchID)
        setDescription(data.data.Description)
        setHeading(data.data.Heading)
        setField(data.data.Fields)
        if(data.data.visibility){
          setVisibility(1)
        }else{
          setVisibility(0)
        }
      } catch (error) {

      }
    };



    fetchPrivateDate();
    fetchSubmissionData();
  }, [history]);


    const CreateSubmissionHandler = async (e) => {
      e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    
    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/STDAvailableSubmissions/addSubmission",
        { Heading,Description,BatchID,Fields,visibility },
        config
        
      );
      console.log(data)
        alert("Submitted!")

      history.push("/adminPrivate");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
        console.log(error)
      }, 5000);
    }
    
  };

  const handleFlow=()=> {
    console.log(flow+1);
    setFlow(flow+1)
  }

  const addField=()=> {//normal text box
    setField(Array=> [...Array,Fieldno])
    setField(Array=> [...Array,"Normal"])
  }

  const addField2=()=> {//rich text box
    setField(Array=> [...Array,Fieldno])
    setField(Array=> [...Array,"Rich"])
  }

  //Logout feature
  const logOutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");

  };

  const toggle=()=> {//normal text box
    if(visibility == false){
      setVisibility(1)
    }else{
      setVisibility(0)      
    }
  }


  const DeleteFieldHandler = async (e) => {
    e.preventDefault();

   
    
    try {
      //setField(Fields[(Fieldno*2)-2])
      // setField(Fields.splice((Fieldno*2)-2,1))
      let tempp = []
      for(let i = 0; i < Fields.length;i++){
          if(i == (Fieldno*2)-2){
            continue
          }
          if(i == (Fieldno*2)-1){
            continue
          }
          tempp.push(Fields[i])
      }
      setField(tempp)




  } catch (error) {
    setError(error.response.data.error);
    setTimeout(() => {
      setError("");
      console.log(error)
    }, 5000);
  }
  
};

//added alert
const EditSubmission = async (e) => {
  const Swal = require('sweetalert2')
  e.preventDefault();

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };



  try {
    const token = localStorage.getItem("authToken")
    const { data } = await axios.put(
      `http://localhost:5000/api/markingRubrik/editRubrics`,
      {
        SubmissionID,
        Fields,
        Description,
        Heading,
        BatchID,
        visibility,
      },
      config
    );


    console.log(data);
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Made changes successfully!!'
    })
    history.push("/adminPrivate")
  } catch (error) {
    setError(error.response.data.error);
    setTimeout(() => {
      setError("");
    }, 5000);
  }
};




const displayFields = (Fields) =>{//https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx
    let display = []
  for(let i = 0; i < Fields.length; i++){

    //display.push(<li>{Math.ceil((i+1)/2)}&nbsp;&nbsp;{Fields[i]} : {Fields[i+1]}</li>)
    display.push(<table className="tableeditsub2">
    <tr><td style={{padding:"5px",margin:"5px"}}>{Math.ceil((i+1)/2)}</td></tr>
    <tr><td style={{padding:"5px",margin:"5px"}}>{Fields[i]} : {Fields[i+1]}</td></tr>
    {/* <tr><td style={{padding:"5px",margin:"5px"}}>{Fields[i]} : {Fields[i+1]}</td></tr> */}
      
    
    
    </table>)
      
    i++
  }
  return display
 
}


const DeleteSubmissionHandler = async (e) => {
  const Swal = require('sweetalert2')
  e.preventDefault();
  

 
  
  try {
    console.log(SubmissionID)
    e.preventDefault();

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
    
  console.log("testing")
  
  const { data } = await axios.delete(
    "/api/STDAvailableSubmissions/deleteSubmission",
    {data:{ SubmissionID }},
    config
  );
  console.log(SubmissionID)
    alert("Deleted!")

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Deleted successfully!!'
    })

  history.push("/adminPrivate");
} catch (error) {
  setError(error.response.data.error);
  setTimeout(() => {
    setError("");
    console.log(error)
  }, 5000);
}

};

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) : ( 

    <>
    <div id="back1234">

    <Header/>

    <p style={{color:"#FFF",textAlign:"right"}}>

    <button onClick={logOutHandler} id="logout">Log Out</button>
    </p>

    
    {flow == 0 &&
    <div>
      
    <form id="headert123">
    <label className="textcolor">
        Submission Heading:
        <input type="text" name="heading" onChange={(e) => setHeading(e.target.value)} value={Heading} id="input"/>
    </label>
    <br/>
    <br/>
    <label className="textcolor">
        Submission Description:
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} value={Description} id="input"/>
    </label>
    <br/>
    <br/>
    <label className="textcolor">
        Submission BatchID:
        <input type="text" name="batchID" onChange={(e) => setBatchID(e.target.value)} value={BatchID} id="input"/>
    </label>
    <br></br>
    <label className="textcolor">
        Enable submission
        <input type="checkbox" name="visibility" onChange={toggle} checked={visibility}/>
    </label>
    <br/>
    <br/>
    {/* <input type="submit" value="Submit" /> */}
    </form>
      <button  onClick={handleFlow} className="bluebuttons">
        Next
      </button>

      <button onClick={DeleteSubmissionHandler} className="redbuttons">
        Delete submission
      </button>
      </div>
  
    }
  
    {flow == 1 &&
    <div id="headert123">
        {/* <label>
            Enter field name:
        <input type="text" name="description" onChange={(e) => setField(Array=> [...Array,e.target.value])} */}
        
        <label>
        Enter the number of the field you want to make change to
        <input type="text" name="description" onChange={(e) => setFieldno(e.target.value)} id="input"/>
    </label><br></br>
        <ul>{displayFields(Fields)}</ul>
        {/* />
    </label> */}
    {console.log(Fieldno)}
      


      <br></br>

      <button onClick={DeleteFieldHandler} className="redbuttons1">
        Delete field
      </button>
      <button onClick={addField} className="bluebuttons">
        Add a normal text box
      </button>

      <button onClick={addField2} className="bluebuttons">
        Add a rich text editor
      </button>


      <button onClick={EditSubmission} className="bluebuttons">
        Make changes
      </button>

    </div>
    
} 






<Footer/>

</div>
    </>
  );
};

export default EditRubrics;