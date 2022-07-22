import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProgressPresentation1Marks.css"
import "./ViewProgressPresentation1Markscss2.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewProgressPresentation1Marks = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    //newly added
    const [progresspresentation1marks,setprogresspresentation1marks]=useState("");

    const [fetchProgressPresentation1MarksData, setProgressPresentation1MarksData] = useState("");

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

        const fetchProgressPresentation1MarksData = async () => {
            const viewprogresspresentation1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            };

            try{
                const { data } = await axios.get("/api/ViewMarks/viewprogresspresentation1marks",viewprogresspresentation1marksconfig);
                const viewprogresspresentation1marksArray = data.data.split("/")
                setProgressPresentation1MarksData(viewprogresspresentation1marksArray[0]);
                //newly added
                console.log(viewprogresspresentation1marksArray[0])
                const viewprogresspresentation1marks1=viewprogresspresentation1marksArray[0].split(",")
                setprogresspresentation1marks(viewprogresspresentation1marks1)

            }catch(error){

            }
        }
        fetchProgressPresentation1MarksData()

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
            const lists = progresspresentation1marks.map((n)=>
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
                <h1 id="caption">Your Progress Presentation 1 marks are</h1><br/>
                <hr id="hr"></hr>
                <p id="List"> {listHandler()}</p>

                </div>

               {/* {fetchProposalPresentationMarksData}<br/><br/><br/><br/> */}
                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewProgressPresentation1Marks;