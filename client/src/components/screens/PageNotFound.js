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
      <div>
      
<main class="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
	<h1 class="text-9xl font-extrabold text-white tracking-widest">404</h1>
	<div class="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
		Page Not Found
	</div>
	<button class="mt-5">
      <a
        class="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring"
      >
        <span
          class="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"
        ></span>

        <span class="relative block px-8 py-3 bg-[#1A2238] border border-current">
          <router-link to="/dashboard">Go Home</router-link>
        </span>
      </a>
    </button>
</main>
  
     
  
  </div>
      </>
    );
  };
  
  export default PageNotFound;