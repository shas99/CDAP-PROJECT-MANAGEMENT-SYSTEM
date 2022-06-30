import { useState, useEffect } from "react";
import axios from "axios";
// import "./MatchedSupervisors.css";
import "./EnterStatusDocument1Marks.css";
import Header from "../Header/Header";

const EnterStatusDocument1Marks = ({history}) => {
    const [error,setError]= useState("");
    const [privateData,setPrivateData]= useState("");
    const [projectNo, setprojectNo ] = useState("");
    const [studentIDs, setstudentIDs ] = useState("");
    const [ganttchartmarks, setganttchartmarks] = useState("");
    const [actualtimemarks, setactualtimemarks] = useState("");
    const [breakdownmarks, setbreakdownmarks] = useState("");
    const [managementtoolmarks, setmanagementtoolmarks] = useState("");
    const [ganttchartremarks, setganttchartremarks] = useState("");
    const [actualtimeremarks, setactualtimeremarks] = useState("");
    const [breakdownremarks, setbreakdownremarks] = useState("");
    const [managementtoolremarks, setmanagementtoolremarks] = useState("");
    const [supervisor, setsupervisor] = useState("");
    const [cosupervisor, setcosupervisor] = useState("");
    const [enterstatusdocument1marks,setenterstatusdocument1marks] = useState("")
    const [fetchenterstatusdocument1marksData, setenterstatusdocument1marksData] = useState("");

    useEffect(() => {
        const fetchenterstatusdocument1marksData= async () => {
            const enterstatusdocument1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data} = await axios.get("/api/staffPrivate/addstatusdocument1marks", enterstatusdocument1marksconfig);
                const enterstatusdocument1marksArray = data.data.split("/")
                console.log(enterstatusdocument1marksArray[0])
                const enterstatusdocument1marks =enterstatusdocument1marksArray[0].split(",")
                setenterstatusdocument1marks(enterstatusdocument1marks)
                setenterstatusdocument1marksData(enterstatusdocument1marksArray[0]);
               
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
                const { data } = await axios.get("/api/staffPrivate/staffPrivate", config); //change to resolve logged out error
                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }

        }


        //fetch Marks Data()

        fetchPrivateDate();
        fetchenterstatusdocument1marksData()
    }, [history])

    //logout feature
    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    const enterstatusdocument1marksHandler = async (e) => {
        e.preventDefault();
         const config = {
            header: {
                "Content-Type": "application/json",
            },
         }
         try{
            const {data}=await axios.post(
                "/api/staffPrivate/addstatusdocument1marks",
                { projectNo,studentIDs,ganttchartmarks,actualtimemarks,breakdownmarks,managementtoolmarks, ganttchartremarks,actualtimeremarks,breakdownremarks,managementtoolremarks,supervisor,cosupervisor},
                config
            );

           history.push("/staffPrivate");
         }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");

            }, 5000)
         }
    }

    const listHandler=()=>{
        try{
            const lists = enterstatusdocument1marks.map((n)=>
            <li>{n}</li>)
            return(
                <ul>{lists}</ul>

            )
        }catch(e){
            console.error(e)
        }
    }


}

export default EnterStatusDocument1Marks;