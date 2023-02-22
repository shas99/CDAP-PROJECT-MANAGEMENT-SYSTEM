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
  const [existingForm, setExistingForm] = useState([]);
  const [feedbackData, setFeedbackData] = useState([])
  const [status, setStatus] = useState([]);
  const [heading, setHeading] = useState([]);
  const [groupHeading, setGroupHeading] = useState([]);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

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

   
    const id = ID
    const { data} = await axios.get("/api/STDAvailableSubmissions/viewSpecificSubmissionStudentID",{params:{id:id}}, config);
    setForm(data.data)


  
  
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
//fetch all the forms alredy completed by the group
    const fetchFeedbackData = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
     
        const {data} = await axios.get("/api/STDAvailableSubmissions/staffStatus",{params:{id:ID}},userprofileconfig);
     
        setFeedbackData(data.data);
        // console.log(data.data[0].Heading)
        // let tempfeedbackData = data.data[0].Heading;
        // try{
        // const {data1} = await axios.get(
        //   "/api/staff/statusArray",
        //   {params: {tempfeedbackData}, },
        // );
        // console.log(data1+"data1.data")
        // setStatus(data1);

        // }catch(error){
        //   console.log(error)
        // }
        var temp = []
        for(let i=0;i<data.data.length;i++){
          temp.push(data.data[i].Heading)
          
        }

   
        setExistingForm(temp);
        
      } catch (error) {
        console.log(error)

      }
    };
//fetches all the forms that are completed by the group
    const fetchGroupHeading = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
     
        const {data} = await axios.get("/api/STDAvailableSubmissions/GetGroupHeading",{params:{id:ID}},userprofileconfig);
      
        setGroupHeading(data.data);






        
      } catch (error) {
        console.log(error)

      }
    };


  

    fetchGroupHeading()
    fetchFeedbackData()


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
  
    const result = await postImage({images: file,description})
    setImages([result.image, ...images])
}

const fileSelected = event => {
    const file = event.target.files[0]
    setFile(file)
}

const download = e => {

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


//retreives and displays the stauts of each form
const Status =  () => {
  try{
  let x = [];



  for(var i=0;i<existingForm.length;i++){

    if(groupHeading.includes(existingForm[i])){
    
      x.push(<p className="text-sm text-white">{existingForm[i]} : completed</p>)
    }
    else{
      x.push(<h1 className="text-sm text-white">{existingForm[i]} : not completed</h1>)
     
    }
    
  }
{console.log(existingForm)}
{console.log("existingform")}
{console.log(groupHeading)}
{console.log("groupheading")}
 return x
  setStatus(x);
}catch(error){
  console.log(error)
}

}


const sendEmail = async (e) => {
  e.preventDefault();
  alert(subject)
  alert(message)
  

  // get all the students
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    //send message using the body to the api
    const { data } = await axios.post(
      "/api/STDAvailableSubmissions/sendEmail",
      {subject,message},
      config
    );

  }
  catch (error) {
    console.log(error)
  }

}

  return (
    <div className="bg-gray-900 h-[70rem]">
      <h2 id="caption">{name}</h2>
      <br/>
      <div className="w-100% m-auto">


  <div class="flex flex-row max-w-6xl text-gray-200 bg-gray-800 rounded-sm border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 m-auto">

    <div className="">
    <a href="#">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-200 dark:text-white ml-[4rem]">Group Members </h5>
    </a>
    <p class="mb-3 font-normal text-gray-200 dark:text-gray-400">

    <ul className="ml-[7rem]">
        <li style={{color:"white"}}>{member1}</li>
        <li>{member2}</li>
        <li>{member3}</li>
        <li>{member4}</li>
        <li>{member5}</li>
        </ul>
    </p>
</div>
<div className="ml-[5rem] border border-gray-300 w-full">
    <h5 class="text-2xl font-bold tracking-tight text-gray-200 dark:text-white ml-[5rem]">View Reports </h5><br/>
    <ul className="text-sm ml-[4rem] text-gray-700 ">{Status()}</ul> <br/>
    {forms.map((form) =><div> <br/><button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " > <a href={`/viewStaffForm/${form._id}`}>{form.heading}</a></button></div>)}
       <br/><br/>
</div>

       
{/* form to get details message and subject */}
<div className="ml-[5rem] border border-gray-300 w-full" style={{margin:20}}>
    <h5 class="text-2xl font-bold tracking-tight text-gray-200 dark:text-white ml-[5rem]" style={{margin:20}}>Send Message </h5><br/>
    <form className="ml-[4rem]">
    <div className="flex flex-col" style={{margin:20}}>
    <label className="text-sm text-gray-700">Subject</label>
    <input type="text" className="w-96 h-10 px-3 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" placeholder="Subject" onChange={(e) => setSubject(e.target.value)} />

    <label className="text-sm text-gray-700">Message</label>
    <textarea className="w-96 h-20 px-3 py-2 text-base text-gray-700 placeholder-gray-600 border rounded-lg focus:shadow-outline" placeholder="Message" onChange={(e) => setMessage(e.target.value)}></textarea>
    
    <button className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700  rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " onClick={sendEmail}>Send</button>
    </div>
    </form>
</div>
</div>     
         
        
       
     </div>
    </div>
  );
};



export default ViewGroup;
