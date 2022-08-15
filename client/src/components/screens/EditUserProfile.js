import { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
import Swal from 'sweetalert2'

const EditUserProfile = ({history}) => { 
  const Swal = require('sweetalert2')
  const [fetchFeedbackData, setFeedbackData] = useState("")
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
  const [personalAddress, setPersonalAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {

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

    const fetchFeedbackData = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/userprofilemanagement",userprofileconfig);
       
        setFeedbackData(data.data);
        
      } catch (error) {

        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchFeedbackData()
    fetchPrivateDate()
  }, [history]);

  const fileChangeHandler = (e) => {
    setFileData(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    // Handle File Data from the state Before Sending
    const data = new FormData();

    data.append("image", fileData);

    fetch("http://localhost:5000/single", {
      method: "POST",
      body: data,
    })
      .then((result) => {
        console.log("File Sent Successful");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const editprofilehandler = async (e) => {
    e.preventDefault();

    const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

    try {
        
        

      const { data1 } = await axios.put(
        "/api/student/edituserprofile",
        {personalAddress,phoneNumber},
        userprofileconfig
      );

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
        title: 'You Have Successfully Updated Your User Profile!'
      })



      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };


  

  
  return  error ? ( 
    
    <span className="error-message">{error}</span>
  
  ) :
  (
    
<div className="userprofileClass">
  <Header/>
  <br/>
      <h1 id="userprofilecaption">Edit My Profile</h1>
      
      
      <div className="userprofileBox77">
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Bio</h2>
        <p className="userprofilecontent1"> User Email: &nbsp;&nbsp;&nbsp;{fetchFeedbackData.email}</p> 
        <p className="userprofilecontent2"> Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.username}</p> 
        <p className="userprofilecontent1"> Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.address}</p> 
        <p className="userprofilecontent2"> Phone Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.phoneNumber}</p> 
       
        <p className="userprofilecontent2"> {personalAddress}</p> 
        <p className="userprofilecontent2"> {phoneNumber}</p> 
      </div>
      <br/>
        {/* <form action="/single" method="POST" enctype="multipart/form-data">
        <input type="file" name="image"/>
        <button type="submit">Submit</button>
        </form> */}

{/* <img src="images/Hamster.jpg"/> */}





     
      <form onSubmit={editprofilehandler} id="submissionForm" className="EditFormProfile">
      <label className="AddressNames">Address</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" 
          className = "input" style={{color:"white",borderColor:"royalblue"}}
          name="name" 
          onChange={(e) => setPersonalAddress(e.target.value)}
          value={personalAddress} />
          

    <label className="PhoneNames">Phone Number</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input type="text" 
          className = "input" style={{color:"white",borderColor:"royalblue"}}
          name="name" 
          onChange={(e) => setPhoneNumber(e.target.value)}
          value={phoneNumber} />
        
        <button type="submit" className="btn btn-success" id="editUserButton">
          Submit
        </button>

      </form>
   
      
     
      {/* <Footer/> */}
</div>
 
    
)  
};

export default EditUserProfile;
