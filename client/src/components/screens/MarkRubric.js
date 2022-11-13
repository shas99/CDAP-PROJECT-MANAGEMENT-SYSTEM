import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "./SubmissionAdmin.css";
import SideNavigationBar from "../AdminNavigationBar/AdminNavigationBar";

const MarkRubric = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [submissionArray, setSubmissionArray] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [fields,setFields] = useState([]);
  const {id} = useParams();
  const [formElements,setFormElements] = useState([]);
  const [labels,setLabel] = useState([]);
//   const [batchID,setbatchID] = useState(history.location.state.id)

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
        const{data} = await axios.get(`/api/markingRubrik/viewRubricsCreatedFromTemplateByID/${id}`,submissionsconfig);
        const array = Object.entries(data.data)
        setSubmissionsData(data.data);
        setFields(fields => data.data.Fields)


          // else{
          //   setInput(label => [...label,sub[i]])
          //   if(sub[i] == "Normal" || sub[i] == "normal"){
          
          //     formElements.push(<div id='content' style={{width:"180%",marginLeft:"-60%",textAlign:"left"}}><label style={{color:"white"}}>{sub[i-1]}:<div className='centerTxtbox' style={{width:"100%"}}><input type="text" style={{width:"100%",height:"40px"}} name={sub[i-1]} value={input.value} onChange={handleChange} required className="textbox"/></div></label><br/><br/></div>)
          //   }else if(sub[i] == "Rich"|| sub[i] == "rich"){
              
          //     console.log(i-1)
          //     setTemp(sub[i-1])


          //     formElements.push(<div style={{width:"180%",marginLeft:"-60%"}}> <button name={sub[i-1]} onClick={handleClick} className="w-[100%] gap-1  h-[78px] m-0-auto text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5" >{sub[i-1]}</button> <br/></div>)
 
          //   }
          // }
      //  }
        
      }catch(error){
        // setError("Data not fetched");
        
      }
    
    }




    fetchSubmissionsData()
    fetchPrivateDate()
  }, [history])

  useEffect(() => {
    //make labels empty array
    labels.length = 0;

    for(var i = 0;i <fields.length;i++){//set arrays for inputboxes and labels
      if(i%2==0){

        // setLabel(input => [...labels, fields[i]])
        console.log(fields[i])
        //push fields to labels array
        labels.push(fields[i])

      }
    }
  }, [fields]);

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
  <h1 id="caption" className="" style={{marginTop:"-575px"}}>Marking</h1>
      <br/><br/>
  {/* <Link to="/CustomisedMarkingRubrics" style={{color:"#fff"}}>View Marking Rubrics</Link> */}
{/* <div class="p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
    </a>
    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
    <a href="#" class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Read more
        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
</div> */}


    
        
        {console.log(labels)}
      <p style={{color:"#fff"}}>{SubmissionsData.Heading}</p>

        {/* <Link to="/addRubrics" className="login-screen__forgotpassword" id="link">
              Create New rubrics
            </Link> */}
<br/>

            {/* render all the elements of labels of labels array using map */}
            {labels.map((label) => (
              // <div id='content' style={{width:"180%",marginLeft:"-60%",textAlign:"left"}}><label style={{color:"white"}}>{label}:<div className='centerTxtbox' style={{width:"100%"}}></div></label><br/><br/></div>
              <h1 style={{color:"#fff"}}>{label}</h1>
            ))}
      
    </div>
     
  </>
);
};
export default MarkRubric;