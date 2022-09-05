import { useState, useEffect } from "react";
import axios from "axios";
import "./EditProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
import Swal from 'sweetalert2';
//import PasswordChecklist from "react-password-checklist"//validate phone
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";

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
    
<div className="userprofileClass" style={{height:"1050px"}}>
  <Header/>
  <SideNavigationBar page="UpdateProfile"/>
  <br/>
      
      
  <div className="ml-[24rem] mt-[-50rem] lg:w-3/5 h-auto mb-30rem">
      <div className="h-auto pr-10 pt-5 pb-10 bg-gray-900	 text-white shadow-xl shadow-grey-900">

{/* updated by pasindu vinod 02/09/2022 */}
      <h2 id="userprofilecaption" className="mt-3">Bio</h2>

      <form onSubmit={editprofilehandler} id="submissionForm" className="EditFormProfile">

      <table className="mt-10 lg:w-5/5 m-auto border-none">

      
      <tr className="py-3 border-none"><td className="py-3 px5 border-none text-left"> User Email:</td><td className="py-3 border-none text-left pl-16">{fetchFeedbackData.email}</td></tr> 
      
      <tr className="py-3 border-none"><td className="py-3 border-none text-left "> Username:</td><td className="py-3 border-none text-left pl-16">{fetchFeedbackData.username}</td></tr>
      
      <tr className="py-3 border-none "><td className="py-3 border-none text-left "> Address:</td><td className="py-3 border-none text-left pl-16 pt-6"> <input type="text" 
          className = "" style={{color:"white",borderColor:"royalblue",width:"300px",borderRadius:"5px"}}
          name="name" 
          required
          //defaultValue={fetchFeedbackData.address}
          placeholder={fetchFeedbackData.address}
          onChange={(e) => setPersonalAddress(e.target.value)}
          value={personalAddress} /></td></tr> 
      
      <tr className="py-3 border-none"> <td className="py-3 border-none text-left ">Phone Number:</td><td className="py-3 border-none text-left pl-16"> 
          <input type="text" 
          className = "" style={{color:"white",borderColor:"royalblue",width:"300px",borderRadius:"5px"}}
          name="name" 
          required
          placeholder={fetchFeedbackData.phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          pattern="^-?[0-9]\d*\.?\d*$"
          maxLength = "10"
          value={phoneNumber} /></td>
      </tr>

          <tr className="py-3 border-none ">
            <td className="py-3 border-none text-left ">
              <a href={`/userprofile`}>
                <button type="button" className="mt-5 focus:outline-none text-white bg-blue-800 hover:bg-blue-900 focus:ring-2 focus:ring-blue-800 font-medium rounded-lg text-sm px-7 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-900">
                  Back
                </button>
              </a>
            </td>
            <td className="py-3 border-none text-right">
              <button type="submit" className="mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-300 font-medium rounded-lg text-sm px-7 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900" id="">
              Update
              </button>
            </td>
          </tr> 
      </table>

      </form>

      </div>
      
      <br/>
      





     {/* <div className="ml-[2rem]">
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
        
        <div className="ml-[8rem]">
        <button type="submit" className="btn btn-success ml-[10rem]" id="editUserButton">
          Submit
        </button>
        </div>
      </form>
      </div> */}
   
      
     
     
      </div>
</div>
 
    
)  
};

export default EditUserProfile;
