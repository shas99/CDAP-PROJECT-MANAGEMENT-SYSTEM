import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import "./SubmissionAdmin.css";
import SideNavigationBar from "../AdminNavigationBar/AdminNavigationBar";
import sanitizeHtml from 'sanitize-html';

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
  const [inputBoxs,setInuptBoxs] = useState([]);
  const [entries,setEntries] = useState({})
  const [Submission,setSubmission] = useState()
  const [form,setForm] = useState({})
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

        setSubmission(Submission => data.data.Submissions)


        fetchSubmissionform(data.data.Submissions)

      }catch(error){
        // setError("Data not fetched");
        
      }
    
    }

    const fetchSubmissionform = async (submissionId) =>{
      const submissionsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        console.log("Hello")
        console.log(submissionId)  
        console.log("Hello")
        console.log(localStorage.getItem("groupId"))

        const{data} = await axios.get(`/api/markingRubrik/viewSubmissionForm/${submissionId}/${localStorage.getItem("groupId")}`,submissionsconfig);
        
        console.log(data.data)
        setForm(form => data.data.entries)

      }
      catch(error){
      
      }
    }



    fetchSubmissionsData()
    fetchPrivateDate()

  }, [history])

  useEffect(() => {
    //make labels empty array
    labels.length = 0;
    inputBoxs.length = 0;
    for(var i = 0;i <fields.length;i++){//set arrays for inputboxes and labels
      if(i%2==0){

        // setLabel(input => [...labels, fields[i]])
        console.log(fields[i])
        //push fields to labels array
        labels.push(fields[i])

      }
      else{
        inputBoxs.push(fields[i])
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

const handleChange = (event) => {//for normal textbox
  const name = event.target.name
  const value = event.target.value
  setEntries(entries => ({...entries, [name]:value}))
  // console.log(event.target)
  // console.log(entries)

}

const PostRubric = () => {
  console.log(entries)
  const { data } =  axios.post(
    "/api/MarkingRubrik/markpost",
    {entries,groupid:`${localStorage.getItem("groupId")}`,id},
    {
      headers: {
        'groupID': `${localStorage.getItem("groupId")}`,
      }
    }
  );
}

function stripHtmlTags(str) {
  return str.replace(/(<([^>]+)>)/gi, "");
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
            {labels.map((label,index) => (
              // <div id='content' style={{width:"180%",marginLeft:"-60%",textAlign:"left"}}><label style={{color:"white"}}>{label}:<div className='centerTxtbox' style={{width:"100%"}}></div></label><br/><br/></div>
              <div>
              <label style={{color:"#fff"}}>{label}</label>
              {/* input box with centered */}
              <span>
              <h1 style={{color:"#fff"}}>{inputBoxs[index]}</h1>
              <div className='centerTxtbox' style={{width:"30%"}}><input name={label} type="text" id="inputBox" style={{width:"100%"}} onChange={handleChange}/></div>
              </span>
              </div>

            ))}
            {Submission}<br/>

              {/* button to trigger postmark function when clicked */}
              <button onClick={PostRubric} style={{color:"#fff"}}>Post Mark</button>

              {/* form is an object render the values and keys of the object */}
              <div>
              {Object.keys(form).map((key) => (
                <span>
                  <h1 style={{color:"#fff"}}>{stripHtmlTags(key)}: {stripHtmlTags(form[key])}</h1>
                </span>
              ))}
              </div>
            
      {console.log(entries)}
    </div>
     
  </>
);
};
export default MarkRubric;