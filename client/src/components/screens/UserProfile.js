import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"

const UserProfile = ({history}) => { 
  const [fetchFeedbackData, setFeedbackData] = useState("")
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
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

  
  

  
  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :
  (

<div className="userprofileClass">
  <Header/>
  <br/>
      <h1 id="userprofilecaption">My Profile</h1>
      
      
        
        <p className="userprofilecontent1"> {fetchFeedbackData.email}</p> 
        <p className="userprofilecontent2"> {fetchFeedbackData.username}</p> 
        <p className="userprofilecontent1"> {fetchFeedbackData.address}</p> 
        <p className="userprofilecontent2"> {fetchFeedbackData.phoneNumber}</p> 

        {/* <form action="/single" method="POST" enctype="multipart/form-data">
        <input type="file" name="image"/>
        <button type="submit">Submit</button>
        </form> */}

{/* <img src="images/Hamster.jpg"/> */}


<div className="UserProfilePic">


{/* <div class="container">
      <div class="row">
        <div class="col-sm-8 mt-3">
          <h4>Node.js upload images - bezkoder.com</h4>
          <form class="mt-4"
            action="/upload"
            method="POST"
            enctype="multipart/form-data"
          >
            <div class="form-group">
              <input
                type="file"
                name="file"
                id="input-files"
                class="form-control-file border"
              />
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
      <hr />
      <div class="row">
        <div class="col-sm-12">
          <div class="preview-images"></div>
        </div>
      </div>
    </div>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
    <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script> */}
    

  

      {/* <h1 id="userprofilecaption2">Upload Your Profile Pic!</h1> */}
      <form onSubmit={onSubmitHandler} id="submissionForm">
        {/* <input type="file" id="UPPic" onChange={fileChangeHandler} />
        <br />
        <br />
        <button type="submit" className="btn btn-success" id="UpbUTTON">Submit Your Profile Pic!</button> */}
        <h1 id="userprofilecaption2">Upload Your Profile!</h1>
        <div className="btn btn-success" id="UpbUTTON" style={{fontSize:"medium",fontWeight:"bold",backgroundColor:'#8256D0',width:"170px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",marginLeft:"75px",padding:"5px"}}> <a href={`/edituserprofile/${fetchFeedbackData._id}`}>  Update Your Profile!</a></div>

      </form>
    </div>
      
     
      {/* <Footer/> */}
</div>
 
    
)  
};

export default UserProfile;
