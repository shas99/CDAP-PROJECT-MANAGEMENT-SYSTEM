import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"

const ViewMarks = ({history}) =>{
  const [fetchMarksData, setMarksData] = useState("")

  useEffect(() => {
    const fetchMarksData = async () =>{
      const marksconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/auth/viewmarks",marksconfig);
        setMarksData(data.data);
      }catch(error){

        
      }
    }
    fetchMarksData()
  }, [history])

  return(
    <>
    <div id="back">
      <div style={{background:"green",color:"white"}}>{}</div>
      <p style={{color:"#FF0",textAlign:"right"}}>
        Hello, {}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <div>
          <h1>Your marks are</h1>
          {fetchMarksData}<br/><br/><br/><br/>
        </div>
      </p>
    </div>
    
    
    
    </>
  )
}
export default ViewMarks;