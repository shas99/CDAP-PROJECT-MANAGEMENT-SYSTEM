import { useState, useEffect } from "react";
import axios from "axios";
// import "./MatchedSupervisors.css";
import "./EnterStatusDocument1Marks.css";
import Header from "../Header/Header";

const EnterStatusDocument1Marks = ({history}) => {
    const [error,setError]= useState("");
    const [privateData,setPrivateData]= useState("");
    const [projectNo, setprojectNo ] = useState("");
    const [studentIDs, setstudentIDs ] = useState("");
    const [ganttchartmarks, setganttchartmarks] = useState("");
    const [actualtimemarks, setactualtimemarks] = useState("");
    const [breakdownmarks, setbreakdownmarks] = useState("");
    const [managementtoolmarks, setmanagementtoolmarks] = useState("");
    const [ganttchartremarks, setganttchartremarks] = useState("");
    const [actualtimeremarks, setactualtimeremarks] = useState("");
    const [breakdownremarks, setbreakdownremarks] = useState("");
    const [managementtoolremarks, setmanagementtoolremarks] = useState("");
    const [supervisor, setsupervisor] = useState("");
    const [cosupervisor, setcosupervisor] = useState("");
    const [enterstatusdocument1marks,setenterstatusdocument1marks] = useState("")
    const [fetchenterstatusdocument1marksData, setenterstatusdocument1marksData] = useState("");

    useEffect(() => {
        const fetchenterstatusdocument1marksData= async () => {
            const enterstatusdocument1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data} = await axios.get("/api/staffPrivate/addstatusdocument1marks", enterstatusdocument1marksconfig);
                const enterstatusdocument1marksArray = data.data.split("/")
                console.log(enterstatusdocument1marksArray[0])
                const enterstatusdocument1marks =enterstatusdocument1marksArray[0].split(",")
                setenterstatusdocument1marks(enterstatusdocument1marks)
                setenterstatusdocument1marksData(enterstatusdocument1marksArray[0]);
               
            }catch(error){
                
            }
        }

        
        const fetchPrivateDate = async () => {
            const config = {
                headers:{
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                },
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/staffPrivate", config); //change to resolve logged out error
                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }

        }


        //fetch Marks Data()

        fetchPrivateDate();
        fetchenterstatusdocument1marksData()
    }, [history])

    //logout feature
    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    const enterstatusdocument1marksHandler = async (e) => {
        e.preventDefault();
         const config = {
            header: {
                "Content-Type": "application/json",
            },
         }
         try{
            const {data}=await axios.post(
                "/api/staffPrivate/addstatusdocument1marks",
                { projectNo,studentIDs,ganttchartmarks,actualtimemarks,breakdownmarks,managementtoolmarks, ganttchartremarks,actualtimeremarks,breakdownremarks,managementtoolremarks,supervisor,cosupervisor},
                config
            );

           history.push("/staffPrivate");
         }catch(error){
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");

            }, 5000)
         }
    }

    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="back">
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
            
          <div className="entermarksbackground">        
          <form onSubmit={enterstatusdocument1marksHandler} className="group-screen__form_Enter_marks">
      <h3 className="login-screen__title" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>RP (IT4010) Project Status document 1 [Total contribution = 1%]</h3>
      {error && <span className="error-message">{error}</span>}
      <div className="form-group">
        <table className="tablemarks1">
            <tr>
                <td style={{padding:"5px",margin:"5px"}}>
                <label>
           <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Project No</b></label><br/><br/>
          <input type="text" style={{marginLeft:"150px",borderColor:"royalblue"}} 
          name="name" 
          className = "input" id="StudentIDInput"
          onChange={(e) => setprojectNo(e.target.value)}
          value={projectNo} />
                    

                </td>
                <td>
                <label>
           <b style={{fontSize:"medium"}}>Student IDs</b></label><br/><br/>
          <input type="text" style={{marginLeft:"100px",borderColor:"royalblue"}}
          name="name" 
          className = "input"
          onChange={(e) => setstudentIDs(e.target.value)}
          value={studentIDs} />

                </td>
            </tr>
        </table><br/>
        <label>
           <b style={{fontSize:"medium",marginLeft:"65px"}}>Project Status Document from Proposal to PP1.
            (Project Management tool outcome reflections)</b></label><br/><br/>
          
          
        
        </div>
       

        <table className="proposalpresentationmarking">
        <tr>
        <th className="proposalpresentationmarking">Item No </th>
        <th className="proposalpresentationmarking"> Description </th>
        <th className="proposalpresentationmarking">MAX.MARKS ENTITLED </th>
        <th className="proposalpresentationmarking"> MARKS GIVEN </th>
        {/* <th style={{borderLeft:"none"}}></th> */}
    
        <th className="proposalpresentationremarks"> REMARKS </th>

         </tr>
 
         <tr>
         <td className="proposalpresentationmarking" >
                1
        </td>
        <td className="proposalpresentationmarking">
        Updated Gantt chart of finalize Design & implementation
        phases

        </td>
        <td className="proposalpresentationmarking">
        25 marks
        </td>

        <td  className="proposalpresentationmarking">
   
          <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
          name="name" 
          className = "proposalpresentationinput"
          onChange={(e) => setganttchartmarks(e.target.value)}
          value={ganttchartmarks} />
          


        </td>

         <td  className="proposalpresentationmarking">
   
        <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
        name="name" 
        className = "proposalpresentationinput"
        onChange={(e) => setganttchartremarks(e.target.value)}
        value={ganttchartremarks} />
        


        </td>
            </tr>

            <tr>
            <td className="proposalpresentationmarking" >
                2
            </td>
            <td className="proposalpresentationmarking">
            Reflect actual time with respect to predicted (estimated)
            time & how user-workload (work breakdown structure) to
            achieve deadlines.
            (Eg: once user completes allocated tasks, free users should
            be assigned for remaining tasks. This is in order to maximize
            recourse utilization to achieve deadline.)

        </td>
        <td className="proposalpresentationmarking">
            25 marks
        </td>

        <td  className="proposalpresentationmarking">
        
                <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
                name="name" 
                className = "proposalpresentationinput"
                onChange={(e) => setactualtimemarks(e.target.value)}
                value={actualtimemarks} />
          


        </td>

        <td  className="proposalpresentationmarking">
   
          <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
          name="name" 
          className = "proposalpresentationinput"
          onChange={(e) => setactualtimeremarks(e.target.value)}
          value={actualtimeremarks} />
          


        </td>
        </tr>

        <tr>
        <td className="proposalpresentationmarking" >
            3
        </td>
        <td className="proposalpresentationmarking">
        Finalize work breakdown structure & allocates resources
        for each areas.

        </td>
        <td className="proposalpresentationmarking">
        25 marks
        </td>

        <td  className="proposalpresentationmarking">
    
            <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
            name="name" 
            className = "proposalpresentationinput"
            onChange={(e) => setbreakdownmarks(e.target.value)}
            value={breakdownmarks} />
            


        </td>

        <td  className="proposalpresentationmarking">
    
            <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
            name="name" 
            className = "proposalpresentationinput"
            onChange={(e) => setbreakdownremarks(e.target.value)}
            value={breakdownremarks} />
            


        </td>
        </tr>

        <tr>
        <td className="proposalpresentationmarking" >
            4
        </td>
                <td className="proposalpresentationmarking">
                Project management tool (generate Reports).
            • Should include milestones.
            • Test results & how system testes.
            • User-task allocation details.
            • Documentation work.
            
            {/* dddd */}

        </td>
        <td className="proposalpresentationmarking">
        25 marks
        </td>

        <td  className="proposalpresentationmarking">
        
                <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
                name="name" 
                className = "proposalpresentationinput"
                onChange={(e) => setmanagementtoolmarks(e.target.value)}
                value={managementtoolmarks} />
                


        </td>

        <td  className="proposalpresentationmarking">
    
            <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
            name="name" 
            className = "proposalpresentationinput"
            onChange={(e) => setmanagementtoolremarks(e.target.value)}
            value={managementtoolremarks} />
            


        </td>
        </tr>

        <tr>
        <td className="proposalpresentationmarking" >
            
        </td>
        <td className="proposalpresentationmarking">
            Total

        </td>
        <td className="proposalpresentationmarking">
            100 marks
        </td>

        <td  className="proposalpresentationmarking">
            
        </td>

        <td  className="proposalpresentationmarking">
    
        </td>


        </tr>


        </table>

      


        
       
        <div className="form-group">

            <table className="tablemarks1">
                <tr>
                    <td style={{padding:"5px",margin:"5px"}}>
                                <label>
                    <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Co supervisor:</b></label><br/><br/>
                    <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
                    name="name" 
                    className = "input"
                    onChange={(e) => setcosupervisor(e.target.value)}
                    value={cosupervisor} />

                    </td>
                <td className="tabletd1">
                <label>
                    <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Supervisor:</b></label><br/><br/>
                    <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
                    name="name"
                    className = "input"
                    onChange={(e) => setsupervisor(e.target.value)}
                    value={supervisor} />
                            </td>
          
                </tr>
            </table>
       
                  
            </div>
         


            <button type="submit" style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}} className="btn btn-primary1" id="Log1Button">
                Enter marks
                </button>

        
            </form></div>
            </div>
                
                
            </>
      );


}

export default EnterStatusDocument1Marks;