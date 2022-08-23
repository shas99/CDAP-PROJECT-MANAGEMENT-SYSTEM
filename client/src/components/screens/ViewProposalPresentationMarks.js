import { useState, useEffect } from "react";
import axios from "axios";
import "./ViewProposalPresentationMarks.css"
import "./ViewProposalPresentationMarkscss2.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const ViewProposalPresentationMarks = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    //newly added
    const [proposalpresentationmarks,setproposalpresentationmarks]=useState("");

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
                //newly added
                console.log(viewproposalpresentationmarksArray[0])
                const viewproposalpresentationmarks1=viewproposalpresentationmarksArray[0].split(",")
                setproposalpresentationmarks(viewproposalpresentationmarks1)

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

    //newly added
    const listHandler=()=>{
        try{
            const lists = proposalpresentationmarks.map((n)=>
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
                <h1 id="caption">Your Proposal Presentation marks are</h1><br/>
                <hr id="hr"></hr>
                <p id="List"> {listHandler()}</p>

                </div>
                {/* // const setmarksdata ="Proven gap A"+":"+matchentry.provengapmarks1+",  "
        //                     +"Proven gap B"+":"+matchentry.provengapmarks2+",  "
        //                     +"Capability in applying knowledge A"+":"+matchentry.capabilitymarks1+",  "
        //                     +"Capability in applying knowledge B"+":"+matchentry.capabilitymarks2+",  "
        //                     +"Solution implementation A"+":"+matchentry.implementationmarks1+",  "
        //                     +"Solution implementation B"+":"+matchentry.implementationmarks2+",  "
        //                     +"Solution implementation C"+":"+matchentry.implementationmarks3+",  "
        //                     +"Effective Communication A"+":"+matchentry.communicationmarks1+",  "
        //                     +"Effective Communication B"+":"+matchentry.communicationmarks2+",  "
        //                     +"Ability of commercialization marks"+":"+matchentry.commercializationmarks1+",  "
        //                     +"Feedback"+":"+matchentry.extrafeedback+",  " */}

               {/* {fetchProposalPresentationMarksData}<br/><br/><br/><br/> */}
                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewProposalPresentationMarks;