import { useState, useEffect } from "react";
import axios from "axios";
import "./StaffDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


import { faDiagramProject,faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const AddSubmission = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [heading,setHeading] = useState("")
  const [description,setDescription] = useState("")
  const [batchID,setBatchID] = useState("")
  const [flow,setFlow] = useState(0)

  useEffect(() => {
    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/adminPrivate/adminPrivate", config);
        
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };



    fetchPrivateDate();
  }, [history]);

  const handleFlow=()=> {
    console.log(flow+1);
    setFlow(flow+1)
  }

  //Logout feature
  const logOutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");

  };

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) : ( 

    <>
    <div id="back">

    <Header/>

    <p style={{color:"#FFF",textAlign:"right"}}>

    <button onClick={logOutHandler} id="logout">Log Out</button>
    </p>

    
    {flow == 0 &&
    <div>
    <form>
    <label>
        Submission Heading:
        <input type="text" name="heading" onChange={(e) => setHeading(e.target.value)} />
    </label>
    <br/>
    <br/>
    <label>
        Submission Description:
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}/>
    </label>
    <br/>
    <br/>
    <label>
        Submission BatchID:
        <input type="text" name="batchID" onChange={(e) => setBatchID(e.target.value)}/>
    </label>
    <br/>
    <br/>
    {/* <input type="submit" value="Submit" /> */}
    </form>
      <button onClick={handleFlow}>
        Next
      </button>
  </div>
    }


<br/>
    {batchID}<br/>
    {heading}<br/>
    {description}

    <br/>
    <br/>
    <br/>
    {flow}
 
<Footer/>

</div>
    </>
  );
};

export default AddSubmission;