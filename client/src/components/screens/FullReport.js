import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';

const FullReport = ({history}) => {
    const [privateData, setPrivateData] = useState("");
    const [ProjectsData, setProjectsData] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");



    useEffect(() => {
        const fetchPrivateDate = async () => {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
      
            try {
              const { data} = await axios.get("/api/adminPrivate/adminPrivate", config);
              
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
              const{data} = await axios.get("/api/group/viewAvailableGroupsAdmin",projectsconfig);
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

          fetchPrivateDate()
          fetchProjectsData()

        }, [history])

        return  error ? ( 
  
            <span className="error-message">{error}</span>
        ) :(
            
            <div className='w-full-screen' style={{backgroundColor:"#22272E",height: "60rem",width:"100%",overflowX:"scroll"}}>
              <div className="overflow-hidden text-gray-300 sticky float-left">
                <SideNavigationBar page="AdminStudentGroups"/>
              </div>
              <div className="text-gray-300  flex flex-col h-full-screen w-full-screen">
                <p className='text-white text-2xl text-center mt-5 mb-5'>Full Batch Report</p>
                <input
                  type="text"
                  placeholder='Enter Batch ID to filter'
                  onChange={(e) => setSearch(e.target.value)}/>
                {/* <button onClick={() => {searchTrigger}}>Search</button> */}
                <table>
                  <tr>
                    <th>GroupID</th>
                    <th>Project ID</th>
                    <th>Project Name</th>
                    <th>Supervisor</th>
                    <th>Co-Supervisor</th>
                    <th>Group Leader</th>
                    <th>Group Leader email</th>
                    <th>Member 1</th>
                    <th>Member 1 email</th>
                    <th>Member 2</th>
                    <th>Member 2 email</th>
                    <th>Member 3</th>
                    <th>Member 3 email</th>
                  </tr>
                
                {ProjectsData.map(project => {
                  if(project.batch == search){
                  return (
                    <tr>
                      <td>{project.name}</td>
                      <td>{project.projectID}</td>
                      <td>{project.projectName}</td>
                      <td>{project.supervisorName}</td>
                      <td>{project.cosupervisorName}</td>
                      <td>{project.member_1}</td>
                      <td>{project.member_1}@my.sliit.lk</td>
                      <td>{project.member_2}</td>
                      <td>{project.member_2}@my.sliit.lk</td>
                      <td>{project.member_3}</td>
                      <td>{project.member_3}@my.sliit.lk</td>
                      <td>{project.member_4}</td>
                      <td>{project.member_4}@my.sliit.lk</td>
                    </tr>                  
                  )}else{
                    <p>Search batch to see data</p>
                  }
                })}
                </table>
              </div>  
            </div>
        )
}
export default FullReport;




