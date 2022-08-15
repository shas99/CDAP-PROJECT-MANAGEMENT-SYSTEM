import { useState, useEffect } from "react";
import axios from "axios";
import "./EditSubmissions.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {useParams} from 'react-router-dom';

import { faDiagramProject,faGraduationCap } from '@fortawesome/free-solid-svg-icons'
import Submission from "./SubmissionScreen";


const PageNotFound = ({history}) => {
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

    }, [history]);
  
  
    
  
    return  error ? ( 
    
      <span className="error-message">{error}</span>
    ) : ( 
  
      <>
      <div id="back1234">
  
      <Header/>
        <b><h1 style={{color:"red",fontSize:"80px"}}>404<br/>OOPS Page not found</h1></b>
  <Footer/>
  
  </div>
      </>
    );
  };
  
  export default PageNotFound;