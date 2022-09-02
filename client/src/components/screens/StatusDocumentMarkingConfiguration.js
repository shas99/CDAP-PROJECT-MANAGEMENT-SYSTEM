import { useState, useEffect } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";
// import { Link } from "react-router-dom";
import "./StudentTopicRegistrationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { setMaxListeners } from "nodemailer/lib/xoauth2";
import Swal from 'sweetalert2'


export default function StatusDocumentMarkingConfiguration() {

    const [error, setError] = useState("");
    const [totalContribution ,setTotalContribution] = useState("");
    const[stdesc01,setstDesc01] = useState("");
    const[stdesc02,setstDesc02] = useState("");
    const[stdesc03,setstDesc03] = useState("");
    const[stdesc04,setstDesc04] = useState("");
    const[marksEn01,setmarkEn01] = useState("");
    const[marksEn02,setmarkEn02] = useState("");
    const[marksEn03,setmarkEn03] = useState("");
    const[marksEn04,setmarkEn04] = useState("");

    const statusDocumentMarkingID = "62ba94a728099fe3e5aacf54";



    //************* UPDATE PROPOSAL REPORT MARKING RUBRIK HANDLER  **********/ 
  const statusDocumentMarkingHandler = async (e) => {
    e.preventDefault();
    try {
        const { data } = await axios.put(
            `/api/markingRubrik/statusDocumentMarkingConfiguration/update/${statusDocumentMarkingID}`,
            { totalContribution, stdesc01,stdesc02,stdesc03,stdesc04,marksEn01,marksEn02,marksEn03,marksEn04 }
            );

            console.log(stdesc01)
            alert("marking report updated success")

      
     
       
    } catch (error) {
        alert("Error updating marking notset")
          
    }
  };











  return (

    <div className="bg-gray-900">  
        <Header />
        <br/> <br/>
        <h1 id="caption">Status Document Details Configuration</h1>
           <br/>
           
      
           <br/> <br/> 
    <div className="bg-gray-800 ml-[35rem] mt-[20rem]">
            
          <div className="bg-gray-900 mt-[-22rem]">        
          <form onSubmit={statusDocumentMarkingHandler} className="w-[20rem]">
      <h3 className="login-screen__title"></h3>
      {error && <span className="error-message">{error}</span>}
      
      
      <div className="form-group">
        <label className="TopicNames">Total Contribution %</label> <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setTotalContribution(e.target.value)}
          value={totalContribution} />
        </div>
        <br/>

        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 01</label><br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn01(e.target.value)}
          value={marksEn01} />
        </div>

        <br/>
        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 02</label> <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn02(e.target.value)}
          value={marksEn02} />
        </div>
        <br/>
        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 03</label>  <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn03(e.target.value)}
          value={marksEn03} />
        </div>
        <br/>
        <div className="form-group">
        <label className="TopicNames">Marks Entitled for Section 04</label>  <br/><br/>
          <input type="text" 
          className = "input" style={{color:"white"}}
          name="name" 
          onChange={(e) => setmarkEn04(e.target.value)}
          value={marksEn04} />
        </div>
        <br/>
        <center/>
        <div className="form-group">
          <div className="editor">
          <label className="TopicNames">Section 01</label>  <br/><br/>
        <CKEditor 
        editor={ClassicEditor}
        data={stdesc01}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc01(data)
        }}
        />
        <br/>

        <label className="TopicNames">Section 02</label> <br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={stdesc02}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc02(data)
        }}
        />
        <br/>
        <label className="TopicNames">Section 03</label> <br/><br/>
                <CKEditor
        editor={ClassicEditor}
        data={stdesc03}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc03(data)
        }}
        />
        <br/>
        <label className="w-[30rem] text-slate-50">Section 04</label> <br/><br/>
                <CKEditor className="section-content"
        editor={ClassicEditor}
        data={stdesc04}
        onChange={(event,editor)=>{
          const data = editor.getData()
          setstDesc04(data)
        }}
        /> 
        <br/>
       
       
          </div>
    
          </div>
          <div className="form-group">


    </div>
                  <br/>




      <button type="submit" className="ml-[5rem]" id="Log1Button">
          Submit!
        </button>
        <br/>  <br/>

        
      </form>
      </div>
          </div>

    </div>
  )
}
