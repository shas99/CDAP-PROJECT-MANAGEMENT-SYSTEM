import { useState, useEffect } from "react";
// import React from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { render } from "@testing-library/react";
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

const MatchedSupervisors = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    const [suggestions,setsuggestions] = useState([]);
    const [SupervisorName, setSupervisorName] = useState([]);
    const [SupervisorBatch, setSupervisorBatch] = useState([]);
    const [batchID, setBatchID] = useState("");
    const [batchType, setBatchType] = useState("");
    const [Projects, setProjects] = useState([]);
    const [ProjectID, setProjectID] = useState("");
    const [ProjectName, setProjectName] = useState("");
    const [ProjectDescription, setProjectDescription] = useState("");
    const [SelectedSupervisors, setSelectedSupervisors] = useState([]);
    const [SelectedProject, setSelectedProject] = useState("");
    // const [visible, setVisible] = React.useState(false);

    
    useEffect(() => {
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
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };


      const fetchAvailableSupervisors = async () => {
        const supconfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };


        const ab = localStorage.getItem("authToken")
        try {
          const {data} =  await axios.get("/api/group/showSupervisors",{params: {ab}}, supconfig); //need to pass the batch id as a parameter to backend
          const array = Object.entries(data.data)

          setSupervisorName(array);
          //console.log(array)
          
        }
        catch(error){}
      };


      const fetchbatchID = async () =>{
        const submissionsconfig = {
          headers: {
            "Content-Type":"application/json",
            Authorization:`Bearer ${localStorage.getItem("authToken")}`,
          },
        }
  
        try{
          const{data} = await axios.get("/api/STDAvailableSubmissions/batchID",submissionsconfig);
          //const array = Object.entries(data.data)
          setBatchID(data.data);
          const batch = data.data;
          const b = batch.split("-");
          //console.log(b+"batch")
          if(b[1]=="Reg" || b[1]=="reg"){
            setBatchType(6);
            
          }
          else if(b[1]=="June" || b[1]=="june"){
            setBatchType(2);
          };
           
          
        }catch(error){
          
        }
      
      }

      const fetchAvailableProjects = async () => {
        const projectConfig = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        };


        //const ab = localStorage.getItem("authToken")
        try {
          const {data} =  await axios.get("/api/AvailableProject/availableProjects", projectConfig); //need to pass the batch id as a parameter to backend
          const array = Object.entries(data.data)

          setProjects(array);
          console.log(array)
          
        }
        catch(error){}
      };


     
  



       fetchbatchID()
      fetchPrivateDate()
      fetchAvailableSupervisors()
      fetchAvailableProjects()
     
     
    }, [history]);

   
    
    
    // Submit form
      const SubmitBidding = async (e) => {
        e.preventDefault();

        
        
       const pconfig = {
         header: {
           "Content-Type": "application/json",
         },
       };
      
       alert("Successfully Submited!")
       const cd = localStorage.getItem("authToken")
       //console.log("PVT details: "+cd);
       try {
         const { data } = await axios.post(
           "http://localhost:5000/api/AvailableProject/bid",
           { SelectedProject,SelectedSupervisors,cd },
           pconfig
           
         );
         console.log(data)
           alert("Submitted!")

         history.push("/");
       } catch (error) {
         setError(error.response.data.error);
         setTimeout(() => {
           setError("");
           console.log(error)
         }, 5000);
       }
       
     };

//https://stackoverflow.com/questions/71679422/checkbox-check-and-uncheck-to-remove-values-in-react-js

    const updateSupervisors = (e) => { 
      if (e.target.checked) { setSelectedSupervisors((oldArray) => [...oldArray, e.target.value]); } 
      else { removesupervisor(e); console.log(SelectedSupervisors) } 
  }
  const removesupervisor = (e) => { setSelectedSupervisors([...SelectedSupervisors.filter((supervisor) =>
     supervisor !== e.target.value)]) }
  
   

    

  
    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div className="bg-gray-700 h-[75rem]">
        <Header/>
        <SideNavigationBar page="MatchedSupervisors"/>
        {/* Table for Supervisor select */}
         
