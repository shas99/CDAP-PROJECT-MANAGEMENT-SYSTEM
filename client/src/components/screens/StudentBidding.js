import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";
import { render } from "@testing-library/react";
// import { set } from "mongoose";

const StudentBidding = ({history}) => {

    const [privateData, setPrivateData] = useState("");
    const [error, setError] = useState("");
    //const [heading, setHeading] = useState([]);
    const [groupID, setgroupID] = useState("");
    const [approved,setApproved] = useState("false");
    const [anybids, setAnyBids] = useState(true);
    const [showMySupervisor, setShowMySupervisor] = useState(false);
    const [TAFdetails, setTAFdetails] = useState({"TAFDetetails": [
        ]});
    const [Biddings,setBiddings] = useState({"BiddigData": [
        ]});
    const [ProjectDetails, setProjectDetails] = useState([])

    useEffect(() => {
  
      // const fetchPrivateDate = async () => {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //     },
      //   };
  
      //   try {
      //     const { data} = await axios.get("/api/student/retrieveData", config);
  
      //     setPrivateData(data.data);
      //     setHeading(data.data.heading);
      //     setGroupID(data.data4)
      //    console.log("GroupID: "+groupID)
      //   } catch (error) {
      //     localStorage.removeItem("authToken");
      //     setError("You are not authorized please login");
      //   }
      // };

      var groupName = ""

      const fetchPrivateDate = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };
  
        
        try {
          const { data} = await axios.get("/api/private", config);
          
          setPrivateData(data.data);
          setgroupID(groupID => data.data4);
          groupName = data.data4
          // alert(privateData)
          console.log("Group ID: ",groupName)
          fetchBidstatus()
          fetchViewTAF()
          fetchViewProject()
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };

      // const fetchBidstatus = async () => {
      //   try{
      //     let GiD = "RS005"
      //     const {data} = await axios.get("/api/group/supervisorStatus", GiD);
          //alert(data.data)
          //setApproved(data.anyApproved);
          //setAnyBids(data.doneBids);
          //alert("length"+data.length())

          // if(data.data.anyApproved != "Not assigned"){
          //     setApproved(data.data.anyApproved)
          //     setShowMySupervisor(true)
          // }else{
          //   setShowMySupervisor(false)
          //   setAnyBids(data.data.doneBids)
          // }
          // console.log("Array :"+approved)
      //   }catch(error){
      //       setError("There is a problem with your Group ID")
      //   }
        

      // }
      const fetchBidstatus = async () =>{
        try{
          console.log("Group NAme: "+groupName)
          //let gID = groupID
          const {data} = await axios.post(
            "/api/group/supervisorStatus/",
            {groupName})
          //console.log("Data"+JSON.stringify(data.data))
          console.log("STATUS DATA : "+JSON.stringify(data.data))
          console.log(data.data.doneBids)
          //setBiddings(data.data)
          if(data.data.anyApproved == "Not assigned"){
              setApproved("false")
              if(data.data.doneBids == true){
                setAnyBids(true)
              }
          }else{
                setApproved(data.data.anyApproved)
                //approved project details rendering function
          }
        }catch(error){
          setError("Error")
        }
      }

      const fetchViewTAF = async () =>{
        try{
          console.log("Group NAme: "+groupName)
          //let gID = groupID
          const {data} = await axios.post(
            `/api/group/viewStudentTAF`,
            {groupName})
          console.log("Data"+JSON.stringify(data.data))
          
          setBiddings(data.data)
          //console.log(Biddings)
          setTAFdetails(data.data)

        }catch(error){
          setError("TAF Data not fetched")
        }
      }

      const fetchViewProject = async () =>{
        try{
          console.log("Group NAme: "+groupName)
          //let gID = groupID
          const {data} = await axios.post(
            `http://localhost:5000/api/group/viewStudentProjectBids`,
            {groupName});
          const array = Object.entries(data.data)
          // console.log("Project Data: "+JSON.stringify(data.data))
          console.log("Project Data: "+array)

          //setProjectDetails(JSON.stringify(data.data))
          setProjectDetails(array)
          //console.log("element : "+array[0][1][5])
         // setBiddings(data.data)

        }catch(error){
          setError("Project Data not fetched")
        }
      }

      fetchPrivateDate()
     // fetchBidstatus()
    }, [history]);


    return  error ? ( 
  
      <span className="error-message">{error}</span>
      ) :
      (
    
      <div className="statusClass" style={{width:"100%",height:"80rem",backgroundColor:"#22272E"}}>
            <div className="inline-box float-left flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
                 <SideNavigationBar page="MatchedSupervisors"/>
            </div>

            {/* <p style={{color:"white"}}>{groupID}<br/> */}
            {console.log("any bids? "+anybids)}
            <div id="supervisorName" className="text-white w-80% h-20rem">
              {approved != "false" ?(
                <p>Your supervisor is : {approved}</p>
                  
                

      ) : (
       
      <div>
      {anybids == true ? (    
           
      <div>
      {/* <div className="text-white">
        Your supervisor is : Pending */}
        {/* <table>
          <thead>

            <p className="font-sans font-bold" style={{color:"white"}}>{groupID}<br/> */}
            <div id="supervisorName" className="text-white w-80% h-20rem font-sans font-bold">
      Your supervisor is : Pending
       
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-white font-sans">
        <table className="w-fit text-sm text-left text-gray-500 dark:text-gray-400 font-sans">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-sans">

          <tr>
          <th  className="py-3 px-6 font-sans text-black font-bold">Topic</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Topic Description</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Abstract</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Research Problem</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Solution</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">System Overview</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Objective</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Project Task</th>
          <th  className="py-3 px-6 font-sans text-black font-bold">Technologies</th>
          </tr>
          </thead>
          <tbody>
        {TAFdetails.TAFDetetails.map((TAF) =>
          <tr className="bg-gray-800 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-sans">
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.Topic}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.topicdescription}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.abstract}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.researchProblem}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.solution}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.systemOverview}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.objective}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.projecttask}</td>
          <td className="py-4 px-6 font-medium text-gray-500 whitespace-nowrap dark:text-white font-sans">{TAF.technologies}</td>
        </tr>
        )}
        </tbody>
        </table>
        
      </div>
