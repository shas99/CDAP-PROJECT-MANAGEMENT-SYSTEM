import { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import "./PrivateScreen.css";

=======
import "./PrivateScreen.css"
>>>>>>> 3cf73e3c511169efb9861304ad4c8b67af0b45fe

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
      <p class="column2" style={{color:"#FF0",textAlign:"center"}}>
        Hello, Your marks are {fetchMarksData}
       
      </p>
    </div>
    
    
    
    </>
  )
}
export default ViewMarks;