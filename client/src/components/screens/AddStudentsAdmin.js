import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import "./SubmissionAdmin.css";
import SideNavigationBar from "../AdminNavigationBar/AdminNavigationBar";
import * as XLSX from 'xlsx';

const AddStudentsAdmin = ({history}) =>{
  const [SubmissionsData, setSubmissionsData] = useState([])
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [submissionArray, setSubmissionArray] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {

    const fetchPrivateDate = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      };

      try {
        const { data} = await axios.get("/api/adminPrivate/adminPrivate", config);
        
        setPrivateData(data.data);
        
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    
    fetchPrivateDate()
  }, [history])


  const handleChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      setData(XLSX.utils.sheet_to_json(worksheet));
    };
    reader.readAsArrayBuffer(file)
  };


  const header = data.length > 0 ? Object.keys(data[0]) : [];
  
  // const rows = data.map((row) => {
  //   return (
  //     <tr key={row.id}>
  //       {header.map((key) => (
  //         <td key={key}>{key}{row[key]}</td>
  //       ))}
  //     </tr>
  //   );
  // });

  const rows = data.map((row) => {
    return (
      <tr key={row.id}>
        {header.map((key) => {
          if (key === "Group Leader's Name" || key === "Group Leader's Registration Number (E.g. IT12345678)" || key === "Member 2 Name" || key === "Member 2 Registration Number" || key === "Member 3 Name" || key === "Member 3 Registration Number" || key === "Member 4 Name" || key === "Member 4 Registration Number") {
            return <td key={key}>{row[key]}</td>;
          }
        })}
      </tr>
    );
  });




 return error ? ( 
  
  <span className="error-message">{error}</span>
) : ( 

  <>
  
  <div id="back555">
  <Header/>
  <div class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded  ">
        <SideNavigationBar page="AdminSubmission"/>
       </div>
  <h1 id="caption" className="" style={{marginTop:"-575px"}}>Upload students</h1>
  <input type="file" onChange={handleChange} />
      
    </div>
  <table style={{color:"white",backgroundColor:"black"}}>
        <thead>
          <tr>
                        {/* {header.map((key) => {

                return <th key={key}>{key}</th>;

            })} */}
            <th>
            Group Leader
          </th>
          <th>
            Group Leader's ID
          </th>
          <th>
            Member 2 Name
          </th>
          <th>
            Member 2 ID
          </th>
          <th>
            Member 3 Name
          </th>
          <th>
            Member 3 ID
          </th>
          <th>
            Member 4 Name
          </th>
          <th>
            Member 4 ID
          </th>
          </tr>
        </thead>



        <tbody>{rows}</tbody>
      </table>
     
  </>
);
};
export default AddStudentsAdmin;