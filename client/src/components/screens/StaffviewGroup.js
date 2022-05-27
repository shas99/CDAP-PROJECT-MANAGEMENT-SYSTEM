import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PasswordChecklist from "react-password-checklist"//password validation
import { useEffect } from "react";


const ViewGroup = ({ history, match }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [logged,setlogged] = useState("")
  const [email, setEmail] = useState("");
  const [member1,setmember1] = useState("hello")
  const [member2,setmember2] = useState("")
  const [member3,setmember3] = useState("")
  const [member4,setmember4] = useState("")
  const [member5,setmember5] = useState("")
  const [key,setKey] = useState("")

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
    <div className="resetpassword-screen">
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


              {/* <a href="/images/8b22480d56c25572f3a2387faab41f87" download = "file.pdf">Hello</a> */}




              {/* download try */}
              <a
        href={`/images/${key}`}
        download
        onClick={e => download(e)}
      >
        <i className="fa fa-download" />
        download
      </a><br/>
      <br/>
      <div>
      Group members<br/>
      {member1}<br/>
      {member2}<br/>
      {member3}<br/>
      {member4}<br/>
      {member5}
 </div>
    </div>
  );
};



export default ViewGroup;
