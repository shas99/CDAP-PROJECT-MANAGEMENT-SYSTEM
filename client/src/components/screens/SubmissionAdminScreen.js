import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./SubmissionAdmin.css";
import SideNavigationBar from "../AdminNavigationBar/AdminNavigationBar";

const SubmissionAdmin = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [submissionArray, setSubmissionArray] = useState("");
  const [visibility, setVisibility] = useState(false);

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

    const fetchSubmissionsData = async () =>{
      const submissionsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/STDAvailableSubmissions/availableSubmissions",submissionsconfig);
        const array = Object.entries(data.data)
        setSubmissionsData(data.data);

        
      }catch(error){
        // setError("Data not fetched");
        
      }
    
    }




    fetchSubmissionsData()
    fetchPrivateDate()
  }, [history])

//   const objectToArray = obj => {
//     const keys = Object.keys(obj);
//     const res = [];
//     for(let i = 0; i < keys.length; i++){
//        res.push(obj[keys[i]]);
//        setSubmissionArray(res)
//        console.log(submissionArray)
//       //  console.log(projectarray);
      
       
       

//     };
//     return res; 

//  };
 
const toggle=()=> {//normal text box
  if(visibility == false){
    setVisibility(true)
  }else{
    setVisibility(false)      
  }
}



 return error ? ( 
  
  <span className="error-message">{error}</span>
) : ( 

  <>
  
  <div id="back555">
  <Header/>
  <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminSubmission"/>
       </div>
  <h1 id="caption" className="" style={{marginTop:"-475px"}}>RP Submissions Page</h1>
      <br/><br/>


        
         <ul>
        {SubmissionsData.map(submission => {
          return (
            <div className="card" style={{borderRadius:"20px",height:"550px"}}>
        <center><p style={{backgroundColor: "#8256D0",fontSize:"large",fontWeight:"bold",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",borderRadius:"2px",width:"30rem",margin:"0 auto",textAlign:"center",alignContent:"center"}}>{submission.BatchID}</p></center>
      <div>
                   
                    {/* <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px"}}><b>Visibility</b>: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{submission.visibility}</li>  */}
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Date       </b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.Date}</li>&nbsp;
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Description</b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.Description}</li>&nbsp;
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Heading    </b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.Heading}</li>&nbsp;
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Links      </b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.SubmissionPageLink}</li>&nbsp; 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Visibility </b>: &nbsp;&nbsp;&nbsp;&nbsp;{submission.visibility}</li>&nbsp; 
                    <label>
              
                    <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"80px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",padding:"2px",width:"120px",textAlign:"center",margin:"0 auto"}}> <a href={`/editSubmission/${submission._id}`}>Edit/Remove submission</a></div>&nbsp;&nbsp;
        <br/> <p style={{fontWeight:"bold",color:"black",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",padding:"2px",width:"300px",textAlign:"center",margin:"0 auto"}}>Submission Enabled?</p>
        <input type="checkbox" name="visibility" onChange={toggle} checked ={submission.visibility}/>
    </label>

      </div>
      </div>
            
          )

        })} 
      </ul>

        <Link to="/addSubmission" className="login-screen__forgotpassword" id="link">
              Create new submission
            </Link>
      
    </div>
     
  </>
);
};
export default SubmissionAdmin;