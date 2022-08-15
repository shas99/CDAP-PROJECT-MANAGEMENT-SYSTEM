import { useState, useEffect } from "react";
// import React from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { render } from "@testing-library/react";
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";
import Swal from 'sweetalert2'

const MatchedSupervisors = ({history}) => {
  const Swal = require('sweetalert2')
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
    
       const cd = localStorage.getItem("authToken")
       //console.log("PVT details: "+cd);
       try {

          //SUCCESS SWEET ALERT MESSAGE
          Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {

              Swal.fire('Saved!', '', 'success')
                 const { data } =  axios.post(
           "http://localhost:5000/api/AvailableProject/bid",
           { SelectedProject,SelectedSupervisors,cd },
           pconfig
           
         );
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })


        
        
        //  const { data } = await axios.post(
        //    "http://localhost:5000/api/AvailableProject/bid",
        //    { SelectedProject,SelectedSupervisors,cd },
        //    pconfig
           
        //  );
        //  console.log(data)
        //    alert("Submitted!")

        
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
        <div className="bg-gray-900 h-[75rem]">
        <Header/>
        <SideNavigationBar page="MatchedSupervisors"/>

        
        {/* Table for Supervisor select */}
        <form onSubmit={SubmitBidding}>  
<div class="overflow-x-auto shadow-md sm:rounded-lg w-[50rem] ml-[20rem] mt-[-50rem]">
<h1 className="text-4xl text-slate-300"> Choose Your Supervisor</h1> <br/>
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
        {SupervisorName.map (supervisor => 
                  <tr>
                    <td className="py-4 px-6">{supervisor[1][1]}</td>
                    <td className="w-10 items-center py-4 px-8">{supervisor[1][2]}/{batchType}</td>
                    <td className="w-10 items-center py-4 px-8" ><input type="checkbox"  value={supervisor[1][0]} name="supervisor" onChange={(e) => {updateSupervisors(e)}}></input></td>
                  </tr>
                  )}
    </table>
</div>

<br/><br/><br/><br/>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg w-[55rem] ml-[20rem]">
<h1 className="text-4xl text-slate-300"> Pick Your Project</h1> <br/>
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
                Project Category
                </th>
                <th scope="col" class="py-3 px-6">
                   Availability
                </th>
               
            </tr>
        </thead>
        <tbody>
          
               {Projects.map (project =>{  
                  if(project[1].projectStatus == false){
                    return(
                    <tr>
                       <td className="py-4 px-6">{project[1].projectName}</td>
                       <td>{project[1].projectDescription}</td>
                      <td>{project[1].projectType}</td>
                      <td className="w-10 items-center py-4 px-12" >
                        <input type="radio" name="project" value={project[1]._id} onChange={(e) => setSelectedProject(e.target.value)}/> 
                      </td>
                    </tr>
                    )
                  }else{
                    return(
                    <tr>
                     <td className="py-4 px-6 w-[23rem] text-s">{project[1].projectName}</td>
                       <td className="py-4 px-6 w-[59rem] text-xs">{project[1].projectDescription}</td>
                      <td className="py-2 px-2 w-[19rem] text-s">{project[1].projectType}</td>
                      <td className="w-10 items-center py-4 px-8" >
                        Taken 
                      </td>
                    </tr>
                    )
                  }                          
                               
                  })}
                
        </tbody>
    </table>
</div>
<button type="submit" className="ml-[20rem] mt-10 text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2">Place Bid</button>

</form>







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