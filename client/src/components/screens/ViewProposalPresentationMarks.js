import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProposalPresentationMarks.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewProposalPresentationMarks = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [fetchProposalPresentationMarksData, setProposalPresentationMarksData] = useState("");

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

        const fetchProposalPresentationMarksData = async () => {
            const viewproposalpresentationmarksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            };

            try{
                const { data } = await axios.get("/api/ViewMarks/viewproposalpresentationmarks",viewproposalpresentationmarksconfig);
                const viewproposalpresentationmarksArray = data.data.split("/")
                setProposalPresentationMarksData(viewproposalpresentationmarksArray[0]);

            }catch(error){

            }
        }
        fetchProposalPresentationMarksData()

        fetchPrivateDate();
    }, [history]);

    //logout feature
    const logOutHandler=()=>{
        localStorage.removeItem("authToken");
        history.push("/login");
    };

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
                <h1>Your Proposal Presentation marks are</h1><br/>
                {fetchProposalPresentationMarksData}<br/><br/><br/><br/>
                
            </p>
            <Footer/>
        </div>
        </>
    )

}
export default ViewProposalPresentationMarks;