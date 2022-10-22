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
                const viewproposalreportmarksArray = data.data
                // setProposalReportMarksData(viewproposalreportmarksArray[0]);
                //newly added
                console.log(viewproposalreportmarksArray+"this is an array")
                //const viewproposalreportmarks1=viewproposalreportmarksArray[0].split(",")
                setproposalreportmarks(viewproposalreportmarksArray)

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
    // const listHandler=()=>{
    //     try{
    //         const lists = proposalreportmarks.map((n)=>
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
                <br/><br/><br/><br/>
                </p>
                <div className="lg:w-2/3 px-8 py-6 bg-gray-800 rounded-lg shadow-md mt-6 ml-80 h-auto text-white text-serif">
                <h1 id="caption">Your Proposal Report marks are</h1><br/>
                <hr id="hr"></hr>
                <table className="mt-5 lg:w-4/5 m-auto border-none">
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Proven gap A</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.provengapmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Proven gap B</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.provengapmarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Capability in applying knowledge A</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.capabilitymarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Capability in applying knowledge B</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.capabilitymarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Solution implementation A</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.implementationmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Solution implementation B</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.implementationmarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Solution implementation C</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.implementationmarks3}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Effective Communication A</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.communicationmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Effective Communication B</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.communicationmarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Effective Communication C</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.communicationmarks3}</td></tr>

                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Ability of commercialization marks</td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.commercializationmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Feedback </td><td className="py-3 border-none text-left pl-16">{proposalreportmarks.extrafeedback}</td></tr>
                </table>
                {/* <p id="List"> {listHandler()}</p> */}
                
                </div>

               {/* {fetchProposalPresentationMarksData}<br/><br/><br/><br/> */}
                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewProposalReportMarks;