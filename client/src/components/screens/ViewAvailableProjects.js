import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewAvailableProjects.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const ViewAvailableProjects = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
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

    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/AvailableProject/availableprojects",projectsconfig);
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

//  const listItems = numbers.map((number) =>    <li>{number}</li>  )
// ;
// const projectitems = ProjectsData.map((project) => 
// <li>{project}</li>
// )
  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    <div >
      <Header/>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption">All projects</h1>
      <br/><br/>
         


        
         <ul>
        {ProjectsData.map(project => {
          return (
            <div className="card">
        <center><p style={{backgroundColor: "red"}}>{project.projectName}</p></center>
      <div className="container">

            <li className="markscontent"> {project.projectName}</li>
                    <li className="markscontent"> {project.projectName}</li> 
                    <li className="markscontent"> {project.projectDescription}</li> 
                    <li className="markscontent"> {project.projectBiddingCount}</li> 
                    <li className="markscontent"> {project.publishedDate}</li>

          

      </div>
      </div>
            
          )

        })} 
      </ul>  
      <br/>
      
      <br/>
     
      <br/><br/>
    


      <br/>
    
      
</div>
    
    
    
    
  )
}
export default ViewAvailableProjects;




   
  