<br/>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-white font-sans">
        <p className="font-sans font-bold">Bidded Supervisors : </p><br/>
        <span><ul>
        {Biddings.BiddigData.map ((biddings) => 
          
            <li className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" style={{margin:"5px"}}>{biddings.SName} : {biddings.feedback}</li>
          
        )}</ul></span>

      </div><br/>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-white font-sans">
          <table className="w-fit text-sm text-left text-gray-500 dark:text-gray-400 font-sans">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-sans">
              <tr>

                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Project Name</th>
                <th className="py-4 px-6">Project Type</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Supervisor</th>
                <th className="py-4 px-6">Co-Supervisor</th>
              </tr>
            </thead>
          {ProjectDetails.map ((proj, index) => 
                  <tr>
                    <th className="py-4 px-6">{index+1}</th>
                    <td className="py-4 px-6">{proj[1][0]}</td>
                    <td className="py-4 px-6">{proj[1][1]}</td>
                    <td className="py-4 px-6">{proj[1][2]}</td>
                    <td className="py-4 px-6">{proj[1][3]}</td>
                    <td className="py-4 px-6">{proj[1][4]}</td>

              </tr>
          //   </thead>
          // {ProjectDetails.map ((proj) => 
          //         <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-sans">
          //           <td className="py-3 px-6 font-sans text-white">{proj[1][0]}</td>
          //           <td className="py-3 px-6 font-sans text-white ">{proj[1][1]}</td>
          //           <td className="py-3 px-6 font-sans text-white ">{proj[1][2]}</td>
          //           <td className="py-3 px-6 font-sans text-white ">{proj[1][3]}</td>

          //         </tr>
           ) }
          </table>
          
      </div>
        <div>
          <h2>Place new Bidding</h2>
          <a href='/matchedsupervisors'><button>New bid on available Projects</button></a><br/>
          <a href='/topicregistration'> <button >Edit Topic Assessment Details</button></a>
        </div>
      </div>
      </div>) : ( 
      <div>
        <p>Place a Bid</p>

        
        <a href='/matchedsupervisors'><button>Place bid on available Projects</button></a><br/>
        <a href='/topicregistration'> <button >Topic Assessment Form</button></a>
        

      </div> )}</div>
      )}
     
     </div></div>
     
     
          



      )

};

export default StudentBidding;

//functionalaties
//first check the group has a supervisor or not using '/supervisorStatus' route.
//if already have show the supervisor name and show what is the project that accepted by supervisor(not implemented yet)
//if dont have a supervisor check they already bidded or not using responce called doneBids
//if already bidded, show the bidded TAF details and bidded supervisors if have using '/viewStudentTAF' api 
//and also for the project biddings(available projects) using '/viewStudentProjectBids' api

//if not bidded yet(doneBids == false), enable user to bid.