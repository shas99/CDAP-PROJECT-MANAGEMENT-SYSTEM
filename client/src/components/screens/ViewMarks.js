import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css";
import { Link } from "react-router-dom";

const ViewMarks = ({history}) => {
  const [fetchMarksData, setMarksData] = useState("")

  useEffect(() => {

    const fetchMarksData = async () => {
      const marksconfig = {
        headers:{
          "Content-Type":"application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,

        }
      }
      try{
        const {data} = await axios.get("/api/auth/viewmarks", marksconfig);

        setMarksData(data.data);
      }catch(error){
        //setError("Oops could not retrieve group data");//fix this
      }
    }
    fetchMarksData()
  }, [history]);

  return(
    <>
    <div id="back">
      <div style={{background:"green", color:"white"}}>{}</div>
      <p style={{color:"#FFO", textAlign:"right"}}>
        Hello,{}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <h1>Your marks are</h1>
          {fetchMarksData}<br/><br/><nr/><br/>
        </div>
      </p>
    </div>
    
    
    </>
  )

}

export default ViewMarks;
