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
      <div className="text-white">
        Your supervisor is : Pending
        <table>
          <thead>
          <tr>
          <th>Topic</th>
          <th>Topic Description</th>
          <th>Abstract</th>
          <th>Research Problem</th>
          <th>Solution</th>
          <th>System Overview</th>
          <th>Objective</th>
          <th>Project Task</th>
          <th>Technologies</th>
          </tr>
          </thead>
          <tbody>
        {TAFdetails.TAFDetetails.map((TAF) =>
          <tr>
          <td>{TAF.Topic}</td>
          <td>{TAF.topicdescription}</td>
          <td>{TAF.abstract}</td>
          <td>{TAF.researchProblem}</td>
          <td>{TAF.solution}</td>
          <td>{TAF.systemOverview}</td>
          <td>{TAF.objective}</td>
          <td>{TAF.projecttask}</td>
          <td>{TAF.technologies}</td>
        </tr>
        )}
        </tbody>
        </table>
        
      </div>

      <div className="border-solid border-white border-2 w-50% ml-5rem">
        <p>Bidded Supervisors :</p>
        <span><ul>
        {Biddings.BiddigData.map ((biddings) => 
          
            <li>{biddings}</li>
          
        )}</ul></span>

      </div>
      <div className="border-solid border-white border-2 w-50% ml-5rem">
          <table>
            <thead>
              <tr>
                <th className="py-4 px-6">#</th>
                <th className="py-4 px-6">Project Name</th>
                <th className="py-4 px-6">Project Type</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Supervisor</th>
              </tr>
            </thead>
          {ProjectDetails.map ((proj, index) => 
                  <tr>
                    <th className="py-4 px-6">{index+1}</th>
                    <td className="py-4 px-6">{proj[1][0]}</td>
                    <td className="py-4 px-6">{proj[1][1]}</td>
                    <td className="py-4 px-6">{proj[1][2]}</td>
                    <td className="py-4 px-6">{proj[1][3]}</td>
                  </tr>
           ) }
          </table>
      </div>
      </div>
      ) : ( 
      <div>
        <p>Place a Bid</p>

        <button>Place bid on available Projects</button><br/>
        <a href='/topicregistration'> <button >Topic Assessment Form</button></a>
        

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