import { useState, useEffect } from "react";
import axios from "axios";
import "./MarkDashboard.css";
import { Link } from "react-router-dom"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { faFileCircleCheck,faComment,faFile,faListCheck, faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const MarkDashboard = ({history}) => {
    const [error,setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,

                },
            };

            try{
                const { data } = await axios.get("/api/staffPrivate/staffPrivate",config);

                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        }

        fetchPrivateDate();
    }, [history]);

    //logout feature
    const logOutHandler=()=>{
        localStorage.removeItem("authToken");
        history.pusg("/login");
    };

    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <>
        <div id = "back">
            <Header/>
            <h1 id="caption">Welcome to marking dashboard {privateData}</h1>
            <p style={{color:"#FFF",textAlign:"right"}}>
                <button onClick={logOutHandler} id="logout">Log Out</button>
            </p>
        </div>

        <div className="row1">
        <div className="StaffRectangle-37">
        {/* <Link to="/studenttopicinterestingform" id="Regs"><button className="buttons" onClick="/studenttopicinterestingform ">Student Topic Interestings</button></Link> */}
        
        <FontAwesomeIcon  className = "fonticonsize" icon={faFileCircleCheck} /> 
        {/* <i class="fa-solid fa-comment"></i> */}
        {/* <Link to="#" id="Regs"><button className="buttons" onClick="#">Add Marks</button></Link> */}
        <Link to="/addmarks" id="Regs"><button className="buttons">Add marks</button></Link>

        <Footer/>
        </div>
        </div>
        </>
    )
}

export default MarkDashboard;