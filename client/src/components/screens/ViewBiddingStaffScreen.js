import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import Header from "../Header/Header";
import { useParams } from 'react-router-dom';
import Login from "./StaffExpiredLoginScreen"


const ViewBiddingStaff = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
  const [ID, setID] = useState(useParams().id);
  const [group, setGroup] = useState({});
  useEffect(() => {

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/staffPrivate/staffPrivate", config);
        
        setPrivateData(data.data);
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };
//retreive project data
    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/AvailableProject/ViewStaffBiddings",projectsconfig);
        //console.log(typeof data.data);
        const array = Object.entries(data.data)
        setProjectsData(data.data);
       // console.log(array);

        // console.log(ProjectsData)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        
      }
    
    }
//retreive group details
    const fetchGroupDetails = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        let id = ID
        const{data} = await axios.get(`/api/AvailableProject/getGroupDetails/${id}`,projectsconfig);
        
        //console.log(typeof data.data);
        const array = Object.entries(data.data)
        setGroup(data.data);
       // console.log(array);

        // console.log(ProjectsData)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        
      }
    
    }

    fetchPrivateDate()
    fetchProjectsData()
    fetchGroupDetails()
    // fetchPrivateDate()
  }, [history])
  const objectToArray = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for(let i = 0; i < keys.length; i++){
       res.push(obj[keys[i]]);
       setprojectarray(res)
      //  console.log(projectarray);
      
       
       

    };
    return res; 

 };
 
 
const removeData = (_id) => {
  alert("Deleted Successfully");
  console.log(_id)
  axios.delete(`/api/AvailableProject/deleteProjectDetails/${_id}`).then((res) => {
    this.fetchProjectsData();
  });
};

//Bidding approver
const onClickHandler = async () => {

  const projectsconfig = {
    headers: {
      "Content-Type":"application/json",
      Authorization:`Bearer ${localStorage.getItem("authToken")}`,
    },
  }

  const{data} = await axios.get(`/api/AvailableProject/approveBidding/${ID}`,projectsconfig);
  
alert("Approved sucessfully")

}


  return  error ? ( 
  <>
  <span className="error-message">{error}</span>
        {localStorage.removeItem("authToken")};
        <Login/>
        
    
    </>
  ) :(
    
    <div style={{backgroundColor:"#22272E",minHeight:"50rem"}}>
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminProjects"/>
       </div>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="" style={{marginTop:"-34rem"}}>Project Bid Details</h1>
      

        {console.log(ProjectsData)}
         


<div className="lg:w-1/2 px-8 py-24 bg-gray-800 rounded-lg shadow-md mt-5 ml-80 text-white">
  <div className="lg:w-1/2 mt-[-3rem] float-left">
         
          {ProjectsData.map(project => {
          return (
  
            
            <table className="border-none">
           
                 {/* Return Project data */}
                   {project.Groupid==group._id &&
                                  
                   <tbody className="border-none">
                    <tr className="border-none" ><td className="border-none">Group Name:</td> <td className="border-none pl-10">{project.GroupID}</td></tr> 
                    <tr className="border-none" ><td className="border-none">Batch ID:</td><td className="border-none pl-10">{project.BatchID}</td></tr>
                  </tbody>

                   }

               </table>    
             
      
  
            
            )
            
          })}  
          </div>
          <div className="lg:w-1/2 flex float-right h-auto ">
            <p className="ml-auto">Member 1: {group.member_1}<br/>
            Member 2: {group.member_2}<br/>
            Member 3: {group.member_3}<br/>
            Member 4: {group.member_4}<br/>
            Member 5: {group.member_5}</p>
          </div>
      
     
        

          
        
        
       
      <center><button className="ml-[20rem] mt-10 text-white bg-purple-900 hover:bg-purple-800/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 " onClick={onClickHandler}>Approve</button></center>
     </div>
      

</div>
    
    
    
    
  )
}
export default ViewBiddingStaff;




   
  