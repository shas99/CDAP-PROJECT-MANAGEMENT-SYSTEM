import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
// import "./StudentTopicRegistrationForm.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileArrowDown } from '@fortawesome/free-solid-svg-icons'
import "./SubmissionScreen.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const StaffReport = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    // const [fetchGroupData, setGroupData] = useState("")
    // const [suggestions,setsuggestions] = useState("")
    const [Topic, setTopic] = useState("");
    const [groupID, setgroupID] = useState("");
    const [topicdescription, settopicdescription] = useState("");
    const [abstract, setabstract] = useState("");
    const [researchProblem, setresearchProblem] = useState("");
    //image upload to s3
    const [file, setFile] = useState()
    const [description,setDescription] = useState("")
    const [images,setImages] = useState([])

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
  
  
  
      fetchPrivateDate();
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
            { groupID,Topic,topicdescription,abstract,researchProblem},
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

     const download = e => {
      console.log(e.target.href);
      fetch(e.target.href, {
        method: "GET",
        headers: {}
      })
      .then(response => {
        response.arrayBuffer().then(function(buffer) {
          const url = window.URL.createObjectURL(new Blob([buffer]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "report.pdf"); //or any other extension
          document.body.appendChild(link);
          link.click();
        });
      })
      .catch(err => {
        console.log(err);
      });
      
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
        
           <h1 id="caption">Report 01</h1>
           <br/>
           
          <div className="group-screen">
            {/* file upload */}
            {/* <form onSubmit={submit}>
                <input onChange={fileSelected} type="file"></input>
                <input value={description} onChange={e => setDescription(e.target.value)}type="text"></input>
                <button type="submit">Submit</button>

            </form> */}

            

      
          <form onSubmit={groupregisterHandler} className="group-screen__form">

          {images.map( image=>(
                <div key={image}>
                    <img src={image}></img>
                    </div>))}

              <a
        href="/images/e50aa1b8426b24445c4132fc849645a7"
        download
        onClick={e => download(e)}
      >
        <br/>
      <FontAwesomeIcon icon={faFileArrowDown} /> Download File
      </a>
      <br/><br/>
      <h3 className="login-screen__title">Add Feeback and Marks</h3>
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
       
        
          </div>
          
        
          </div>    



      <button type="submit" className="btn btn-primary1" id="Log1Button">
          Submit!
        </button>

        
      </form>
          </div>
      
          <Footer/>
        </div>
        </>
      );
    };
    
    export default StaffReport;