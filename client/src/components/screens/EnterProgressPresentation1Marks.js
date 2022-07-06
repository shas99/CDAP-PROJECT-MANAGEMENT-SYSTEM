import { useState, useEffect } from "react";
import axios from "axios";
import "./EnterProgressPresentation1Marks.css";
import Header from "../Header/Header";

const EnterProgressPresentation1Marks = ({history}) => {
    const [error,setError]= useState("");
    const [privateData, setPrivateData] = useState("");
    const [groupID, setgroupID]= useState("");
    const [studentIDs, setstudentIDs]= useState("");
    const [studentnames, setstudentnames]= useState("");
    const [provengapmarks1, setprovengapmarks1] = useState("");
    const [provengapmarks2, setprovengapmarks2] = useState("");
    const [capabilitymarks1, setcapabilitymarks1] = useState("");
    const [capabilitymarks2, setcapabilitymarks2] = useState("");
    const [implementationmarks1, setimplementationmarks1] = useState("");
    const [implementationmarks2, setimplementationmarks2] = useState("");
    const [implementationmarks3, setimplementationmarks3] = useState("");
    const [implementationmarks4, setimplementationmarks4] = useState("");
    const [implementationmarks5, setimplementationmarks5] = useState("");
    const [communicationmarks1,setcommunicationmarks1] = useState("");
    const [communicationmarks2, setcommunicationmarks2] = useState("");
    const [commercializationmarks, setcommercializationmarks] = useState("");
    const [extrafeedback, setextrafeedback] = useState("");
    const [recommendation, setrecommendation] = useState("");
    const[examiner1,setexaminer1] = useState("");
    const [examiner2, setexaminer2] = useState("");
    const [moderator, setmoderator] = useState("");

    




}