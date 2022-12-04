import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';
import Header from "../Header/Header";
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2'



const SupervisorViewBidding = ({history}) =>{
  //const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  //const [projectarray, setprojectarray] = useState("");
  const [BatchID, setBatchID] = useState("2022-Reg")
  const [shw1,setShw1] = useState(false)
  const [shw2,setShw2] = useState(false)
  const [staffID, setStaffID] = useState("");
  const [ProjectDetails, setProjectDetails] = useState([])
  const [supervisor, setSupervisor] = useState([])
  // const [bidID, setBidID] = useState("")

  useEffect(() => {

    var staffID

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
        setStaffID(data.data2)
        staffID = data.data2
        fetchProjectsData()
        fetchSupervisorData()
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        console.log("fetching projects data")
        console.log(staffID)
        const{data} = await axios.post(
          "/api/group/staffViewPBiddings",
            {staffID,BatchID},projectsconfig
        );
        //console.log(typeof data.data);
        //const array = Object.entries(data.data)
        //setProjectsData(JSON.stringify(data.data));
        //console.log(data.data)
       // console.log("DATA: "+JSON.stringify(data.data[0].bid));
        console.log("ID: "+data.data[0].bid._id)
        setProjectDetails(ProjectDetails=>(data.data))
        
        // console.log(ProjectDetails[0].bid.BatchID)
        //console.log(data.data[0].bid.GroupID)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        setError(""+error)
      }
    
    }

    const fetchSupervisorData = async () =>{
      const supconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        console.log("fetching projects data")
        console.log(staffID)
        const{data} = await axios.post(
          "/api/group/staffViewBiddings",
            {staffID,BatchID},supconfig
        );
        //console.log(typeof data.data);
        //const array = Object.entries(data.data)
        //setProjectsData(JSON.stringify(data.data));
        console.log(data.data)
        //                                console.log(data.data[0].tafDetails[0].groupID)
        //console.log("DATA: "+JSON.stringify(data.data));
        //console.log(data.data[0].bid.BatchID)
        setSupervisor(supervisor => (data.data))
        
        // console.log(ProjectDetails[0].bid.BatchID)
       //console.log(supervisor)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        setError(""+error)
      }
    
    }


    fetchPrivateDate()

  }, [history])

  const SubmitBidding = async (id) => {
    // e.preventDefault();  
   
   const pconfig = {
     header: {
       "Content-Type": "application/json",
     },
   };
   try {

     // SUCCESS SWEET ALERT MESSAGE
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
          
             const { data } =  axios.put(
       `http://localhost:5000/api/group/acceptpBid/${id}`,
       pconfig
     );
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
        }
      })
    
   } catch (error) {
     setError(error.response.data.error);
     setTimeout(() => {
       setError("");
       console.log(error)
     }, 5000);
   }
   
 };


//   const objectToArray = obj => {
//     const keys = Object.keys(obj);
//     const res = [];
//     for(let i = 0; i < keys.length; i++){
//        res.push(obj[keys[i]]);
//        setprojectarray(res)
//       //  console.log(projectarray);
      
       
       

//     };
//     return res; 

//  };
 
 
// const removeData = (_id) => {
//   alert("Deleted Successfully");
//   console.log(_id)
//   axios.delete(`/api/AvailableProject/deleteProjectDetails/${_id}`).then((res) => {
//     this.fetchProjectsData();
//   });
// };


  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div className='bg-gray-900 h-[80rem]'>
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminProjects"/>
       </div>
       <div style={{marginLeft:"20rem"}}>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="ml-auto" style={{marginTop:"-35rem"}}>Biddings</h1>
      
      {/* <center>

        </center>
        {console.log(ProjectsData)}
         <ul>
        {ProjectsData.map(project => {
          return (
            

<div class="lg:w-2/3 px-8 py-5 bg-gray-800 rounded-lg shadow-md mt-5 ml-80">
    <a >
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-600 dark:text-white">{project.GroupID}</h5>
    </a>
    <p class="mb-3 font-normal text-white dark:text-gray-400"><b>Group Name : </b> {project.GroupID} <br/>
    <b>Batch ID &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;: {project.BatchID} </b>
    </p>
    <a href={`/viewBidding/${project._id}`} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        View Bidding
        <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </a>
    
</div>

    
    
            
          )

        })}  
      </ul>  
      <br/>
      
      <br/>
     
      <br/><br/>
      <br/>*/}
      {/* <button onClick = {setShw1(shw1=> true)}>Supervisor Biddings</button><br/> */}
      {/* <button onClick = {shw2=> true}>TAF Biddings</button> */}

      {/* {shw1 ? */}
      <div className="text-white">
        <p>Bids for Supervisor Projects</p>
        <br/>
        {/* <table>
          <thead>
        <tr>
          <th>#</th>
          <th>Group</th>
          <th>Batch</th>
          <th>Project</th>
          <th>Action</th>
        </tr></thead>
        <tbody>
        {ProjectDetails.map ((details,index) =>{
          return(
          <tr><td>saa</td>
            
            <td>{index}</td>
          <td>{details.bid.GroupID}</td>
          <td>{details.bid.BatchID}</td>
          <td>{details.project.projectName}</td>
          <td>Action</td>
          </tr>)}
        )}
        </tbody>
</table> */}

      <table className="w-fit text-sm text-left text-gray-500 dark:text-gray-400 font-sans">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 font-sans">

          <tr>
            <th className="py-3 px-6 font-sans text-black font-bold">#</th>
            <th className="py-3 px-6 font-sans text-black font-bold">Group</th>
            <th className="py-3 px-6 font-sans text-black font-bold">Batch</th>
            <th className="py-3 px-6 font-sans text-black font-bold">Project</th>
            <th className="py-3 px-6 font-sans text-black font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {ProjectDetails.map ((Pdetails,i) => {
            console.log(Pdetails)
            return(
            <tr>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">{i+1}</td>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">{Pdetails.bid.GroupID}</td>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">{Pdetails.bid.BatchID}</td>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">{Pdetails.project.projectName}</td>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">
                <button type="button" 
                onClick={() => SubmitBidding(Pdetails.bid._id)} 
                className="py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-2 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-700"
                >
                  Accept
                </button> 
               </td>
            </tr>
            )
          })}
        </tbody>
      </table>


{/* {console.log(ProjectDetails)} */}
      </div>   
      {/* :null
      } */}


      {/* {shw2? */}
      <br/><br/>
      <div className="text-white">
        <p>Student Bids</p>
        {/* All the taf biddings will show in this div. use "AcceptBid" api for accept bids*/}
        <div>

        <table>
          <thead>
            <tr>
            <th>#</th>
            <th>Group</th>
          </tr>
          </thead>
          <tbody>
          {/* {supervisor.map ((Pdetails,i) => {
            console.log(Pdetails)
            return(
            <tr>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">{i+1}</td>
              <td className="py-4 px-6 font-medium text-white whitespace-nowrap dark:text-white font-sans">{Pdetails.tafDetails.GroupID}</td>
            </tr>
            )
          })} */}
          </tbody> 

        </table>
      {/* { console.log(supervisor[0].tafDetails[0].groupID)} */} 
          {/* {supervisor.map ((Super,i) => {
            // console.log(Super[0][1][1])
            return(
                
                <tr>
                  <td></td>
                </tr>
                
              )
            })}
         </table> */}

        </div>


      </div>   
      {/* :null
      } */}

</div>
    {console.log(staffID)}

</div>
    
    
    
    
  )
}
export default SupervisorViewBidding;




   
  // need to link group id to relevent group profiles