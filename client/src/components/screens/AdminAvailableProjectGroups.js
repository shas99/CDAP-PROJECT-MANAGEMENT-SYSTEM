import '../../styles/main.css';
import { useState, useEffect } from "react";
import axios from "axios";
import SideNavigationBar from '../AdminNavigationBar/AdminNavigationBar';


const pageSize = 10;

const AdminAvailableProjectGroups = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
  const [numPages, setNumPages] = useState(0);
  const [renderingArray, setRenderingArray] = useState([]);

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
        setNumPages(Math.ceil(array.length / pageSize));
        setRenderingArray(array.slice(0, pageSize));
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

 const changePage = (e) => {
  const page = e.target.innerText;
  // alert(page);

  // set the renderingarray from page-1 * pageSize to page * pageSize of ProjectData
  setRenderingArray(ProjectsData.slice((page - 1) * pageSize, page * pageSize));
};
 



  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    
    <div className='w-full-screen' style={{backgroundColor:"#22272E"}}>
      {/* <Header/> */}
      <div className="overflow-hidden text-gray-300 sticky float-left">
        <SideNavigationBar page="AdminStudentGroups"/>
       </div>
       <div className="text-gray-300  flex flex-col">
           {/* <br/><ul>{projectitems}</ul>  */}<br/>
           <div className=' box-border w-80%  top-0'>
      <h1 id="caption" className="text-center " >All Groups
  
    &nbsp;    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;
    &nbsp;

    <a href={`/report`}>
      <button  className="py-2 px-3  text-sm font-medium text-center text-white bg-blue-700  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">Generate full report</button>
    </a>
      </h1><br></br><hr/><br/>
      </div>
          {/* number of pages */}
          <div style={{ display: 'flex', flexDirection: 'row' }}>
  {Array.from(Array(numPages).keys()).map((x) => (
    <div key={x} className="flex justify-center">
      <button
        className="bg-gray-700 text-white font-bold py-2 px-4 rounded"
        onClick={changePage}
      >
        {x + 1}
      </button>
      &nbsp;
    </div>
  ))}
</div>
        <div className='grid grid-cols-3 gap-1'>

         
        {renderingArray.map(project => {
          return (
          
      <div className="p-6 max-w-xl mt-10 bg-gray-700 rounded-lg border border-gray-800 shadow-md dark:bg-gray-800 dark:border-gray-700" >
              <center><p className='mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white'>{project.name}</p></center>
            <div className='mb-3 font-normal text-gray-200 dark:text-gray-400 ml-[4rem]'>
                        
                          <li ><b>Member 1</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_1}</li> 
                          <li><b>Member 2</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_2}</li> 
                          <li><b>Member 3</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_3}</li>
                          <li ><b>Member 4</b>:&nbsp;&nbsp;&nbsp;&nbsp;{project.member_4}</li>
                          <li ><b>Member 5</b>: &nbsp;&nbsp;&nbsp;&nbsp;{project.member_5}</li> <br/>
                          <div className="placeBidToBtn" > <a href={`/adminViewGroup/${project._id}`} className=" ml-[3.5rem] inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">View Group</a></div>
                          <br/>
            </div>
   
      </div>
                )
         
        })} 
       
      </div>
      <br/>
      
      <br/>
     
      <br/><br/>
    


      <br/>
    </div>

</div>
    
    
    
    
  )
}
export default AdminAvailableProjectGroups;




   
  