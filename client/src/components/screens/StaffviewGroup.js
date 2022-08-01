import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import PasswordChecklist from "react-password-checklist"//password validation
import { useEffect } from "react";
import "./StaffviewGroup.css"
import {useParams} from 'react-router-dom';

const ViewGroup = ({ history, match }) => {
  //const [password, setPassword] = useState("");
  //const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  //const [logged,setlogged] = useState("")
  //const [email, setEmail] = useState("");
  const [name,setName] = useState("")
  const [member1,setmember1] = useState("hello")
  const [member2,setmember2] = useState("")
  const [member3,setmember3] = useState("")
  const [member4,setmember4] = useState("")
  const [member5,setmember5] = useState("")
  const [key,setKey] = useState("")

  const [file, setFile] = useState()
  const [description,setDescription] = useState("")
  const [images,setImages] = useState([])
  const [forms,setForm] = useState([])
  const [ID,setID] = useState(useParams().id)
  useEffect(() => {
    const resetPasswordHandler = async (e) => {

      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
       
        const { data } = await axios.get(
          `/api/group/viewgroup/${match.params.id}`,
          {
  
          },
          config
        );
          setName(data.data.name)
          setmember1(data.data.member_1)
          setmember2(data.data.member_2)
          setmember3(data.data.member_2)
          setmember4(data.data.member_4)
          setmember5(data.data.member_5)
          setKey(data.data.key)
        console.log(data);
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };

        const retreiveform = async (e) => {
     
      try{

        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };

    console.log(ID+"12312312313131")
    const id = ID
    const { data} = await axios.get("/api/STDAvailableSubmissions/viewSpecificSubmissionStudentID",{params:{id:id}}, config);
    setForm(data.data)
    console.log(data.data);

  
  
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    retreiveform()
    resetPasswordHandler()
  }, [history]);

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

  return (
    <div className="viewgroupscreen">
      <h2 id="caption">{name}</h2>
      <div id="container">
       
        <h2 style={{fontSize:"22px"}}>Group members</h2><br/>
        <ul>
        <li style={{color:"white"}}>{member1}</li>
        <li>{member2}</li>
        <li>{member3}</li>
        <li>{member4}</li>
        <li>{member5}</li>
        </ul>
       
          {/* <form onSubmit={submit}>
                <input onChange={fileSelected} type="file"></input>
                <input value={description} onChange={e => setDescription(e.target.value)}type="text"></input>
                <button type="submit"  className="btn1">Upload Resource</button>

          </form> */}
        
          
        {console.log(ID+"this is ID")}
       
       <br/><br/>
         <h2 style={{fontSize:"22px"}}>View Reports</h2>
         <br/>
         {images.map( image=>(
                <div key={image}>
                    <img src={image}></img>
                    </div>))}

  
          {/* <button className="btn2"><a
          href={`/images/${key}`}
          download
          onClick={e => download(e)}>
          <i className="fa fa-download" />
          Milestone 1
          
          </a></button> */}
          <br/>
         {images.map( image=>(
                <div key={image}>
                    <img src={image}></img>
                    </div>))}

  
          {/* <button className="btn2" style={{backgroundColor:"gray"}}><a href="#">
          <i className="fa fa-download" />
          Milestone 2
          
          </a></button><br/>
          <button className="btn2" style={{backgroundColor:"gray"}}><a href="#">
          <i className="fa fa-download" />
          Milestone 3
          
          </a></button><br/>
          <button className="btn2" style={{backgroundColor:"gray"}}><a href="#">
          <i className="fa fa-download" />
          Milestone 4
          console.log("Hello World!")
          </a></button><br/>
          <button className="btn2" style={{backgroundColor:"gray"}}><a href="#">
          <i className="fa fa-download" />
          Milestone 5
         
          </a></button> */}

          {forms.map((form) =><div> <button className="btn2" style={{backgroundColor:"blue"}}> <a href={`/viewStaffForm/${form._id}`}>{form.heading}</a></button></div>)}
         
       <br/><br/>
       
     </div>
    </div>
  );
};



export default ViewGroup;
