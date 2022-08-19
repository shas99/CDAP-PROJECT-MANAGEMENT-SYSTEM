import { useState, useEffect } from "react";
import axios from "axios";
import "./Status.css"
// import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

const Status = ({history}) => { 
  const [feedbackData, setFeedbackData] = useState([])
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
  const [heading, setHeading] = useState([]);
  const [status, setStatus] = useState([]);
  const [existingForm, setExistingForm] = useState([]);
  useEffect(() => {

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/student/retrieveData", config);

        setPrivateData(data.data);
        setHeading(data.data.heading);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchFeedbackData = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/status",userprofileconfig);
       
        setFeedbackData(data.data);
        // console.log(data.data[0].Heading)
        // let tempfeedbackData = data.data[0].Heading;
        // try{
        // const {data1} = await axios.get(
        //   "/api/staff/statusArray",
        //   {params: {tempfeedbackData}, },
        // );
        // console.log(data1+"data1.data")
        // setStatus(data1);

        // }catch(error){
        //   console.log(error)
        // }
        var temp = []
        for(let i=0;i<data.data.length;i++){
          temp.push(data.data[i].Heading)
          
        }

        setExistingForm(temp);
        
      } catch (error) {
        console.log(error)

      }
    };


  


    fetchFeedbackData()
    fetchPrivateDate()

  }, [history]);

  const Status =  () => {
    try{
    let x = [];



    for(var i=0;i<feedbackData.length;i++){

      if(heading.includes(existingForm[i])){
      
        x.push(<h1 className="userprofilecontent1">{existingForm[i]} : completed</h1>)
      }
      else{
        x.push(<h1 className="userprofilecontent1">{existingForm[i]} : not completed</h1>)
       
      }
      
    }

   return x
    setStatus(x);
  }catch(error){
    console.log(error)
  }

  }



  
  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :
  (

<div className="statusClass" style={{width:"100%",height:"118rem",backgroundColor:"#22272E"}}>
  <Header/>
  <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
  <SideNavigationBar page="StudentStatus"/>
  </div>
  <br/>




<p className="userprofilecontent2"> {console.log(feedbackData)}</p>  

<p className="userprofilecontent1" style={{marginTop:"-850px",fontSize:"xx-large",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Status of Submissions</p>
<br/>
<div className="StatusCardSubmission">
{/* <ul>{Status()}</ul> */}
<div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-gray-800 border-b">
            <tr>
              <th scope="col" class="font-large text-gray-100 px-6 py-4 text-left">
                Submission
              </th>
              <th scope="col" class="font-large text-gray-100 px-6 py-4 text-centre">
                Status
              </th>
              
            </tr>
          </thead>
          <tbody>
            <tr class="bg-gray-800 border-b transition duration-300 ease-in-out hover:bg-gray-600">
              <td class="px-6 py-4 whitespace-nowrap font-large text-gray-100">Submission 1</td>
              <td class="font-large text-gray-100 font-light px-6 py-4 whitespace-nowrap">
                {Status()}
              </td>
              
            </tr>
            <tr class="bg-gray-800 border-b transition duration-300 ease-in-out hover:bg-gray-600">
              <td class="px-6 py-4 whitespace-nowrap font-large text-gray-100">Submission 2</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {Status()}
              </td>
             
            </tr>
            <tr class="bg-gray-800 border-b transition duration-300 ease-in-out hover:bg-gray-600">
              <td class="px-6 py-4 whitespace-nowrap font-large text-gray-100">Submission 3</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {Status()}
              </td>
             
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
</div>
</div>
    
)  
};

export default Status;
