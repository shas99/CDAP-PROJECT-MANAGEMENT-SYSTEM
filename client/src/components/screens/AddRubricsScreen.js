import { useState, useEffect } from "react";
import axios from "axios";
import "./AddSubmission.css";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import { faDiagramProject,faGraduationCap } from '@fortawesome/free-solid-svg-icons'

const MarkingRubricsAdmin = ({history}) => {
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [Heading,setHeading] = useState("")
  const [Description,setDescription] = useState("")
  const [BatchID,setBatchID] = useState("")
  const [flow,setFlow] = useState(0)
  const [Fields,setField] = useState([])
  const [temp,setTemp] = useState("")
  const [tempMarks,setTempMarks] = useState("")
  const [visibility,setVisibility] = useState(false)

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



    fetchPrivateDate();
  }, [history]);

{/* create new field */}
    const CreateSubmissionHandler = async (e) => {
      e.preventDefault();

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    
    //potential bug remove http://localhost:5000 after consideration
    try {
      const { data } = await axios.post(
        "/api/markingRubrik/addRubrics",
        { Heading,Description,BatchID,Fields,visibility },
        config
        
      );
      console.log(data)
        alert("Submitted!")

      history.push("/adminPrivate");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
        console.log(error)
      }, 5000);
    }
    
  };

  const handleFlow=()=> {
    console.log(flow+1);
    setFlow(flow+1)
  }

  const addField=()=> {//normal text box
    setField(Array=> [...Array,temp])
    setField(Array=> [...Array,tempMarks])
  }

  const addField2=()=> {//rich text box
    setField(Array=> [...Array,temp])
    setField(Array=> [...Array,"Rich"])
  }

  //Logout feature
  const logOutHandler=()=>{
    localStorage.removeItem("authToken");
    history.push("/login");

  };

  const toggle=()=> {//normal text box
    if(visibility == false){
      setVisibility(true)
    }else{
      setVisibility(false)      
    }
  }

  const displayFields = (Fields) =>{//https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx
    let display = []
  for(let i = 0; i < Fields.length; i++){
    display.push(<li style={{color:"white"}}>{ Math.ceil((i+1)/2)}&nbsp;{Fields[i]} : {Fields[i+1]}</li>)
      
    i++
  }
  return display
 
}



  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) : ( 

    <>
    <div id="back123">

    <Header/>

    <p style={{color:"#FFF",textAlign:"right"}}>

    <button onClick={logOutHandler} id="logout">Log Out</button>
    </p>

    
    {/* {flow == 0 &&
    <div id="headert123">
    <form>
    <label>
        Submission Heading:
        <input type="text" name="heading" onChange={(e) => setHeading(e.target.value)} id="input"/>
    </label>
    <br/>
    <br/>
    <label>
        Submission Description:
        <input type="text" name="description" onChange={(e) => setDescription(e.target.value)} id="input"/>
    </label>
    <br/>
    <br/>
    <label>
        Submission BatchID:
        <input type="text" name="batchID" onChange={(e) => setBatchID(e.target.value)} id="input"/>
    </label>
    <label>
        Enable submission
        <input type="checkbox" name="visibility" onChange={toggle}/>
    </label>
    <br/>
    <br/> */}
    {/* <input type="submit" value="Submit" /> */}
    {/* </form>
      <button onClick={handleFlow} className="bluebuttons">
        Next
      </button>
  </div>
    } */}
  
    {/* {flow == 1 && */}
    <div>
      {/* create new field */}
        <label id="headert123">
            Enter field name:
        <input type="text" name="description" onChange={(e) => setTemp(e.target.value)} id="input"
        
        />
        Enter Marks:
                <input type="text" name="marks" onChange={(e) => setTempMarks(e.target.value)} id="input"
        
        />
    </label>
    {/* <input type="text" name="description" onChange={toggle}/> */}
    <ul>{displayFields(Fields)}</ul>
    <br/><br/>
      <button onClick={addField} className="greenbuttons">
        Add a new field
      </button>

      {/* <button onClick={addField2} className="greenbuttons">
        Add a rich text editor
      </button> */}
{/* create new field */}
      <button onClick={CreateSubmissionHandler} className="greenbuttons">
        Create new rubrics
      </button>

    </div>
    
{/* } */}
{/* {console.log(Fields)} */}


<br/>
    {/* {BatchID}<br/>
    {Heading}<br/>
    {Description}<br/>
    temp:{temp}<br/> */}

    {/* {flow} */}
  {/* {console.log(visibility)} */}
<Footer/>
{console.log(Fields)}
</div>
    </>
  );
};

export default MarkingRubricsAdmin;