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
    <div className="view-feedback">
  <br/>
      <h1 id="caption">My Marks</h1>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="marks-topic"><b>Milestone 1 </b></h4> 
        <hr id="hr1"></hr>
        <p className="markscontent"> {fetchMarksData}</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="marks-topic"><b>Milestone 2 </b></h4> 
        <hr id="hr1"></hr>
        <p className="markscontent"> Not available</p> 
      </div>
      </div>
      <br/>
      <div className="card">
      <div className="container">
        <h4 id="marks-topic"><b>Milestone 3 </b></h4> 
        <hr id="hr1"></hr>
        <p className="markscontent"> Not available</p> 
      </div>
      </div>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4 id="marks-topic"><b>Milestone 4 </b></h4> 
        <hr id="hr1"></hr>
        <p className="markscontent"> Not available</p> 
      </div>
     
      </div>


      <br/>
      
</div>
    
    
    
    
  )
}
export default ViewMarks;