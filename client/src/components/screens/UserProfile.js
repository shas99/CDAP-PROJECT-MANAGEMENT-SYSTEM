import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

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
      <div className="userprofileBox">
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Bio</h2>
      <p className="userprofilecontent1"> User Email: &nbsp;&nbsp;&nbsp;{fetchFeedbackData.email}</p> 
      <p className="userprofilecontent2"> Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.username}</p> 
      <p className="userprofilecontent1"> Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.address}</p> 
      <p className="userprofilecontent2"> Phone Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.phoneNumber}</p> 
      </div>
      <br/>

      <div className="userprofileBox1">
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Skills</h2>
        <button type="button" class="btn btn-primary" id="firstButt">Coding</button>
        <button type="button" class="btn btn-primary" id="secondButt">DevOps</button>
        <button type="button" class="btn btn-primary" id="thirdButt">SQL</button>
        <button type="button" class="btn btn-primary" id="fourthButt">Algorithms</button>
        <button type="button" class="btn btn-primary" id="fifthButt">Heroku</button>
        <button type="button" class="btn btn-primary" id="sixthButt">Java</button>
         
      </div>
      <br/><br/><br/><br/><br/>
      
      
      <form onSubmit={onSubmitHandler} id="submissionForm">
        
        <h1 id="userprofilecaption2">Update Your Profile!</h1>
        <div className="btn btn-success" id="UpbUTTON" style={{fontSize:"medium",fontWeight:"bold",backgroundColor:'#8256D0',width:"170px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",marginLeft:"1300px",padding:"5px"}}> <a href={`/edituserprofile/${fetchFeedbackData._id}`}>  Update Your Profile!</a></div>

      </form>
     
      <br/>
       

        {/* <form action="/single" method="POST" enctype="multipart/form-data">
        <input type="file" name="image"/>
        <button type="submit">Submit</button>
        </form> */}

{/* <img src="images/Hamster.jpg"/> */}


{/* <div className="UserProfilePic"> */}


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
    
     
      
    {/* </div> */}

    {/* <input type="file" id="UPPic" onChange={fileChangeHandler} />
        <br />
        <br />
        <button type="submit" className="btn btn-success" id="UpbUTTON">Submit Your Profile Pic!</button> */}
      
     
      {/* <Footer/> */}
</div>
 
    
)  
};

export default UserProfile;
