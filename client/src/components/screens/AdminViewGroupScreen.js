import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import PasswordChecklist from "react-password-checklist"//password validation
import { useEffect } from "react";
// import "./StaffviewGroup.css"

const AdminViewGroup = ({ history, match }) => {
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
  const [batchID,setbatchID] = useState("")
  const [marks,setMarks] = useState({})
  const [file, setFile] = useState()
  const [description,setDescription] = useState("")
  const [images,setImages] = useState([])

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
          setbatchID(batchID => data.data.batch)
        console.log(data);
        setSuccess(data.data);
      } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
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

const retreiveMarks = async () => {
  //get request to backend with body
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };



    const { data } = await axios.post(
      `/api/MarkingRubrik/getSelectedRubrics/`,
      {
        batchID,groupid:"628db5bc8fcfac348c624a34"
      }
    );

      console.log(data.data)
      //render the object from data.data to the screen

  setMarks(marks => data.data)
}



  return (
    <div className="viewgroupscreen">
      <h2 id="caption">{name}</h2>
      <div id="container">
       
        <h2 style={{fontSize:"25px", marginLeft:"-400px", fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Group members</h2><br/>
        <ul>
        <li style={{color:"white",fontSize:"25px",marginLeft:"-400px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{member1}</li>
        <li style={{color:"white",fontSize:"25px",marginLeft:"-400px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{member2}</li>
        <li style={{color:"white",fontSize:"25px",marginLeft:"-400px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{member3}</li>
        <li style={{color:"white",fontSize:"25px",marginLeft:"-400px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{member4}</li>
        <li style={{color:"white",fontSize:"25px",marginLeft:"-400px",fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>{member5}</li>
        </ul>
       
          {/* <form onSubmit={submit}>
                <input onChange={fileSelected} type="file"></input>
                <input value={description} onChange={e => setDescription(e.target.value)}type="text"></input>
                <button type="submit"  className="btn1">Upload Resource</button>

          </form> */}

            
       
       <br/><br/>
         <h2 style={{fontSize:"25px",marginTop:"-299px",marginRight:"-400px", fontFamily:"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>View Reports</h2>
         <br/>
         {images.map( image=>(
                <div key={image}>
                    <img src={image}></img>
                    </div>))}

          <div className="rounded-md shadow-sm">
          {/* <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{marginLeft:"450px"}}><a
          href={`/images/${key}`}
          download
          onClick={e => download(e)}>
          <i className="fa fa-download" />
          Milestone 1
          
          </a></button>
          &nbsp;
         {images.map( image=>(
                <div key={image}>
                    <img src={image}></img>
                    </div>))}

                    
          <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" ><a href="#">
          <i className="fa fa-download" />
          Milestone 2
          
          </a></button>&nbsp;
          <button className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:focus:ring-yellow-900" style={{marginLeft:"450px"}}><a href="#">
          <i className="fa fa-download" />
          Milestone 3
          
          </a></button>
          <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" ><a href="#">
          <i className="fa fa-download" />
          Milestone 4
          
          </a></button>
          <button className="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 mr-2 mb-2" style={{marginLeft:"450px"}}><a href="#">
          <i className="fa fa-download" />
          Milestone 5
          
          </a></button> */}
       <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"><a href="/adminAssignStaff">

      Assign Staff
      {/* ****************IMPORTANT************************* */}
      {/* Potential Security Vulnerability */}
      {/* Once database refinement is complete make sure to change this so that ID doesn't save in localStorage */}
          {localStorage.setItem("groupId",match.params.id)}


          </a></button>
<br/><br/>
          
          {/* redirect to /marking:id using Link */}
          <Link to={{pathname:`/marking/${match.params.id}`,state:{id:batchID}}}><button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-7 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Marking</button></Link>

          {/* button to view marks*/}
          <br/>
          <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" style={{marginLeft:"450px"}} onClick={retreiveMarks}>View marks</button>
          {/* {marks} */}
          {/* render the object */}
          {Object.keys(marks).map((key) => {
              return <div key={key}>
                  <p>{key} : {marks[key]}</p>
              </div>
          })}
          </div>
       <br/><br/>
     </div>
    </div>
  );
};

export default AdminViewGroup;