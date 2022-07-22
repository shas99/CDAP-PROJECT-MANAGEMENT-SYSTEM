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
  const [imageUploadData, setimageUploadData] = useState("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");
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

    const fetchImages = async () => {
      const userprofileconfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
          
        const {data} = await axios.get("/api/student/retrieveImages",userprofileconfig);
       
        setimageUploadData(data.data);
        // data.data.array.forEach(function(image) { 
        //   console.log(image.name)
        // });
      } catch (error) {
          console.log(error)
        // setError("Oops couldn't retreive group data");//fix this
      }
    };
  
    fetchFeedbackData()
    fetchPrivateDate()
    fetchImages()
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

      <h1 id="userprofilecaption">My Profile</h1>
      
      <div className="userprofileBox">
      
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Bio</h2>
      
      <p className="userprofilecontent1"> User Email: &nbsp;&nbsp;&nbsp;{fetchFeedbackData.email}</p> 
      
      <p className="userprofilecontent2"> Username: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.username}</p> 
      
      <p className="userprofilecontent1"> Address: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.address}</p> 
      
      <p className="userprofilecontent2"> Phone Number: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fetchFeedbackData.phoneNumber}</p> 
      
      <div className="btn btn-success"style={{fontSize:"medium",fontWeight:"bold",backgroundColor:'#8256D0',width:"170px",borderRadius:"5px",color:"white",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",marginLeft:"125px",padding:"5px",marginTop:"25px"}}> <a href={`/edituserprofile/${fetchFeedbackData._id}`}>  Update Your Profile!</a></div>
     
      
      </div>
     

      <div className="userprofileBox1">
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Skills</h2>
        <button type="button" class="btn btn-primary" id="firstButt">Coding</button>
        <button type="button" class="btn btn-primary" id="secondButt">DevOps</button>
        <button type="button" class="btn btn-primary" id="thirdButt">SQL</button>
        <button type="button" class="btn btn-primary" id="fourthButt">Algorithms</button>
        <button type="button" class="btn btn-primary" id="fifthButt">Heroku</button>
        <button type="button" class="btn btn-primary" id="sixthButt">Java</button>
         
      </div>
      
      <form action="/api/imageUpload" method="POST" enctype="multipart/form-data">
        <input type="file" name="image"/>
        
        <label for="name">Image Title</label>
        <input type="text" id="name" placeholder="Name" name="name" required>
         
        </input>
        <button type="submit">Submit</button>
        <img src={`data:image/png;base64,${Buffer.from(imageUploadData.img.data.data).toString('base64')}`}></img>
        {/* <img src="data:image/<%=image.img.contentType%>;base64,
          <%=image.img.data.toString('base64')%>"></img>
          {console.log("data")} */}
        {console.log(imageUploadData.img.data.data.toString('base64'))}
        {console.log("data")}
        {console.log(Buffer.from(imageUploadData.img.data.data).toString('base64'))}
        </form>

        <h1>To Upload Image on mongoDB</h1>

  <div>
    <form action="/api/imageUpload" method="POST" enctype="multipart/form-data">
      <div>
        <label for="name">Image Title</label>
        <input type="text" id="name" placeholder="Name"
          value="" name="name" required/>
      </div>
      <div>
        <label for="desc">Image Description</label>
        <textarea id="desc" name="desc" value="" rows="2"
            placeholder="Description" required>
        </textarea>
      </div>
      <div>
        <label for="image">Upload Image</label>
        <input type="file" id="image"
          name="image" value="" required/>
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div>



  <h1>Uploaded Images</h1>
  {/* <div>
    <% items.forEach(function(image) { %>) 
    <div>
      <div>
        <img src="data:image/<%=image.img.contentType%>;base64,
          <%=image.img.data.toString('base64')%>"/>
        <div>
          <h5><%= image.name %></h5>
          


<p><%= image.desc %></p>



        </div>
      </div>
    </div>
    <% }) %>
  </div> */}

 

        
   
      
      
     
     

</div>


 
    
)  
};

export default UserProfile;
