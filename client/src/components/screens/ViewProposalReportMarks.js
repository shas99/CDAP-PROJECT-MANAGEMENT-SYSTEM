import { useState, useEffect } from "react";
import axios from "axios";
// import "./ViewProposalReportMarks.css"
// import "./ViewProposalReportMarkscss2.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewProposalReportMarks = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    //newly added
    const [proposalreportmarks,setproposalreportmarks]=useState("");

    const [fetchProposalReportMarksData, setProposalReportMarksData] = useState("");

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

        const fetchProposalReportMarksData = async () => {
            const viewproposalreportmarksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            };

            try{
                const { data } = await axios.get("/api/ViewMarks/viewproposalreportmarks",viewproposalreportmarksconfig);
                const viewproposalreportmarksArray = data.data.split("/")
                setProposalReportMarksData(viewproposalreportmarksArray[0]);
                //newly added
                console.log(viewproposalreportmarksArray[0])
                const viewproposalreportmarks1=viewproposalreportmarksArray[0].split(",")
                setproposalreportmarks(viewproposalreportmarks1)

            }catch(error){

            }
        }
        fetchProposalReportMarksData()

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
            const lists = proposalreportmarks.map((n)=>
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
                <div id="propreportcard">
                <h1 id="caption">Your Proposal Report marks are</h1><br/>
                <hr id="hr"></hr>
                <div className='mr-[67rem]' >
                <p id="List"> {listHandler()}</p>
                </div>
                </div>

               {/* {fetchProposalPresentationMarksData}<br/><br/><br/><br/> */}
                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewProposalReportMarks;