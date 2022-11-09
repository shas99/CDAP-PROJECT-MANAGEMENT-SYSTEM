import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../StaffSideNavigationBar/StaffSideNavigationBar';
import Header from "../Header/Header";
import './StaffAvailableProject.css'
import e from 'cors';


const ViewAvailableProjectsStaff = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
  const [handleSearchArea, useHandleSearchArea] = useState("");
  const [searchtext, setSearchText] = useState("");
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

    

    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/group/viewgroups",projectsconfig);
        console.log(data)
        //console.log(typeof data.data);
        const array = Object.entries(data.data)
        setProjectsData(data.data);
       // console.log(array);

        // console.log(ProjectsData)
        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        
      }
    
    }


    fetchProjectsData()
    fetchPrivateDate()
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

 const searchBox = (e) =>{

  setSearchText(e.target.value)
 }

  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div style={{backgroundColor:"#22272E"}}>
      <Header/>
      <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="StudentGroups"/>
        </div>

    <div className="col-lg-3 mt-2 mb-2" id="searchingBox" style={{marginTop:"-750px"}}>
    
    {/* change the value of the variable when something is type in */}
    <input
    className="form-control"
    id = "groupSearch"
    type="search"
    placeholder="Search By Group ID"
    name="searchQuery"
    onChange={searchBox}>
    
    </input>


  </div>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption" className="">All Groups</h1>
      <br/><br/>
{searchtext}
    
        
         <ul>
        {ProjectsData.map(project => {

          if (typeof project.batch === 'string') {
            console.log(project.batch)
          if(project.batch.includes(searchtext)){
          return (
            <div className="lg:w-1/5 h-auto bg-gray-900 mb-3 pt-1 pb-5 text-white rounded-lg hover:bg-gray-800 inline-block" style={{marginLeft:"195px"}}>
        <center><p className="bg-gray-600 py-3 rounded-lg">{project.batch}</p></center>
      <div >
                   
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 1</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_1}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 2</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_2}</li> 
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 3</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_3}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 4</b>:&nbsp;&nbsp;&nbsp;&nbsp;{project.member_4}</li>
                    <li className="markscontent" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",margin:"7px",textAlign:"center"}}><b>Member 5</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_5}</li>
                    <div className="placeBidToBtn" style={{fontWeight:"bold",backgroundColor:'#8256D0',width:"80px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",padding:"2px",width:"120px",textAlign:"center",margin:"0 auto"}}> <a href={`/viewgroup/${project._id}`}>View Group</a></div>
      </div>
      </div>
            
          )
          }
          }
        })} 
      </ul>  
      <br/>
      
      <br/>
     
      <br/><br/>
    


      <br/>
    

</div>
    
    
    
    
  )
}
export default ViewAvailableProjectsStaff;




   
  