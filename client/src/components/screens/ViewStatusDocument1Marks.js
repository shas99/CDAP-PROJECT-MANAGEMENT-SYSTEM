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
                //console.log(viewstatusdocument1marksArray.projectNo)
                //const arr = data.data
               

                setstatusdocument1marks(viewstatusdocument1marksArray);
                

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
                <br/><br/>
                </p>
                <div className="lg:w-2/3 px-8 py-6 bg-gray-800 rounded-lg shadow-md mt-6 ml-80 h-auto text-white text-serif">
                <h1 id="caption">Your Status Document 1 marks are</h1><br/>
                <hr id="hr"></hr>
                {/* <p id="List"> {listHandler()}</p>  commented by pasindu vinod */}

                <table className="mt-5 lg:w-4/5 m-auto border-none">
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Gantt chart remarks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.ganttchartremarks}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Actual time marks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.actualtimeremarks}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Break down remarks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.breakdownremarks}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Management tool marks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.managementtoolremarks}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Gantt chart remarks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.ganttchartremarks}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Actual time marks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.actualtimeremarks}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Break down remarks</td><td className="py-3 border-none text-left pl-16">{statusdocument1marks.breakdownremarks}</td></tr>
                <tr className="py-3 hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Management tool remarks</td><td className="py-3 border-none text-left pl-16s">{statusdocument1marks.managementtoolremarks}</td></tr>
                </table>
                
                
                </div>

                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewStatusDocument1Marks;