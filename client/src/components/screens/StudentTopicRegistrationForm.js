import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./StudentTopicRegistrationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Swal from 'sweetalert2'
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

const TopicRegistration = ({history}) => {
    const Swal = require('sweetalert2')
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    // const [suggestions,setsuggestions] = useState("")
    const [Topic, setTopic] = useState("");
    const [groupID, setgroupID] = useState("");
    const [topicdescription, settopicdescription] = useState("");
    const [abstract, setabstract] = useState("");
    const [researchProblem, setresearchProblem] = useState("");
    const [solution, setsolution] = useState("");
    const [systemOverview, setsystemOverview] = useState("");

    const [objective, setobjective] = useState("");
    const [projecttask, setprojecttask] = useState("");
    const [technologies, settechnologies] = useState("");
    const [batchID,setBatchID] = useState("")
    const [projectID, setProjectID] = useState("")
    const [batchType, setBatchType] = useState("");
    //const [enable, setEnable] = useState(false);

    const [enableBid, setEnableBid] = useState(false);
    const [group,setgroup] = useState("")
    const [fetchGroupData, setGroupData] = useState("");
    
    const [supervisorName, setSupervisorName] = useState([]);
    //const [supervisorName, setSupervisorName] = useState([]);
    //const [selectedSupervisors,setSelectedSupervisors] = useState([]);

    const [SupervisorArr,setSupervisorArr] = useState([]);
    useEffect(() => {
        const fetchGroupData = async () => {
            const groupconfig = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              },
            };
      
            try {
              const { data} = await axios.get("/api/auth/group",groupconfig);
              const groupArray = data.data.split("/")
              console.log(groupArray[0])
              const group1 = groupArray[0].split(",")
              setgroup(group1)
              setGroupData(groupArray[0]);
            } catch (error) {
      
              // setError("Oops couldn't retreive group data");//fix this
            }
          };
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
          setgroupID(data.data4);
          const batch = data.data5
          const b = batch.split("-");
          //console.log(b+"batch")
          if(b[1]=="Reg" || b[1]=="reg"){
            setBatchType(6);
            
          }
          else if(b[1]=="June" || b[1]=="june"){
            setBatchType(2);
          };
           
          console.log("Group ID: ",groupID)
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

          console.log(array)
          
        }
        catch(error){}
      };

      // const fetchGroupID = async () => {
      //   const conf = {
      //     headers: {
      //       "Content-Type": "application/json",
      //       Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //     },
      //   };


      //   const ab = localStorage.getItem("authToken")
      //   try{
      //     const { data} = await axios.get("/api/private/getGroupID",{params: {ab}}, conf);   
      //     setgroupID(data.data);

      //   } catch (error) {
      //     setError("Error");
      //   }

      // };
  


    //   fetchGroupData()

      fetchPrivateDate();
      fetchGroupData();
      fetchAvailableSupervisors()
      // fetchGroupID()
    }, [history]);
  
    //Logout feature
    const logOutHandler=()=>{
      localStorage.removeItem("authToken");
      history.push("/login");
  
    };
    
    const groupregisterHandler = async (e) => {
        e.preventDefault();
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
        
        if(groupID != "" && Topic != "" && topicdescription != "" && abstract != "" && researchProblem != "" && solution != "" && systemOverview != "" && objective != "" && projecttask != "" && technologies != ""){
          try {
            const { data } = await axios.post(
              "/api/group/topicregister",
              { groupID,Topic,topicdescription,abstract,researchProblem,solution,systemOverview,objective,projecttask,technologies },
              config
            );
            //alert("Successfully Submited! "+data.data)
            setProjectID(data.data)
            setEnableBid(true)
            const Toast = Swal.mixin({
              toast: true,
              position: 'top-end',
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
              }
            })
            
            Toast.fire({
              icon: 'success',
              title: 'You Have Successfully Posted A Topic Registration Form'
            })
      
            //history.push("/");
          } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
              setError("");
            }, 5000);
          }
        }else{
          alert("One or more fields empty")
        }
        
      };

      // Submit form
      const SubmitBidding = async (e) => {
        e.preventDefault();  
       const pconfig = {
         header: {
           "Content-Type": "application/json",
         },
       };
       try {
         //const SupervisorArr = []
         //SupervisorArr = selectedSupervisors
         const GroupID = groupID
         const BatchID = batchID
         const ProjectID = projectID
          console.log(GroupID,BatchID,ProjectID,SupervisorArr)
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
           "http://localhost:5000/api/group/supervisorBID",
           {SupervisorArr,GroupID,BatchID,ProjectID}, //projectID need to get using response of TAF submit response
           pconfig
           
         );
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
        
       } catch (error) {
         //setError(error.response.data.error);
         setTimeout(() => {
           setError("");
           //onsole.log(error)
         }, 5000);
       }
       
     };

       const updateSupervisors = (e) => { 
      if (e.target.checked) { setSupervisorArr((oldArray) => [...oldArray, e.target.value]); } 
      else { removesupervisor(e); console.log(SupervisorArr) } 
  }
  const removesupervisor = (e) => { setSupervisorArr([...SupervisorArr.filter((supervisor) =>
     supervisor !== e.target.value)]) }

      
  
    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back">

        <Header/>
        <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="StudentTopicRegistrationForm"/>
       </div>
       
        {/* <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  */}

        &nbsp;&nbsp;&nbsp;&nbsp;
       
        

        {/* <button onClick={logOutHandler} id="logout">Log Out</button> */}
          {/* </p> */}
        
          
          {/* <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p> */}
        
           
           <br/>
           
      
          
    <div className="studentTopicgroup-screen" style={{marginTop:"-675px"}}>
   
           <div>

         

          <form onSubmit={groupregisterHandler} className="studentTopicgroup-screen__form">
      <h3 className="studentTopic-screen__title">Topic Assessment Form</h3>
      {error && <span className="error-message">{error}</span>}
      
      <div className="form-group">
        <label className="TopicNames" style={{fontSize:"large"}}>Group Identification Number</label><br/><br/>
          <input type="text" 
          className = "input" style={{color:"white",width:"700px"}}
          name="name" 
          required
          readOnly
          onChange={(e) => setgroupID(e.target.value)}
          value={groupID} />
        
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames" style={{fontSize:"large"}}>Topic</label><br/><br/>
          <input type="text" 
          className = "input" style={{color:"white",width:"700px"}}
          name="name" 
          required
          onChange={(e) => setTopic(e.target.value)}
          value={Topic} />
        </div>
        <br/>





        <div className="form-group">
          <div className="editor">
          <label className="TopicNames" style={{fontSize:"large"}}>Topic - Describe your Topic in 100 Words!</label><br/><br/>
        <CKEditor 
        editor={ClassicEditor}
        data={topicdescription}
        onChange={(event,editor)=>{
          const data = editor.getData()
          settopicdescription(data)
        }}
        />
        <br/>
        <label className="TopicNames" style={{fontSize:"large"}}>Abstract - Use a minimum of 200 Words!</label><br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={abstract}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setabstract(data)
        }}
        />
        <br/>
        <label className="TopicNames" style={{fontSize:"large"}}>Research Problem - Must Add three main references in IEEE Format!</label><br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={researchProblem}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setresearchProblem(data)
        }}
        />
        <br/>
        <label className="TopicNames" style={{fontSize:"large"}}>Solution Proposed - Describe in a minimum of 50 Words!</label><br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={solution}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setsolution(data)
        }}
        /> 
        <br/>
        <label className="TopicNames" style={{fontSize:"large"}}>System Overview Diagram for the Solution Proposed</label><br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={systemOverview}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setsystemOverview(data)
        }}
        />
        <br/>
        <label className="TopicNames" style={{fontSize:"large"}}>Objectives - 1 main objective and 4 sub objectives:</label><br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={objective}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setobjective(data)
        }}
        />
        <br/>
      <label className="TopicNames" style={{fontSize:"large"}}>Task divided among the members:</label><br/><br/>
                <CKEditor className="cke"
        editor={ClassicEditor}
        data={projecttask}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setprojecttask(data)
        }}
        />
        <br/>
        <label className="TopicNames" style={{fontSize:"large"}}>Technologies to be used:</label><br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={technologies}
        onChange={(event,editor)=>{
          const data = editor.getData()
          settechnologies(data)
        }}
        />
        <br/>
        
          </div>
          
        {/* <label>
           Group ID:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setgroupID(e.target.value)}
          value={groupID} /> */}
          
         
          </div>
          
          <div className="form-group">


                  </div>
                  <br/>

      <button type="submit" className="btn btn-primary1" id="Log1Button">
          Submit
        </button>

      </form>
    {enableBid ?  
    <div>
      <h1 className="text-4xl text-slate-300"> Choose Your Supervisor</h1> <br/>
      <form onSubmit={SubmitBidding}>
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
        {supervisorName.map (supervisor => 
                  <tr>
                    <td className="py-4 px-6">{supervisor[1][1]}</td>
                    <td className="w-10 items-center py-4 px-8">{supervisor[1][2]}/{batchType}</td>
                    <td className="w-10 items-center py-4 px-8" >
                      <input type="checkbox" value={supervisor[1][0]} name="supervisor" onChange={(e) => {updateSupervisors(e)}}></input>
                      {/*dont want <input type="radio" value={supervisor[1][0]} name="supervisor" onChange={(e) => setSelectedSupervisors(e.target.value)}></input> */}

                    </td>
                  </tr>
                  )}

    </table>
    <button type="submit" className="btn btn-primary1" id="Log1Button">
          Submit
        </button>
    </form>
    </div>
     :null 
    }
    </div>

    
          </div>
      
          <Footer/>
          
        </div>
        </>
      );
    };
    
    export default TopicRegistration;