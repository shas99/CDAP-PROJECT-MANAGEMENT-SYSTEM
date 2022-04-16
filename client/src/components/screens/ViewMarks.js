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
    <>
    <div id="back" class="inner-div">
      <div style={{background:"green",color:"white"}}>{}</div>
      <p  class="column2" style={{color:"#FF0",textAlign:"center"}}>
       
        <table className="styled-table"  >
                <thead>
                <tr>
                <th scope='col'>Project milestone</th>
              <th scope='col'> marks</th>
                   
                </tr>
                </thead>
                <tbody>
                  <td>1</td>
                  <td>{fetchMarksData}</td>

                </tbody>
                </table>
       
      </p>
    </div>
    
    
    
    </>
  )
}
export default ViewMarks;