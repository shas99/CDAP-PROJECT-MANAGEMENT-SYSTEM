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
                const viewprogresspresentation1marksArray = data.data
                //setProgressPresentation1MarksData(viewprogresspresentation1marksArray[0]);
                //newly added
                // console.log(viewprogresspresentation1marksArray)
                // const viewprogresspresentation1marks1=viewprogresspresentation1marksArray[0].split(",")
                setprogresspresentation1marks(viewprogresspresentation1marksArray)

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
                {/* Added by pasindu vinod */}
                <div className="lg:w-2/3 px-8 py-6 bg-gray-800 rounded-lg shadow-md mt-6 ml-80 h-auto text-white text-serif">
                <h1 id="caption">Your Progress Presentation 1 marks are</h1><br/>
                <hr id="hr"></hr>
                <table className="mt-5 lg:w-4/5 m-auto border-none">
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Proven gap marks 1</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.provengapmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Proven gap marks 2</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.provengapmarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Capability marks 1</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.capabilitymarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Capability marks 2</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.capabilitymarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Implementation marks 1</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.implementationmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Implementation marks 2</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.implementationmarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Implementation marks 3</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.implementationmarks3}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Implementation marks 4</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.implementationmarks4}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Implementation marks 5</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.implementationmarks5}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Communication marks 1</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.communicationmarks1}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Communication marks 1</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.communicationmarks2}</td></tr>
                <tr className="py-3 border-b hover:bg-gray-600"><td className="py-3 border-none text-left pl-16">Commercialization marks</td><td className="py-3 border-none text-left pl-16">{progresspresentation1marks.commercializationmarks}</td></tr>
                </table>

                </div>                
            
            <Footer/>
        </div>
        </>
    )

}
export default ViewProgressPresentation1Marks;