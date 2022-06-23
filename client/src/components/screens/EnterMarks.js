import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import "./MarksScreen.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const EnterMarks = ({history}) => {
    const [error,setError]= useState("");
    const [privateData,setPrivateData]= useState("");

    const [groupID, setgroupID]= useState("");
    const [studentIDs, setstudentIDs] = useState("");
    const [studentnames, setstudentnames] = useState("");
    const [examiner1, setexaminer1] = useState("");
    const [examiner2, setexaminer2] = useState("");
    const [moderator, setmoderator] = useState("");
    const [extrafeedback, setextrafeedback] = useState("");
    const [entermarks,setentermarks] = useState("")
    const [fetchentermarksData, setentermarksData] = useState("");

    useEffect(() => {
        const fetchentermarksData = async () => {
            const entermarksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data} = await axios.get("/api/staffPrivate/addmarks", entermarksconfig);
                const entermarksArray = data.data.split("/")
                console.log(entermarksArray[0])
                const entermarks1 =entermarksArray[0].split(",")
                setentermarks(entermarks1)
                setentermarksData(entermarksArray[0]);
               
            }catch(error){
                
            }
        }
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/staffPrivate", config); //change to resolve logged out error
                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }

        }

        //fetch Marks Data()

        fetchPrivateDate();
        fetchentermarksData()
    }, [history])

    //logout feature
    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    const entermarksHandler = async (e) => {
        e.preventDefault();
         const config = {
            header: {
                "Content-Type": "application/json",
            },
         }
         try{
            const {data}=await axios.post(
                "/api/staffPrivate/addmarks",
                { groupID, studentIDs, studentnames, examiner1, examiner2, moderator, extrafeedback,entermarks},
                config
            );

           history.push("/staffPrivate");
         }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");

            }, 5000)
         }
    }

    const listHandler=()=>{
        try{
            const lists = entermarks.map((n)=>
            <li>{n}</li>)
            return(
                <ul>{lists}</ul>

            )
        }catch(e){
            console.error(e)
        }
    }

    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back">
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
            
          <div>        
          <form onSubmit={entermarksHandler} className="group-screen__form">
      <h3 className="login-screen__title">RP (IT4010) - Proposal Presentation Mark Allocation Sheet [Total contribution = 5%]</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <table className="tablemarks1">
            <tr>
                <td>
                <label>
           Student IDs:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setstudentIDs(e.target.value)}
          value={studentIDs} />
                    

                </td>
                <td className="tabletd1">
                <label>
           Student names:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setstudentnames(e.target.value)}
          value={studentnames} />

                </td>
            </tr>
        </table>
        <label>
           Group ID:</label>
          <input type="text" 
          className = "input"
          name="name" 
          onChange={(e) => setgroupID(e.target.value)}
          value={groupID} />
          
        
        </div>


        
          
        <div className="form-group">
        <label>
           Examiner 1:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setexaminer1(e.target.value)}
          value={examiner1} />
                  
                  </div>
                  <div className="form-group">
        <label>
           Examiner 2:</label>
          <input type="text" 
          name="name"
          className = "input"
          onChange={(e) => setexaminer2(e.target.value)}
          value={examiner2} />
        
        </div>

        <div className="form-group">
        <label>
           Moderator:</label>
          <input type="text" 
          name="name"
          className = "input"
          onChange={(e) => setmoderator(e.target.value)}
          value={moderator} />
        
        </div>

        <div className="form-group">
        <label>
           Extra feedback:</label>
          <input type="text" 
          name="name"
          className = "input"
          onChange={(e) => setextrafeedback(e.target.value)}
          value={extrafeedback} />
        
        </div>


      <button type="submit" className="btn btn-primary1" id="Log1Button">
          Enter marks
        </button>

        
      </form></div>
          </div>
      
          <Footer/>
     
        </>
      );
}
export default EnterMarks;
            
          

    
