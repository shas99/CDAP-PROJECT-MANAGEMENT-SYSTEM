import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewMarks.css"

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
    <div className="view-marks">
    <h1 id="caption">My marks</h1>
    <div className="card">
    <div className="container">
      <h4 id="marks-topic"><b>Milestone 1 </b></h4> 
      <hr id="hr1"></hr>
      <p className="markscontent"> {fetchMarksData}</p> 
    </div>
    </div>
    <br/>
    
</div> 
    
    
    
    
  )
}
export default ViewMarks;