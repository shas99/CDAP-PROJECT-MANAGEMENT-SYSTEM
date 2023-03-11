import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';

// import dropdown.css file
import './dropdown.css';

const FullReport = ({history}) => {
    const [privateData, setPrivateData] = useState("");
    const [ProjectsData, setProjectsData] = useState([]);
    const [error, setError] = useState("");
    const [search, setSearch] = useState("");
    const [filtering, setFilter] = useState({groupID: true, projectID: true,projectName: true, supervisor: true, coSupervisor: true, groupLeader: true, groupLeaderEmail: true, member1: true, member1Email: true
    , member2: true, member2Email: true, member3: true, member3Email: true, member4: true, member4Email: true});
    const [showDropdown, setShowDropdown] = useState(false);


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


        const filter = (e) => {
          // if true set to false else set to true
          setFilter({...filtering, [e.target.name]: !filtering[e.target.name]})
        }

        const handleFilterClick = (e) => {
          console.log(showDropdown)
          setShowDropdown(showDropdown => !showDropdown);
        }

        

        return  error ? ( 
  
            <span className="error-message">{error}</span>
        ) :(
            
            <div className='w-full-screen' style={{backgroundColor:"#22272E",height: "60rem",width:"100%",overflowX:"scroll"}}>
              <div className="overflow-hidden text-gray-300 sticky float-left">
                <SideNavigationBar page="AdminStudentGroups"/>
              </div>
              <div className="text-gray-300  flex flex-col h-full-screen w-full-screen">
                <p className='text-white text-2xl text-center mt-5 mb-5'>Full Batch Report</p>

                

                {/* tick box to hide the groupid or unhide it */}
                <div className="flex flex-row justify-center">
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="groupID" checked={filtering.groupID} onClick={filter}/>
                    <label for="vehicle1"> Group ID</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="projectID" checked={filtering.projectID} onClick={filter}/>
                    <label for="vehicle1"> Project ID</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="projectName" checked={filtering.projectName} onClick={filter}/>
                    <label for="vehicle1"> Project Name</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="supervisor" checked={filtering.supervisor} onClick={filter}/>
                    <label for="vehicle1"> Supervisor</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="coSupervisor" checked={filtering.coSupervisor} onClick={filter}/>
                    <label for="vehicle1"> Co-Supervisor</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="groupLeader" checked={filtering.groupLeader} onClick={filter}/>
                    <label for="vehicle1"> Group Leader</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="groupLeaderEmail" checked={filtering.groupLeaderEmail} onClick={filter}/>
                    <label for="vehicle1"> Group Leader Email</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member1" checked={filtering.member1} onClick={filter}/>
                    <label for="vehicle1"> Member 1</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member1Email" checked={filtering.member1Email} onClick={filter}/>
                    <label for="vehicle1"> Member 1 Email</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member2" checked={filtering.member2} onClick={filter}/>
                    <label for="vehicle1"> Member 2</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member2Email" checked={filtering.member2Email} onClick={filter}/>
                    <label for="vehicle1"> Member 2 Email</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member3" checked={filtering.member3} onClick={filter}/>
                    <label for="vehicle1"> Member 3</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member3Email" checked={filtering.member3Email} onClick={filter}/>
                    <label for="vehicle1"> Member 3 Email</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member4" checked={filtering.member4} onClick={filter}/>
                    <label for="vehicle1"> Member 4</label>
                  </div>
                  <div className="flex flex-col justify-center">
                    <input type="checkbox" id="vehicle1" name="member4Email" checked={filtering.member4Email} onClick={filter}/>
                    <label for="vehicle1"> Member 4 Email</label>
                  </div>
                  </div>

                {/* <Dropdown show={showDropdown ? true : false} onClick={handleFilterClick}>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                  Filter{showDropdown ? "▲" : "▼"}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="groupID" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Group ID</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="projectID" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Project ID</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="projectName" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Project Name</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="supervisor" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Supervisor</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="coSupervisor" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Co-Supervisor</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="groupLeader" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Group Leader</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="groupLeaderEmail" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Group Leader Email</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member1" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 1</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member1Email" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 1 Email</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member2" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 2</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member2Email" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 2 Email</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member3" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 3</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member3Email" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 3 Email</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member4" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 4</label>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <input type="checkbox" id="vehicle1" name="member4Email" value="Bike" onClick={filter}/>
                    <label for="vehicle1"> Member 4 Email</label>
                  </Dropdown.Item>

                  </Dropdown.Menu>
                </Dropdown> */}

                {/* Dropdown with the input boxes */}


                <input
                  type="text"
                  placeholder='Enter Batch ID to filter'
                  onChange={(e) => setSearch(e.target.value)}/>
                {/* <button onClick={() => {searchTrigger}}>Search</button> */}

              


                <table>
                  <tr>
                  {filtering.groupID && <th>GroupID</th>}
                  {filtering.projectID && <th>Project ID</th>}
                  {filtering.projectName && <th>Project Name</th>}
                  {filtering.supervisor && <th>Supervisor</th>}
                  {filtering.coSupervisor && <th>Co-Supervisor</th>}
                  {filtering.groupLeader && <th>Group Leader</th>}
                  {filtering.groupLeaderEmail && <th>Group Leader email</th>}
                  {filtering.member1 && <th>Member 1</th>}
                  {filtering.member1Email && <th>Member 1 email</th>}
                  {filtering.member2 && <th>Member 2</th>}
                  {filtering.member2Email && <th>Member 2 email</th>}
                  {filtering.member3 && <th>Member 3</th>}
                  {filtering.member3Email && <th>Member 3 email</th>}
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