<div class="overflow-x-auto shadow-md sm:rounded-lg w-[50rem] ml-[20rem] mt-[-50rem]">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Supervisor name
                </th>
                <th scope="col" class="py-3 px-6">
                    Taken Projects
                </th>
                <th scope="col" class="py-3 px-6">
                    Select
                </th>
               
              
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">
                    Sliver
                </td>
                <td class="py-4 px-6">
                    Laptop
                </td>
                
            </tr>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                    White
                </td>
                <td class="py-4 px-6">
                    Laptop PC
                </td>
               
            </tr>
            <tr class="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                    Black
                </td>
                <td class="py-4 px-6">
                    Accessories
                </td>
               
            </tr>
        </tbody>
    </table>
</div>

<br/><br/><br/><br/>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg w-[55rem] ml-[20rem]">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-white-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    Project Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Project Description
                </th>
                <th scope="col" class="py-3 px-6">
                    Availability 
                </th>
                <th scope="col" class="py-3 px-6">
                    Project Category
                </th>
               
            </tr>
        </thead>
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td class="py-4 px-6">
                    Sliver
                </td>
                <td class="py-4 px-6">
                    Laptop
                </td>
                <td class="py-4 px-6">
                    $2999
                </td>
                
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td class="py-4 px-6">
                    White
                </td>
                <td class="py-4 px-6">
                    Laptop PC
                </td>
                <td class="py-4 px-6">
                    $1999
                </td>
               
            </tr>
            <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td class="py-4 px-6">
                    Black
                </td>
                <td class="py-4 px-6">
                    Accessories
                </td>
                <td class="py-4 px-6">
                    $99
                </td>
               
            </tr>
            <tr class="bg-gray-50 border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Google Pixel Phone
                </th>
                <td class="py-4 px-6">
                    Gray
                </td>
                <td class="py-4 px-6">
                    Phone
                </td>
                <td class="py-4 px-6">
                    $799
                </td>
                
            </tr>
            <tr>
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple Watch 5
                </th>
                <td class="py-4 px-6">
                    Red
                </td>
                <td class="py-4 px-6">
                    Wearables
                </td>
                <td class="py-4 px-6">
                    $999
                </td>
               
            </tr>
        </tbody>
    </table>
</div>








        {/* Table for Project select */}



        </div>
        
        </>
      );
    };
    
    export default MatchedSupervisors;





{/* <div id="back">
        
       

          {/* US-01 Pasindu Vinod*/}
          
        //   <div style={{color:"white",width:"100%"}}>
        //     <p className="text-center text-2xl font-semibold ml-10 mt-5">Place Bids for Supervisors {batchID}</p>
        //     <br/>
        //     <div id="Supervisors" style={{display:"in"}}>
        //       <div>
        //         <caption className="text-center mt-5">
        //           Select supervisor
        //         </caption>
        //       <form onSubmit={SubmitBidding}>
        //       <table id = "stable">
                
                 
        //           {SupervisorName.map (supervisor => 
        //           <tr>
        //             <td><input type="checkbox" value={supervisor[1][0]} name="supervisor" onChange={(e) => {updateSupervisors(e)}}></input></td>
        //             <td>{supervisor[1][1]}</td>
        //             <td>{supervisor[1][2]}/{batchType}</td>
        //           </tr>
        //           )}
                
        //     </table>
           

           
           
        //       <h3 className="ml-15 mt-5">
        //       Select Project
        //       </h3>
        //       <table style={{width:"700px"}}>
           

        //         <tr>
        //           <th style={{width:"8rem"}}>Project Category </th>
        //           <th style={{width:"rem"}}>Project Name</th>
        //           <th style={{width:"6rem"}}>Project Description</th>
        //           <th style={{width:"6rem"}}></th>

        //         </tr>
              

        //         {Projects.map (project =>{  
        //           if(project[1].projectStatus == false){
        //             return(
        //             <tr>
        //               <td>{project[1].projectType}</td>
        //               <td>{project[1].projectName}</td>
        //               <td>{project[1].projectDescription}</td>
        //               <td>
        //                 <input type="radio" name="project" value={project[1]._id} onChange={(e) => setSelectedProject(e.target.value)}/> 
        //               </td>
        //             </tr>
        //             )
        //           }else{
        //             return(
        //             <tr>
        //               <td>{project[1].projectType}</td>
        //               <td>{project[1].projectName}</td>
        //               <td>{project[1].projectDescription}</td>
        //               <td>
        //                 Taken 
        //               </td>
        //             </tr>
        //             )
        //           }                          
                               
        //           })}
                


        //       {/* </select>  */}
        //       </table>

              
        //       <button type="submit">Place Bid</button>

             

              
        //     </form>
        //     </div>

        //     </div>
        //   </div>


      
        // </div> */}