import { useState, useEffect } from "react";
import axios from "axios";
import "./StaffDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useParams} from 'react-router-dom';

import { faDiagramProject,faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const EditSubmission = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [Heading,setHeading] = useState("")
  const [Description,setDescription] = useState("")
  const [BatchID,setBatchID] = useState("")
  const [flow,setFlow] = useState(0)
  const [Fields,setField] = useState([])
  const [temp,setTemp] = useState("")
  const [visibility,setVisibility] = useState(false)
  const [SubmissionID,setSubmissionID] = useState(useParams().id)

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



    fetchPrivateDate();
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
    setField(Array=> [...Array,temp])
    setField(Array=> [...Array,"Normal"])
  }

  const addField2=()=> {//rich text box
    setField(Array=> [...Array,temp])
    setField(Array=> [...Array,"Rich"])
  }

  //Logout feature
  const logOutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");

  };

  const toggle=()=> {//normal text box
    if(visibility == false){
      setVisibility(true)
    }else{
      setVisibility(false)      
    }
  }


  const DeleteSubmissionHandler = async (e) => {
    e.preventDefault();

  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  
  
  try {
    console.log(SubmissionID)
    console.log("testing")
    const { data } = await axios.delete(
      "http://localhost:5000/api/STDAvailableSubmissions/deleteSubmission",
      { SubmissionID },
      config
      
    );
    console.log(data)
      alert("Deleted!")

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
    <div id="back">

    <Header/>

    <p style={{color:"#FFF",textAlign:"right"}}>

    <button onClick={logOutHandler} id="logout">Log Out</button>
    </p>
{SubmissionID}
    
    {flow == 0 &&
    <div>
    <form>
    <label>
        Submission Heading:
        <input type="text" name="heading" onChange={(e) => setHeading(e.target.value)} />
    </label>
    <br/>
    <br/>
    <label>
        Submission Description:
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
    </label>
    <br/>
    <br/>
    <label>
        Submission BatchID:
        <input type="text" name="batchID" onChange={(e) => setBatchID(e.target.value)}/>
    </label>
    <label>
        Enable submission
        <input type="checkbox" name="visibility" onChange={toggle}/>
    </label>
    <br/>
    <br/>
    {/* <input type="submit" value="Submit" /> */}
    </form>
      <button onClick={handleFlow}>
        Next
      </button>
  </div>
    }
  
    {flow == 1 &&
    <div>
        <label>
            Enter field name:
        <input type="text" name="description" onChange={(e) => setField(Array=> [...Array,e.target.value])}
        
         
        
        />
    </label>
    {/* <input type="text" name="description" onChange={toggle}/> */}
    
    <br/><br/>
      <button onClick={addField}>
        Add a normal text box
      </button>

      <button onClick={addField2}>
        Add a rich text editor
      </button>

      <button onClick={CreateSubmissionHandler}>
        Create new submission
      </button>



    </div>
    
}

      <button onClick={DeleteSubmissionHandler}>
        Delete submission
      </button>





    
  {/* {console.log(useParams().id)} */}
<Footer/>

</div>
    </>
  );
};

export default EditSubmission;