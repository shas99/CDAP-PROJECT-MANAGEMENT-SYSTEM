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
    const [ enterprogresspresentation1marks, setenterprogresspresentation1marks]= useState("");
    const[fetchenterprogresspresentation1marksData, setenterprogresspresentationmarksData] = useState("");

    useEffect(() => {
        const fetchenterprogresspresentation1marksData = async () => {
            const enterprogresspresentation1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/addprogresspresentation1marks",enterprogresspresentation1marks);
                const enterprogresspresentation1marksArray = data.data.split("/")
                console.log(enterprogresspresentation1marksArray[0])
                const enterprogresspresentation1marks1 = enterprogresspresentation1marksArray[0].split(",")
                setenterprogresspresentation1marks(enterprogresspresentation1marks1)
                setenterprogresspresentationmarksData(enterprogresspresentation1marksArray[0]);


            }catch(error){

            }
        }
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/staffPrivate",config);
                setPrivateData(data.data);


            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");

            }
        }
    })






}