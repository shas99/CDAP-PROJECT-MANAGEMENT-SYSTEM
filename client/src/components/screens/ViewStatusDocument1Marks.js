import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewStatusDocument1Marks.css"
import "./ViewStatusDocument1Markscss2.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewStatusDocument1Marks = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    //newly added
    const [statusdocument1marks,setstatusdocument1marks]=useState("");

    const [fetchStatusDocument1MarksData, setStatusDocument1MarksData] = useState("");
    //const [statusDocument1MarksData, setStatusDocument1MarksData] = useState([]);

    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,

                }
            }
            try{
                const { data } = await axios.get("/api/private",config);
                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        const fetchStatusDocument1MarksData = async () => {
            const viewstatusdocument1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            };

            try{
                const { data } = await axios.get("/api/ViewMarks/viewstatusdocument1marks",viewstatusdocument1marksconfig);
                const viewstatusdocument1marksArray = data.data
                console.log(viewstatusdocument1marksArray.projectNo)
                //const arr = data.data
                //console.log("This is data from back end "+arr)
                //console.log("this is data from arr: "+arr[0])

                setstatusdocument1marks(viewstatusdocument1marksArray);
                //newly added
                //console.log(viewstatusdocument1marksArray[0])
                //const viewstatusdocument1marks1=viewstatusdocument1marksArray[0].split(",")
                //setstatusdocument1marks(viewstatusdocument1marks1)

            }catch(error){

            }
        }
        fetchStatusDocument1MarksData()

        fetchPrivateDate();
    }, [history]);

    //logout feature
    const logOutHandler=()=>{
        localStorage.removeItem("authToken");
        history.push("/login");
    };

    //newly added -  commented by pasindu vinod
    // const listHandler=()=>{
    //     try{
    //         const lists = statusdocument1marks.map((n)=>
    //         <li>{n}</li>)
    //         return(
    //             <ul>{lists}</ul>
    //         )
    //     }catch(e){
    //         console.error(e)
    //     }
    // }

    // const trhandler = () =>{
        
    //         for(let i = 3; i < 11;i++){
    //             switch(i){
    //                case 3:
    //                  return (<tr><td>Actual time marks</td><td>{statusdocument1marks[3]}</td></tr>)
    //                case 4:
    //                  return (<tr><td>Break down marks</td><td>{statusdocument1marks[4]}</td></tr>)
    //                case 5:
    //                  return (<tr><td>Capability in applying</td><td>{statusdocument1marks[5]}</td></tr>)
    //                case 6:
    //                  return (<tr><td>Management tool marks</td><td>{statusdocument1marks[6]}</td></tr>)
    //                case 7:
    //                  return (<tr><td>Gantt chart remarks</td><td>{statusdocument1marks[7]}</td></tr>)
    //                case 8:
    //                  return (<tr><td>Actual time marks</td><td>{statusdocument1marks[8]}</td></tr>)
    //                case 9:
    //                  return (<tr><td>Break down remarks</td><td>{statusdocument1marks[9]}</td></tr>)
    //                case 10:
    //                  return (<tr><td>Management tool remarks</td><td>{statusdocument1marks[10]}</td></tr>)
    //             //  default:
    //             //  return "neutral"
    //             }
               
    //        }
        
    // }

    // const trhandler = () =>{
        
    //     for(let i = 3; i < 11;i++){
    //         console.log(i)
    //         if(i=3){
    //              return (<tr><td>Actual time marks</td><td>{statusdocument1marks[3][1]}</td></tr>)}
    //            if(i=4){
    //              return (<tr><td>Break down marks</td><td>{statusdocument1marks[4]}</td></tr>)}
    //            if(i=5){
    //              return (<tr><td>Capability in applying</td><td>{statusdocument1marks[5]}</td></tr>)}
    //            if(i=6){
    //              return (<tr><td>Management tool marks</td><td>{statusdocument1marks[6]}</td></tr>)}
    //            if(i=7){
    //              return (<tr><td>Gantt chart remarks</td><td>{statusdocument1marks[7]}</td></tr>)}
    //            if(i=8){
    //              return (<tr><td>Actual time marks</td><td>{statusdocument1marks[8]}</td></tr>)}
    //            if(i=9){
    //              return (<tr><td>Break down remarks</td><td>{statusdocument1marks[9]}</td></tr>)}
    //            if(i=10){
    //              return (<tr><td>Management tool remarks</td><td>{statusdocument1marks[10]}</td></tr>)}
    //         //  default:
    //         //  return "neutral"
    //         }
            
    


    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <>
        <div id = "back">
            <Header/>
            <p style={{color:"#FFF",textAlign:"right"}}>
                {privateData}
                &nbsp;&nbsp;&nbsp;&nbsp;

                <button onClick={logOutHandler} id="logout">Log out</button>
            </p>

            <p style={{color:"#FFF"}}>
                <br/><br/><br/><br/>
                </p>
                <div className="lg:w-2/3 px-8 py-6 bg-gray-800 rounded-lg shadow-md mt-6 ml-80 h-auto text-white text-serif">
                <h1 id="caption">Your Status Document 1 marks are</h1><br/>
                <hr id="hr"></hr>
                {/* <p id="List"> {listHandler()}</p> */}
               
                
                
                </div>

               {/* {fetchProposalPresentationMarksData}<br/><br/><br/><br/> */}
                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewStatusDocument1Marks;