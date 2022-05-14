import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./StudentTopicRegistrationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const Submission = ({history}) => {
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

    const [group,setgroup] = useState("")
    const [fetchGroupData, setGroupData] = useState("");
    //image upload to s3
    const [file, setFile] = useState()
    const [description,setDescription] = useState("")
    const [images,setImages] = useState([])

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
        } catch (error) {
          localStorage.removeItem("authToken");
          setError("You are not authorized please login");
        }
      };
  


    //   fetchGroupData()

      fetchPrivateDate();
      fetchGroupData()
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
    
        try {
          const { data } = await axios.post(
            "/api/group/topicregister",
            { groupID,Topic,topicdescription,abstract,researchProblem,solution,systemOverview,objective,projecttask,technologies },
            config
          );
    
    
    
          history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };


      const postImage = async (e) => {
      
        const formData = new FormData()
        formData.append("image", file)
        formData.append("description",description)

        const config = {
          header: {
            "Content-Type": "multipart/form-data",
          },
        };
    
        try {

          const { data } = await axios.post(
            "/images",
            formData,
            config
          );
            console.log("Hello")
        return data.data 
    
        //   history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
          }, 5000);
        }
      };

     const submit = async event => {
         event.preventDefault()
         console.log(file,description)
         const result = await postImage({images: file,description})
         setImages([result.image, ...images])
     }

     const fileSelected = event => {
         const file = event.target.files[0]
         setFile(file)
     }

      
  
    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back">
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
           <h1 id="caption">Project Topic Assessment</h1>
           <br/>
           
      


          
          <div className="group-screen">
            {/* file upload */}
            <form onSubmit={submit}>
                <input onChange={fileSelected} type="file"></input>
                <input value={description} onChange={e => setDescription(e.target.value)}type="text"></input>
                <button type="submit">Submit</button>

            </form>

            {images.map( image=>(
                <div key={image}>
                    <img src={image}></img>
                    </div>))}





              {/* <img src="/images/8b22480d56c25572f3a2387faab41f87"></img> */}













          <div>        
          <form onSubmit={groupregisterHandler} className="group-screen__form">
      <h3 className="login-screen__title">Topic Assessment Form</h3>
      {error && <span className="error-message">{error}</span>}
      
      <div className="form-group">
        <label className="TopicNames">Group Identification Number</label>
          <input type="text" 
          className = "input" style={{color:"black"}}
          name="name" 
          onChange={(e) => setgroupID(e.target.value)}
          value={groupID} />
        
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">Topic</label>
          <input type="text" 
          className = "input" style={{color:"black"}}
          name="name" 
          onChange={(e) => setTopic(e.target.value)}
          value={Topic} />
        </div>
        <br/>





        <div className="form-group">
          <div className="editor">
          <label className="TopicNames">Topic - Describe your Topic in 100 Words!</label>
        <CKEditor 
        editor={ClassicEditor}
        data={topicdescription}
        onChange={(event,editor)=>{
          const data = editor.getData()
          settopicdescription(data)
        }}
        />
        <br/>
        <label className="TopicNames">Abstract - Use a minimum of 200 Words!</label>
                <CKEditor
        editor={ClassicEditor}
        data={abstract}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setabstract(data)
        }}
        />
        <br/>
        <label className="TopicNames">Research Problem - Must Add three main references in IEEE Format!</label>
                <CKEditor
        editor={ClassicEditor}
        data={researchProblem}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setresearchProblem(data)
        }}
        />
        <br/>
        <label className="TopicNames">Solution Proposed - Describe in a minimum of 50 Words!</label>
                <CKEditor
        editor={ClassicEditor}
        data={solution}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setsolution(data)
        }}
        /> 
        <br/>
        <label className="TopicNames">System Overview Diagram for the Solution Proposed</label>
                <CKEditor
        editor={ClassicEditor}
        data={systemOverview}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setsystemOverview(data)
        }}
        />
        <br/>
        <label className="TopicNames">Objectives - 1 main objective and 4 sub objectives:</label>
                <CKEditor
        editor={ClassicEditor}
        data={objective}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setobjective(data)
        }}
        />
        <br/>
      <label className="TopicNames">Task divided among the members:</label>
                <CKEditor className="cke"
        editor={ClassicEditor}
        data={projecttask}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setprojecttask(data)
        }}
        />
        <br/>
        <label className="TopicNames">Technologies to be used:</label>
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
          Submit!
        </button>

        
      </form></div>
          </div>
      
          <Footer/>
        </div>
        </>
      );
    };
    
    export default Submission;