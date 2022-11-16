import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./SubmissionAdmin.css";
import SideNavigationBar from "../AdminNavigationBar/AdminNavigationBar";
import Collapsible from 'react-collapsible';
import { BsChevronDown } from "react-icons/bs";

const MarkingComposition = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [submissionArray, setSubmissionArray] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [rubricsData,setRubicsData] = useState([]);
  const [html,setHtmlcontent] = useState([]);

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
        const{data} = await axios.get("/api/markingRubrik/viewRubrics",submissionsconfig);
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
 
 const getRubrics = async (e)=> {//normal text box
    
  console.log(e.target.value)
  const{data} = await axios.get("/api/markingRubrik/getRubricbyBatch",{params:{batch:e.target.value}});
  setRubicsData(rubricsData => data.data)

  //set sethtmlcontent to empty array
    setHtmlcontent(html => [])

    for(let i=0;i<data.data.length;i++){
        setHtmlcontent(html => [...html,(setHtml())])
    }

//   add data to the array in the state
//   setRubicsData(rubricsData => [...rubricsData, data.data])

}

const setHtml = () => {
    console.log("set html")
    console.log(rubricsData)
    console.log("set html")
    for(let i = 0; i < rubricsData.length; i++){
    //   setHtmlcontent(<h1>Ge</h1>)
    }
    return (<h1>Hello</h1>)
}


 return error ? ( 
  
  <span className="error-message">{error}</span>
) : ( 

  <>
  
  <div id="back555" style={{height:"60rem"}}>
  <Header/>
  
  <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminSubmission"/>
       </div>
  <h1 id="caption" className="" style={{marginTop:"-575px"}}>Marking Composition</h1>
<br/>

{/* textbox */}
{/* center the input box */}
<div className="flex justify-center">
<input type="text" id="myInput" onChange={getRubrics}/>
</div>

{/* center */}
<div className="flex justify-center">
<div className="text-white" style={{width:"30%"}}>
    <Collapsible trigger={["2022-Reg",<BsChevronDown />]}>
        {/* white background */}
        <div className="bg-black">
      <p>
        This is the collapsible content. It can be any element or React
        component you like.
      </p>
      <p>
        It can even be another Collapsible component. Check out the next
        section!
      </p>
        </div>

    </Collapsible>

    </div>
    </div>

    
    {html}

      {console.log(rubricsData)}

        {/* <Link to="/addRubrics" className="login-screen__forgotpassword" id="link">
              Create New rubrics
            </Link> */}

      
    </div>
     
  </>
);
};
export default MarkingComposition;