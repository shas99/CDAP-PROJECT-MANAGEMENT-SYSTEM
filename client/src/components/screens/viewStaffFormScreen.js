import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
//import PasswordChecklist from "react-password-checklist"//password validation
import { useEffect } from "react";
//import "./StaffviewGroup.css"
import {useParams} from 'react-router-dom';
import Parser from 'html-react-parser';
import SideNavigationBar from '../StaffSideNavigationBar/StaffSideNavigationBar';
import jsPDF from 'jspdf';
import logo from './favicon.png';

const ViewStaffForm = ({ history, match }) => {
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

  const [file, setFile] = useState()
  const [description,setDescription] = useState("")
  const [images,setImages] = useState([])
  const [forms,setForm] = useState([])
  const [ID,setID] = useState(useParams().id)
  const [Heading,setHeading] = useState("")
  const [Fields,setFields] = useState({})

  useEffect(() => {
    // const resetPasswordHandler = async (e) => {

    //   const config = {
    //     header: {
    //       "Content-Type": "application/json",
    //     },
    //   };
  
    //   try {
       
    //     const { data } = await axios.get(
    //       `/api/group/viewgroup/${match.params.id}`,
    //       {
  
    //       },
    //       config
    //     );
    //       setName(data.data.name)
    //       setmember1(data.data.member_1)
    //       setmember2(data.data.member_2)
    //       setmember3(data.data.member_2)
    //       setmember4(data.data.member_4)
    //       setmember5(data.data.member_5)
    //       setKey(data.data.key)
    //     console.log(data);
    //     setSuccess(data.data);
    //   } catch (error) {
    //     setError(error.response.data.error);
    //     setTimeout(() => {
    //       setError("");
    //     }, 5000);
    //   }
    // };

    //     const retreiveform = async (e) => {
     
    //   try{

    //     const config = {
    //       header: {
    //         "Content-Type": "application/json",
    //       },
    //     };

    // const id = "626fad0eb10dcb7431140ab3"

    // const { data} = await axios.get("/api/STDAvailableSubmissions/viewSpecificSubmissionStudentID", config);
    // setForm(data.data)
    // console.log(data.data);

  
  
    //   } catch (error) {
    //     setError(error.response.data.error);
    //     setTimeout(() => {
    //       setError("");
    //     }, 5000);
    //   }
    // };
    // retreiveform()
    // resetPasswordHandler()

    const fetchSubmissionData = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
  
          },
        };
  
        try {
       
          // const { data } = await axios.get(
          //   "http://localhost:5000/api/STDAvailableSubmissions/viewSpecificSubmission",
          //   {data:{ SubmissionID }},
     
            
          // );
            const SubmissionID = ID
          const { data } = await axios.get(
            "/api/STDAvailableSubmissions/StaffViewSubmission",
            {params:{ SubmissionID }},
          );
  
          console.log(data.data);
        
        //   setBatchID(data.data.BatchID)
        //   setDescription(data.data.Description)
          setHeading(data.data.heading)
          setFields(data.data.entries)
        //   if(data.data.visibility){
        //     setVisibility(1)
        //   }else{
        //     setVisibility(0)
        //   }
        } catch (error) {
  
        }
      };
      fetchSubmissionData()
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
function convertToPlain(html){

  // Create a new div element
  var tempDivElement = document.createElement("div");

  // Set the HTML content with the given value
  tempDivElement.innerHTML = html;

  // Retrieve the text property of the element 
  return tempDivElement.textContent || tempDivElement.innerText || "";
}
const pdfHandler=()=>{
  var doc = new jsPDF('landscape','px','a4','false');
  doc.addImage(logo,'PNG',300,10,10,10);
  //add png with 10px
  


  //add text
  doc.setFontSize(10);
  doc.text(312, 17, 'Calibre reports');
  var x = 50
console.log(Fields)
//create a list
const pdfFields = [];
const pdfContent = [];

  {Object.keys(Fields).map((key) => 
            
//     doc.text(310, x, key),
//      console.log(x),
// //increment x by 10 during each iteration of the map
//     x += 20
//add all the keys to the list
pdfFields.push(key)
    )}
    {Object.keys(Fields).map((key) => 
      pdfContent.push(convertToPlain(Fields[key]))
    )}
//loop through pdfFields and print on console
var contentIndex = 0
pdfFields.forEach((item, index) => {
  console.log(item, index);

  // console.log(x);
  // x += 20
      doc.text(310, x, item + " : " + pdfContent[contentIndex])
      contentIndex++
    //   x += 10
    //   doc.text(310, x, " : ")
    //   x += 10
    //  console.log(x)
//increment x by 10 during each iteration of the map
    x += 10
});

  doc.save('report.pdf');

}

  return (
    <div className="viewgroupscreen">

      <div class="inline-block float-left flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar/>
        </div>
        <div className="lg:w-2/3 px-8 py-10 rounded-lg mt-1 ml-80 ">
           <p className="text-3xl text-center">Student Form Submission</p>
        </div>
      
      <div className="lg:w-2/3 h-auto px-8 py-5 rounded-lg mt-1 ml-80 bg-gray-900 rounded-lg shadow-md border-grey-900 border-1 pb-8">

        <p className="font-sans text-3xl">{name}</p>

          {/* {forms.map((form) =><div> <button className="btn2" style={{backgroundColor:"blue"}}> <a href={`/viewStaffForm/${form._id}`}>{form.heading}</a></button></div>)} */}
         {/* {console.log(ID)} */}
         
         <p className="font-sans text-2xl">{Heading}</p>

         {/* {console.log(Object.keys(Fields))} */}

         {/* <table className="lg:w-4/5 mt-5 border-none" style={{border:"none"}}> */}
           {/* <tbody> */}
         {/* <table class="w-full text-sm text-left text-gray-500 border-grey-900 dark:text-gray-400 mt-5"> */}
         <div className="h-auto lg:w-90% mt-8  bg-gray-800 rounded-lg shadow-md">
            {Object.keys(Fields).map((key) => 
            
            <tr className="" style={{border:"none"}}>
              <td className="pr-5 pt-3 pl-5 pb-3" style={{border:"none"}}>{key}</td><td className="pr-5" style={{border:"none"}}> :</td><td style={{border:"none"}}> {Parser(Fields[key])}</td>
            </tr>
            
            )}</div>
            {/* </tbody> */}
         {/* </table> */}
         <button onClick={pdfHandler}>Generate report!</button>
     </div>
    </div>
  );
};



export default ViewStaffForm;
