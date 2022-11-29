import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css";
// import { Link } from "react-router-dom";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";
// import image from "../../images/Bunny.jpg"
import Swal from 'sweetalert2'
import SideNavigationBar from "../SideNavigationBar/sideNavigationBarComponent";
import { set } from "mongoose";
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous"></link>

/**
 * Resize a base 64 Image
 * @param {String} base64Str - The base64 string (must include MIME type)
 * @param {Number} MAX_WIDTH - The width of the image in pixels
 * @param {Number} MAX_HEIGHT - The height of the image in pixels
 */

const UserProfile = ({history}) => { 
  const Swal = require('sweetalert2')
  const [fetchFeedbackData, setFeedbackData] = useState("")
  const [privateData, setPrivateData] = useState("");
  const [error, setError] = useState("");
  const [fileData, setFileData] = useState("");
  const [imageUploadData, setimageUploadData] = useState({img:{data:{data:""}}});
  //const [isDisabled, setDisabled] = useState(false);
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
    //setDisabled(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
 //SUCCESS SWEET ALERT MESSAGE
 Swal.fire({
  title: 'Do you want to save the changes?',
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: 'Save',
  denyButtonText: `Don't save`,
}).then((result) => {
  /* Read more about isConfirmed, isDenied below */
  if (result.isConfirmed) {
    Swal.fire('Saved!', '', 'success')
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
  } else if (result.isDenied) {
    Swal.fire('Changes are not saved', '', 'info')
  }
})

  };

  // localStorage.setItem("authToken", data.token);

  // history.push("/");

  async function reduce_image_file_size(base64Str, MAX_WIDTH = 450, MAX_HEIGHT = 450) {
    let resized_base64 = await new Promise((resolve) => {
        let img = new Image()
        img.src = base64Str
        img.onload = () => {
            let canvas = document.createElement('canvas')
            let width = img.width
            let height = img.height

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width
                    width = MAX_WIDTH
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height
                    height = MAX_HEIGHT
                }
            }
            canvas.width = width
            canvas.height = height
            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0, width, height)
            resolve(canvas.toDataURL()) // this will return base64 image results after resize
        }
    });
    return resized_base64;
}



  async function image_to_base64(file) {
    let result_base64 = await new Promise((resolve) => {
        let fileReader = new FileReader();
        fileReader.onload = (e) => resolve(fileReader.result);
        fileReader.onerror = (error) => {
            console.log(error)
            alert('An Error occurred please try again, File might be corrupt');
        };
        fileReader.readAsDataURL(file);
    });
    return result_base64;
}

async function process_image(file, min_image_size = 300) {
  const res = await image_to_base64(file);
  if (res) {
      const old_size = calc_image_size(res);
      if (old_size > min_image_size) {
          const resized = await reduce_image_file_size(res);
          const new_size = calc_image_size(resized)
          console.log('new_size=> ', new_size, 'KB');
          console.log('old_size=> ', old_size, 'KB');
          return resized;
      } else {
          console.log('image already small enough')
          return res;
      }

  } else {
      console.log('return err')
      return null;
  }
}


  async function preview_image() {
    const file = document.getElementById('file');
    const res = await image_to_base64(file.files[0])
    if (res) {
        document.getElementById("old").src = res;

        const olds = calc_image_size(res)
        console.log('Old ize => ', olds, 'KB')

        const resized = await reduce_image_file_size(res);
        const news = calc_image_size(resized)
        console.log('new size => ', news, 'KB')
        document.getElementById("new").src = resized;
    } else {
        console.log('return err')
    }
}

