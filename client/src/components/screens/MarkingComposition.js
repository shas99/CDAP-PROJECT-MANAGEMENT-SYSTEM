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
  const [selectedRubric,setSelectedRubric] = useState([]);
  const [totalMarks,setMarks] = useState(0);
  const [batchID, setBatchID] = useState("");

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

  //set batch id
  setBatchID(e.target.value)

    
  console.log(e.target.value)
  const{data} = await axios.get("/api/markingRubrik/getRubricbyBatch",{params:{batch:e.target.value}});
  setRubicsData(rubricsData => data.data)

  //set sethtmlcontent to empty array
    setHtmlcontent(html => [])

    for(let i=0;i<data.data.length;i++){
         
        setHtmlcontent(html => [...html,(<div className="flex justify-center">
        <div className="text-white" style={{width:"30%"}}>
            <Collapsible trigger={[data.data[i].Heading,<BsChevronDown />]}>
                {/* white background */}
                <div className="bg-black">
                  {console.log(data.data)}
                  {data.data[i].Fields.map((field,index) => (
                  <div>
                    {field}
                  </div>
                  ))}
                </div>
        
            </Collapsible>

            

                        {/* input box to enter the marks */}
                        <input type="text" id={"inputbox"+i} className="form-input rounded-md shadow-sm mt-1 block w-full" placeholder="Enter weight" onChange={
                          (e) => {
                            // uncheck the checkbox with id checkbox+index
                            document.getElementById("checkbox"+i).checked = false;
                          }
                        }/>


                    {/* tick box when clicked add the id to the array*/}
                    <input type="checkbox" className="form-checkbox h-5 w-5 text-white" id={"checkbox"+i} onChange={(e) => {

                      //see if checkbox is checked
                      //if checked add to array
                      //if unchecked remove from array
                      if(e.target.checked){
                        
                        //add id to the selectedRubric array
                        setSelectedRubric(selectedRubric => [...selectedRubric,data.data[i]._id])

                        //get the weight of the rubric
                        let weight = document.getElementById("inputbox"+i).value
                        // add to the array
                        setSelectedRubric(selectedRubric => [...selectedRubric,weight])


                      }
                      else{

                        setSelectedRubric(selectedRubric => selectedRubric.filter(item => item !== data.data[i]._id))

                      }
                    }}/>

        
            </div>
            </div>)])

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


const onSubmition = async (e) => {

  const { data } =  axios.post(
    "/api/selectedRubrics/addSelectedRubrics",
    {selectedRubric,batchID},
    {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem("authToken")}`
      }
    }
  );
  

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
{console.log(selectedRubric)}
{/* center */}
{/* <div className="flex justify-center">
<div className="text-white" style={{width:"30%"}}>
    <Collapsible trigger={["2022-Reg",<BsChevronDown />]}> */}
        {/* white background */}
        {/* <div className="bg-black">
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
    </div> */}

{/* white color */}
<div className="flex justify-center">
<div className="text-white" style={{width:"30%"}}>
Total marks: {totalMarks}
</div>
</div>
    
    {html}

    {/* get all the odd number elements from rubrics data add them and render */}
     {selectedRubric.map((data,index) => {
        if(index % 2 != 0){
          console.log(data)
          setMarks(total => total + parseInt(data))
        }

     })
     }



      {console.log(rubricsData)}

        {/* <Link to="/addRubrics" className="login-screen__forgotpassword" id="link">
              Create New rubrics
            </Link> */}

      {/* button */}
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onSubmition}>Submit</button>

      
    </div>
     
  </>
);
};
export default MarkingComposition;