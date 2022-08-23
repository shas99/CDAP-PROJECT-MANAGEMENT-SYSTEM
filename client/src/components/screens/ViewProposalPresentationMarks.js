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
                const viewproposalpresentationmarksArray = data.data
                //setProposalPresentationMarksData(viewproposalpresentationmarksArray[0]);
                //newly added
                console.log(viewproposalpresentationmarksArray)
                //const viewproposalpresentationmarks1=viewproposalpresentationmarksArray[0].split(",")
                setproposalpresentationmarks(viewproposalpresentationmarksArray)

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
    // const listHandler=()=>{
    //     try{
    //         const lists = proposalpresentationmarks.map((n)=>
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
                <div className="lg:w-2/3 pb-5 px-8 py-6 bg-gray-800 rounded-lg shadow-md mt-6 ml-80 h-auto text-white text-serif">
                <h1 id="caption">Your Proposal Presentation marks are</h1><br/>
                <hr id="hr"></hr>
                {/* <p id="List"> {listHandler()}</p> */}

                <table className="mt-5 lg:w-4/5 m-auto border-none">
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Proven gap A</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.provengapmarks1</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Proven gap B</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.provengapmarks2</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Capability in applying knowledge A</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.capabilitymarks1</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Capability in applying knowledge B</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.capabilitymarks2</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Solution implementation A</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.implementationmarks1</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Solution implementation B</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.implementationmarks2</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Solution implementation C</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.implementationmarks3</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Effective Communication A</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.communicationmarks1</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Effective Communication B</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.communicationmarks2</td></tr>
                    <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Ability of commercialization marks</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.commercializationmarks1</td></tr>
                    <tr className="py-3 hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Feedback</td><td className="py-3 border-none text-left pl-16">proposalpresentationmarks.extrafeedback</td></tr>
                </table>

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