function calc_image_size(image) {
  let y = 1;
  if (image.endsWith('==')) {
      y = 2
  }
  const x_size = (image.length * (3 / 4)) - y
  return Math.round(x_size / 1024)
}
  
  return  error ? ( 
  
    <span className="error-message">{error}</span>
    
  ) :
  (

 <div id="userprofileClass" className="">
   {/* <Header/> */}
   {/* <div class="flex float-left items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded" > */}
    {/* <meta name="viewport" content="width=device-width,initial-scale=1"/> */}
  
    <SideNavigationBar page="StudentProfile"/>
   {/* </div> */}

  <div className="float-right lg:w-4/5 mt-[-40rem] ml-5rem pl-24 pt-20 bg-gray-800">
     
      {/* profile image */}
      <div className="float-left  lg:w-2/5  ">
        <div className="flow-root	">
        <img src={`data:image/png;base64,${Buffer.from(imageUploadData.img.data.data).toString('base64')}`} alt="Profile Picture" loading="lazy" className="mt-10 ml-30 w-48 h-auto rounded-full ring-2 ring-gray-300 dark:ring-gray-500 rounded-full" ></img>
        </div>

        <div className="flow-root	">
        <form action="/api/imageUpload" method="POST" enctype="multipart/form-data" className="mt-5 pb-20 ">
        {/* <input type="file" name="image" style={{marginBottom:"10px"}} placeholder="upd"/> */}

         <label className="text-white block mb-2 text-sm font-medium dark:text-gray-300" for="file_input">Upload / Update Image</label>
        <input name="image" 
       // onChange={setDisabled(true)} 
        className="block w-[13rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" 
        id="file_input" 
        required
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={preview_image()}/>
        
        {/* <label for="name" style={{color:"royalblue",fontSize:"large",fontWeight:"bold"}}>Image Title</label> */}
        <br/>
        {/* <input type="text" id="name" placeholder="Name" name="name" required>
         
        </input>
              <input type="hidden"  id="ID" name="ID" value={fetchFeedbackData._id} style={{marginBottom:"10px"}}></input> */}
        <button type="submit"
        //disabled={isDisabled()}
        className="ml-[rem] mt-3 text-white bg-[#121518] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2" 
        >Submit!</button>

        </form>
        </div>


      </div>

      <div className="flex float-right h-auto  lg:w-3/5 pb-5">
      <div className="h-auto pl-10 pr-10 pt-5 pb-10 bg-gray-900	 text-white">

      <h2 id="userprofilecaption" >Bio</h2>
      <table className="mt-5 lg:w-5/5 m-auto border-none">
      <tr className="py-3 border-none hover:bg-gray-600"><td className="py-3 px5 border-none text-left"> User Email:</td><td className="py-3 border-none text-left pl-16">{fetchFeedbackData.email}</td></tr> 
      
      <tr className="py-3 border-none hover:bg-gray-600"><td className="py-3 border-none text-left "> Username:</td><td className="py-3 border-none text-left pl-16">{fetchFeedbackData.username}</td></tr>
      
      <tr className="py-3 border-none hover:bg-gray-600"><td className="py-3 border-none text-left "> Address:</td><td className="py-3 border-none text-left pl-16"> {fetchFeedbackData.address}</td></tr> 
      
      <tr className="py-3 border-none hover:bg-gray-600"> <td className="py-3 border-none text-left ">Phone Number:</td><td className="py-3 border-none text-left pl-16"> {fetchFeedbackData.phoneNumber}</td></tr> 
      
      
      </table>
     <button className="mt-5 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-2 focus:ring-purple-400 font-medium rounded-lg text-sm px-7 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> <a href={`/edituserprofile/${fetchFeedbackData._id}`}> Update Your Profile!</a></button>
     
      </div>

      {/* <div className="userprofileBox1">
      <h2 id="userprofilecaption" style={{marginLeft:"-375px"}}>Skills</h2>
        <button type="button" class="btn btn-primary" id="firstButt">Coding</button>
        <button type="button" class="btn btn-primary" id="secondButt">DevOps</button>
        <button type="button" class="btn btn-primary" id="thirdButt">SQL</button>
        <button type="button" class="btn btn-primary" id="fourthButt">Algorithms</button>
        <button type="button" class="btn btn-primary" id="fifthButt">Heroku</button>
        <button type="button" class="btn btn-primary" id="sixthButt">Java</button>
         
      </div> */}
      </div>

      {/* <div className="ml-[-45rem]">
      
      <form action="/api/imageUpload" method="POST" enctype="multipart/form-data" className="ImageSubmitProfile"> */}
        {/* <input type="file" name="image" style={{marginBottom:"10px"}} placeholder="upd"/> */}


{/* <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" for="file_input">Upload file</label>
<input name="image"  class="block w-[13rem] text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/> */}

        
        {/* <label for="name" style={{color:"royalblue",fontSize:"large",fontWeight:"bold"}}>Image Title</label> */}
        {/* <br/> */}
        {/* <input type="text" id="name" placeholder="Name" name="name" required>
         
        </input>
              <input type="hidden"  id="ID" name="ID" value={fetchFeedbackData._id} style={{marginBottom:"10px"}}></input> */}
        {/* <button type="submit"  className="ml-[rem] mt-7 text-white bg-[#121518] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 mr-2 mb-2" >Submit!</button>

        </form>
        </div> */}

       

 

        
   
      
      
     
     
</div>
</div>



 
    
)  
};

export default UserProfile;