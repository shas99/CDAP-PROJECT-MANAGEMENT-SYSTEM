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
    const [anybids, setAnyBids] = useState(false);
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
          const {data} = await axios.get("/api/group/supervisorStatus/"+groupName)
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
          const {data} = await axios.get("/api/group/viewStudentTAF/"+groupName)
          console.log("Data"+JSON.stringify(data.data))
          
          setBiddings(data.data)
          setTAFdetails(data.data)

        }catch(error){
          setError("Data not fetched")
        }
      }

      const fetchViewProject = async () =>{
        try{
          console.log("Group NAme: "+groupName)
          //let gID = groupID
          const {data} = await axios.get("/api/group/viewStudentProjectBids/"+groupName)
          const array = Object.entries(data.data)
          // console.log("Project Data: "+JSON.stringify(data.data))
          console.log("Project Data: "+array)

          //setProjectDetails(JSON.stringify(data.data))
          setProjectDetails(array)
          //console.log("element : "+array[0][1][5])
         // setBiddings(data.data)

        }catch(error){
          setError("Data not fetched")
        }
      }

      fetchPrivateDate()
     // fetchBidstatus()
    }, [history]);


    return  error ? ( 
  
      <span className="error-message">{error}</span>
      ) :
      (
    
      <div className="statusClass" style={{width:"100%",height:"90rem",backgroundColor:"#22272E"}}>
            <div className="inline-box float-left flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  " >
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
           
      <div className="text-white w-80% h-20rem font-sans font-bold">
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-white font-sans">
        Your supervisor is : Pending
        <table className="w-200px text-sm text-centre text-gray-500 dark:text-gray-400 font-sans"  style={{width:"50%"}} >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-sans" >
          <tr>
          <th className="py-3 px-6 font-sans text-white font-bold">Topic</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Topic Description</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Abstract</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Research Problem</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Solution</th>
          <th className="py-3 px-6 font-sans text-white font-bold">System Overview</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Objective</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Project Task</th>
          <th className="py-3 px-6 font-sans text-white font-bold">Technologies</th>
          </tr>
          </thead>
          <tbody>
        {TAFdetails.TAFDetetails.map((TAF) =>
          <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-sans">
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.Topic}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.topicdescription}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.abstract}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.researchProblem}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.solution}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.systemOverview}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.objective}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.projecttask}</td>
          <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{TAF.technologies}</td>
        </tr>
        )}
        </tbody>
        </table>
        
      </div>
<br/>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-white font-sans">
        <p className="font-sans font-bold" style={{marginLeft:"190px",display:"inline-grid"}}>Bidded Supervisors :</p>
        <span><ul style={{marginLeft:"50px",display:"inline-grid"}} >
        {Biddings.BiddigData.map ((biddings) => 
          
            <li className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 text-white rounded-lg inline-flex items-center justify-center px-4 py-2.5 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700" style={{margin:"5px"}}>{biddings}</li>
          
        )}</ul></span>

      </div><br/>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg text-white font-sans">
          <table className="w-fit text-sm text-left text-gray-500 dark:text-gray-400 font-sans" style={{width:"50%", margin:"0 auto"}}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-sans">
              <tr>
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">#</th>
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">Project Name</th>
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">Project Type</th>
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">Category</th>
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">Supervisor</th>
                <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">Co-Supervisor</th>
              </tr>
            </thead>
          {ProjectDetails.map ((proj, index) => 
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 font-sans">
                    <th className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{index+1}</th>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{proj[1][0]}</td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{proj[1][1]}</td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{proj[1][2]}</td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{proj[1][3]}</td>
                    <td className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white font-sans">{proj[1][4]}</td>

                  </tr>
           ) }
          </table>
          
      </div><br/>
        <div>
          <h2 className="font-sans font-bold" style={{marginLeft:"460px",display:"inline-grid"}}>Place New Bidding</h2><br/><br/>
          <a href='/matchedsupervisors'><button  style={{marginLeft:"190px",display:"inline-grid"}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 px-4 py-2.5 ">New Bid On Available Projects
          </button></a>
          <a href='/topicregistration'> <button  style={{marginLeft:"190px",display:"inline-grid"}} className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800 px-4 py-2.5 ">Edit Topic Assessment Details</button></a>
        </div>
      </div>
      ) : ( 
      <div>
        <p>Place a Bid</p>

        
        <a href='/matchedsupervisors'><button className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">Place bid on available Projects</button></a><br/>
        <a href='/topicregistration'> <button  className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800">Topic Assessment Form</button></a>
        

      </div> )}</div>
      )}
     </div>
     
     </div>
     
            /* <div id="supervisorName" className="text-white w-80% h-20rem">
              Your supervisor is : {approved}
            </div> */
    /* {showMySupervisor != false ? (
    <div id="supervisorName" className="text-white w-90% h-20rem">
    Your supervisor is : {approved}
    <br/>
    Approved Project 
    <br/>
    <table className="w-80% text-sm text-left text-white dark:text-white bg-black border-white border-solid">
        <thead className="text-xs text-white uppercase bg-black dark:bg-white dark:text-white">
            <tr>
                <th scope="col" className="py-3 px-6">
                    Project Name
                </th>
                <th scope="col" className="py-3 px-6">
                    Description
                </th>
                <th scope="col" className="py-3 px-6">
                    Supervisor
                </th>
            </tr>
        </thead>
        <tbody>
            <tr className="bg-black border-b dark:bg-black dark:border-gray-700 hover:bg-gray-6000 dark:hover:bg-gray-600">
                <td className="py-4 px-6">
                     
                </td>
                <td className="py-4 px-6">
                     
                </td>
                <td className="py-4 px-6">
                     
                </td>
            </tr>
        </tbody>
    </table>

  </div>
  ) : (
    anybids = true ? (

   
    <div id="supervisorName" className="text-white w-80% h-20rem">
      Your supervisor is : Pending

      <div className="text-white">
        <tr>
          <th>Topic</th>
          <td>{TAFdetails.Topic}</td>
        </tr>

        <tr>
          <th>Topic Description</th>
          <td>{TAFdetails.topicdescription}</td>
        </tr>       

        <tr>
          <th>Abstract</th>
          <td>{TAFdetails.abstract}</td>
        </tr>
          
        <tr>
          <th>Research Problem</th>
          <td>{TAFdetails.researchProblem}</td>
        </tr>
          
        <tr>
          <th>Solution</th>
          <td>{TAFdetails.solution}</td>
        </tr>
          
        <tr>
          <th>System Overview</th>
          <td>{TAFdetails.systemOverview}</td>
        </tr>
          
        <tr>
          <th>Objective</th>
          <td>{TAFdetails.objective}</td>
        </tr>
          
        <tr>
          <th>Project Task</th>
          <td>{TAFdetails.projecttask}</td>
        </tr>
          
        <tr>
          <th>Technologies</th>
          <td>{TAFdetails.technologies}</td>
        </tr>
      </div>

    </div>   
    ) : (
      <p>

        Place Bid for supervisor

      </p>

    ) 
  )} */



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