import { useState, useEffect } from "react";
import axios from "axios";
// import InputRange from 'react-input-range';
// import { Link } from "react-router-dom";
import "./StaffRecommendationForm.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SideNavigationBar from "../StaffSideNavigationBar/StaffSideNavigationBar";
import Swal from 'sweetalert2'

const StaffRcommendationInputs = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

   // const [StaffID, setStaffID] = useState("");
    const [Q1, setQ1] = useState("5");
    const [Q2, setQ2] = useState("5");
    const [Q3, setQ3] = useState("5");
    const [Q4, setQ4] = useState("5");
    const [Q5, setQ5] = useState("5");
    const [Q6, setQ6] = useState("5");
    const [Q7, setQ7] = useState("5");
    const Swal = require('sweetalert2')

    useEffect(() => {
        const fetchPrivateDate = async () => {
          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          };
    
          try {
            const { data} = await axios.get("/api/staffPrivate/staffPrivate", config);
            
            setPrivateData(data.data);
          } catch (error) {
            localStorage.removeItem("authToken");
            setError("You are not authorized please login");
          }
        };
    
    
    
        fetchPrivateDate();
      }, [history]);
    
      //Logout feature
      const logOutHandler=()=>{
        localStorage.removeItem("authToken");
        history.push("/login");
    
      };
  
    
    const StaffRecommendationFormHandler = async (e) => {
         e.preventDefault();

         try{
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
              const { data } =  axios.put(
                `/api/staff/StaffRecommendationForm`,
                { Q1,Q2,Q3,Q4,Q5,Q6,Q7 }
                );
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info')
            }
          })
         }catch(error){
          // setError(error.response.data.error);  
          // console.log(error.response.data.error)
          alert("Error Announcement notset")
         }
    
        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };
       
        // alert("Successfully Submited!")

        let SID = localStorage.getItem("authToken")
        //console.log(SID)
        try {
          const { data } = await axios.post(
            "http://localhost:5000/api/staff/StaffRecommendationForm",
            { SID,Q1,Q2,Q3,Q4,Q5,Q6,Q7 },
            config
            
          );
          console.log(data)
            alert("Submitted!")

          history.push("/");
        } catch (error) {
          setError(error.response.data.error);
          setTimeout(() => {
            setError("");
            console.log(error)
          }, 5000);
        }
        
      };

     

      
  
    return error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back" className="">
      
      <div class="inline-block float-left flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
      <SideNavigationBar page="StaffTopicInterestings"/>
      </div>
      
      {/* <p style={{color:"#FFF",textAlign:"right"}}>
      {privateData}   */}
      &nbsp;&nbsp;&nbsp;&nbsp;
     
      {/* <button onClick={logOutHandler} id="logout">Log Out</button>
        </p> */}
       
        {/* <p style={{color:"#FFF"}}>
        <br/><br/><br/><br/>
        
        </p> */}
       <div className="inline-block lg:w-4/5  float-right place-content-center">

         <div className="lg:w-4/5 px-8 py-5 rounded-lg m-0,auto">
         <p className="mt-10 text-center font-semibold text-white font-sans text-4xl">Topic Interestings</p>         
         </div>

        <div className="">
          
        <div className="lg:w-4/5 h-auto px-8 py-5 bg-gray-800 rounded-lg m-0,auto mt-5 pt-10 pb-16" >        
        
        <form onSubmit={StaffRecommendationFormHandler}>
    
    <p className="text-center font-semibold text-white font-sans text-2xl pb-5">Topic Interestings Form</p>
    {error && <span className="error-message">{error}</span>}
      <br/>
      <p className="font-semibold text-white font-sans text-1xl text-left">Tell us your project Interestings<em> (This will help you to get suggested with most interesting projects as suggestions)</em></p><br/>
      
      <div className="lg:w-5/6 inline-block align-middle">
      <div className="mt-7 lg:w-full text-left inline-block align-middle">
      <label className="font-semibold text-white font-sans">1. Mobile Application Development &nbsp;&nbsp;&nbsp;&nbsp;{Q1}/10</label><br></br>
        <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1}
        value={Q1}
        onChange={(e) => setQ1(e.target.value)}
         />
      </div>
      <br/>

      <div className="pt-5 lg:w-full text-left inline-block align-middle " >
      <label className="font-semibold text-white font-sans">2. Web Application Development&nbsp;&nbsp;&nbsp;&nbsp;{Q2}/10</label>
      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1} 
        value={Q2}
        onChange={(e) => setQ2(e.target.value)}
        />
      </div>
      <br/>

      <div className="pt-5 lg:w-full text-left inline-block align-middle ">
      <label className="font-semibold text-white font-sans">3. Machine Learning&nbsp;&nbsp;&nbsp;&nbsp;{Q3}/10</label>
      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1}
        onChange={(e) => setQ3(e.target.value)}
        value={Q3} />
      </div>
      <br/>

      <div className="pt-5 lg:w-full text-left inline-block align-middle " >
      <label className="font-semibold text-white font-sans">4. Artificial Intelligence&nbsp;&nbsp;&nbsp;&nbsp;{Q4}/10</label>
      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1}
        onChange={(e) => setQ4(e.target.value)}
        value={Q4} />
      </div>
      <br/>

      <div className="pt-5  lg:w-full text-left inline-block align-middle " >
      <label className="font-semibold text-white font-sans" >5. Robotics&nbsp;&nbsp;&nbsp;&nbsp;{Q5}/10</label><br/>
      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1}
        onChange={(e) => setQ5(e.target.value)}
        value={Q5} />
      </div>
      <br/>

      <div className="pt-5  lg:w-full text-left inline-block align-middle " >
      <label className="font-semibold text-white font-sans">6. Cloud Computing&nbsp;&nbsp;&nbsp;&nbsp;{Q6}/10</label>
      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1}
        onChange={(e) => setQ6(e.target.value)}
        value={Q6} />
      </div>
      <br/>

      <div className="pt-5  lg:w-full text-left inline-block align-middle ">
      <label className="font-semibold text-white font-sans" >7. IOT&nbsp;&nbsp;&nbsp;&nbsp;{Q7}/10</label><br/>
      <input type="range" className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer dark:bg-gray-700 mt-5"
        max="10"
        min="1"
        step={1}
        onChange={(e) => setQ7(e.target.value)}
        value={Q7} />
      </div>
      <br/>  
    

    <button type="submit" className="mt-16 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-8 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">
        Submit
      </button>

      </div>

      
    </form></div>
        </div>
    
        {/* <Footer/> */}
      </div>
      </div> 
        </>
      );
    };
    
    export default StaffRcommendationInputs;