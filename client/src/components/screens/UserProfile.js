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
  const [imageUploadData, setimageUploadData] = useState({img:{data:{data:""}}});
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
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <Header/>

      <h1 id="userprofilecaption">My Profile</h1>
      {/* profile image */}
      <div >
        <img src={`data:image/png;base64,${Buffer.from(imageUploadData.img.data.data).toString('base64')}`} alt="Profile Picture" loading="lazy" width="15%" height="15%" className="profileiImage" ></img>
      </div>
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
      
      <form action="/api/imageUpload" method="POST" enctype="multipart/form-data" className="ImageSubmitProfile">
        <input type="file" name="image" style={{marginBottom:"10px"}}/>
        
        <label for="name" style={{color:"royalblue",fontSize:"large",fontWeight:"bold"}}>Image Title</label>
        <input type="text" id="name" placeholder="Name" name="name" required>
         
        </input>
              <input type="hidden"  id="ID" name="ID" value={fetchFeedbackData._id} style={{marginBottom:"10px"}}></input>
        <button type="submit" style={{marginBottom:"10px",fontSize:"xx-large",fontWeight:"bold",color:"#8256D0"}}>Submit!</button>

        </form>

        {/* <h1>To Upload Image on mongoDB</h1> */}

  {/* <div>
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
      {/* <input type="hidden"  id="ID" name="ID" value="testing"></input> */}
      {/* <div>
      <label for="desc">testing</label>
      <input type="text" id="ID" name="ID" placeholder="Name"
          value="" required/>
</div>
      <div>
        <button type="submit">Submit</button>
      </div>
    </form>
  </div> */}




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
