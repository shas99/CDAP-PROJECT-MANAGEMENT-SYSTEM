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
                const viewstatusdocument1marksArray = data.data.split("/")
                setStatusDocument1MarksData(viewstatusdocument1marksArray[0]);
                //newly added
                console.log(viewstatusdocument1marksArray[0])
                const viewstatusdocument1marks1=viewstatusdocument1marksArray[0].split(",")
                setstatusdocument1marks(viewstatusdocument1marks1)

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

    //newly added
    const listHandler=()=>{
        try{
            const lists = statusdocument1marks.map((n)=>
            <li>{n}</li>)
            return(
                <ul>{lists}</ul>
            )
        }catch(e){
            console.error(e)
        }
    }

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
                <div id="card">
                <h1 id="caption">Your Status Document 1 marks are</h1><br/>
                <hr id="hr"></hr>
                <p id="List"> {listHandler()}</p>

                </div>

               {/* {fetchProposalPresentationMarksData}<br/><br/><br/><br/> */}
                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewStatusDocument1Marks;