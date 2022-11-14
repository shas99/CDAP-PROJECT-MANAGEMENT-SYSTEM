import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

const StudentBidding = ({history}) => {

    const [privateData, setPrivateData] = useState("");
    const [error, setError] = useState("");
    const [heading, setHeading] = useState([]);
    useEffect(() => {
  
      const fetchPrivateDate = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        try {
          const { data} = await axios.get("/api/student/retrieveData", config);
  
          setPrivateData(data.data);
          setHeading(data.data.heading);
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };


  
      fetchPrivateDate()
  
    }, [history]);




    return  error ? ( 
  
      <span className="error-message">{error}</span>
      ) :
      (
    
      <div className="statusClass" style={{width:"100%",height:"60rem",backgroundColor:"#22272E"}}>
            <div className="inline-box float-left flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
                 <SideNavigationBar page="MatchedSupervisors"/>
            </div>


     </div>

      )

};

export default StudentBidding;