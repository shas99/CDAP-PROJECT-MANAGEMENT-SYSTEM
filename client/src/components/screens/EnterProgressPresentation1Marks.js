import { useState, useEffect } from "react";
import axios from "axios";
import "./EnterProgressPresentation1Marks.css";
import Header from "../Header/Header";

const EnterProgressPresentation1Marks = ({history}) => {
    const [error,setError]= useState("");
    const [privateData, setPrivateData] = useState("");
    const [groupID, setgroupID]= useState("");
    const [studentIDs, setstudentIDs]= useState("");
    const [studentnames, setstudentnames]= useState("");
    const [provengapmarks1, setprovengapmarks1] = useState("");
    const [provengapmarks2, setprovengapmarks2] = useState("");
    const [capabilitymarks1, setcapabilitymarks1] = useState("");
    const [capabilitymarks2, setcapabilitymarks2] = useState("");
    const [implementationmarks1, setimplementationmarks1] = useState("");
    const [implementationmarks2, setimplementationmarks2] = useState("");
    const [implementationmarks3, setimplementationmarks3] = useState("");
    const [implementationmarks4, setimplementationmarks4] = useState("");
    const [implementationmarks5, setimplementationmarks5] = useState("");
    const [communicationmarks1,setcommunicationmarks1] = useState("");
    const [communicationmarks2, setcommunicationmarks2] = useState("");
    const [commercializationmarks, setcommercializationmarks] = useState("");
    const [extrafeedback, setextrafeedback] = useState("");
    const [recommendation, setrecommendation] = useState("");
    const[examiner1,setexaminer1] = useState("");
    const [examiner2, setexaminer2] = useState("");
    const [moderator, setmoderator] = useState("");
    const [enterprogresspresentation1marks, setenterprogresspresentation1marks]= useState("");
    const[fetchenterprogresspresentation1marksData, setenterprogresspresentationmarksData] = useState("");

    useEffect(() => {
        const fetchenterprogresspresentation1marksData = async () => {
            const enterprogresspresentation1marksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization:`Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data } = await axios.get("/api/staffPrivate/addprogresspresentation1marks",enterprogresspresentation1marksconfig);
                const enterprogresspresentation1marksArray = data.data.split("/")
                console.log(enterprogresspresentation1marksArray[0])
                const enterprogresspresentation1marks1 = enterprogresspresentation1marksArray[0].split(",")
                setenterprogresspresentation1marks(enterprogresspresentation1marks1)
                setenterprogresspresentationmarksData(enterprogresspresentation1marksArray[0]);


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
                const { data } = await axios.get("/api/staffPrivate/staffPrivate",config);
                setPrivateData(data.data);


            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");

            }
        }
        fetchPrivateDate();
        fetchenterprogresspresentation1marksData()
    }, [history])
    //logout feature
    const logOutHandler = () => {
        localStorage.removeiTEM("authToken");
        history.push("/login");
    }

    const enterprogresspresentation1marksHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"application/json",
            }
        }
        try{
            const {data}= await axios.post(
                "/api/staffPrivate/addprogresspresentation1marks",
                {groupID, studentIDs, studentnames, provengapmarks1, provengapmarks2, capabilitymarks1, capabilitymarks2, implementationmarks1, implementationmarks2, implementationmarks3, implementationmarks4, implementationmarks5,communicationmarks1,communicationmarks2,commercializationmarks,extrafeedback,recommendation,examiner1,examiner2, moderator,enterprogresspresentation1marks},config
            );
            history.push("/staffPrivate");
        }catch(error){
            setError(error.response.data.error);
            setTimeout(()=>{
                setError("");
            },5000)

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
      <form onSubmit={enterprogresspresentation1marksHandler} className="group-screen__form_Enter_marks">
  <h3 className="login-screen__title" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>CDAP -Progress Presentation 1 - Mark Sheet [Total contribution = 15%]</h3>
  {error && <span className="error-message">{error}</span>}
  <div className="form-group">
    <table className="tablemarks1">
        <tr>
            <td style={{padding:"5px",margin:"5px"}}>
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Student IDs:</b></label><br/><br/>
      <input type="text" style={{marginLeft:"150px",borderColor:"royalblue"}} 
      name="name" 
      className = "input" id="StudentIDInput"
      onChange={(e) => setstudentIDs(e.target.value)}
      value={studentIDs} />
                

            </td>
            <td>
            <label>
       <b style={{fontSize:"medium"}}>Student Names:</b></label><br/><br/>
      <input type="text" style={{marginLeft:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "input"
      onChange={(e) => setstudentnames(e.target.value)}
      value={studentnames} />

            </td>
        </tr>
    </table><br/>
    <label>
       <b style={{fontSize:"medium",marginLeft:"65px"}}>Group ID:</b></label><br/><br/>
      <input type="text" style={{marginLeft:"475px",borderColor:"royalblue"}}
      className = "input"
      name="name" 
      onChange={(e) => setgroupID(e.target.value)}
      value={groupID} />
      
    
    </div>
   

    <table className="proposalpresentationmarking">
    <tr>
<th className="proposalpresentationmarking">Sub Assessment Criteria </th>
<th className="proposalpresentationmarking"> Excellent[100-75] </th>
<th className="proposalpresentationmarking"> Good[74-60] </th>
<th className="proposalpresentationmarking"> Average[59-40] </th>
<th className="proposalpresentationmarking"> Below Average[39-0] </th>
<th className="proposalpresentationmarking"> Marks[out of 100] </th>
</tr>
<tr>  <br></br>
<div className="l0percentage" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Proven gap/Creative Solution [Based on LO1] - [10%]</div>
<br></br><br></br><br/>






</tr> 
<tr>
<td className="proposalpresentationmarking" >
Problem definition (30%)
</td>
<td className="proposalpresentationmarking">
The identified problem is clearly presented referring to the current implementation

</td>
<td className="proposalpresentationmarking">
The identified problem is adequately presented referring to the current implementation

</td>
<td className="proposalpresentationmarking">
The identified problem is marginally presented referring to the current implementation

</td>
<td className="proposalpresentationmarking">
The identified problem is not clearly presented. The current implementation does not help to understand the problem.
</td>

<td colspan="2" className="proposalpresentationmarking">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setprovengapmarks1(e.target.value)}
      value={provengapmarks1} />
      


</td>



</tr>

<tr>
<td className="proposalpresentationmarking">
Proof of concept (70%)

</td>
<td className="proposalpresentationmarking">
The current implementation clearly demonstrates proof of concept of the proposed solution

</td>
<td className="proposalpresentationmarking">
The current implementation adequately demonstrates proof of concept of the proposed solution

</td>
<td className="proposalpresentationmarking">
The current implementation shows some evidence of proof of concept of the proposed solution.

</td>
<td className="proposalpresentationmarking">
The current implementation lacks evidence of proof of concept of the proposed solution.

</td>

<td colspan="2" className="proposalpresentationmarking">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setprovengapmarks2(e.target.value)}
      value={provengapmarks2} />
      


</td>

</tr>

{/* <tr>
<td className="proposalpresentationmarking">

</td>
</tr> */}
<tr> <br></br>
<div className="l0percentage">
Capability in applying the knowledge in particular stream [Based on LO2] - [25%]
</div><br></br><br></br>
</tr>
<tr>
<td className="proposalpresentationmarking">
Application of key pillars
in the specialized area of
knowledge
(30%)

</td>
<td className="proposalpresentationmarking">
The current implemetation clearly shows that the most appropriate research/knowledge areas have been identified and are being applied.

</td>
<td className="proposalpresentationmarking">
The current implemetation adequately shows that the most appropriate research/knowledge areas have been identified and are being applied.

</td>
<td className="proposalpresentationmarking">
The current implemetation shows some evidence of application of appropriate research/knowledge areas. The most appropriate research/knowledge areas are not being applied in some parts of the project.

</td>
<td className="proposalpresentationmarking">
The current implemetation shows little or no evidence of application of appropriate research/knowledge areas. The most appropriate research/knowledge areas are not being applied in some parts of the project.


</td>

<td colspan="2" className="proposalpresentationmarking">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setcapabilitymarks1(e.target.value)}
      value={capabilitymarks1} />
      


</td>

</tr>

<tr>
<td className="proposalpresentationmarking">
Application of
technologies in the
relevant key pillar/area
(70%)

</td>
<td className="proposalpresentationmarking">
Technologies being applied are well presented and in-depth knowledge of technologies is demonstrated

</td>
<td className="proposalpresentationmarking">
Technologies being applied are adequately presented. An acceptable knowledge of technolgies is presented.

</td>
<td className="proposalpresentationmarking">
Technologies being applied are presented with missing details. Some knowledge of technologies is demonstrated.

</td>
<td className="proposalpresentationmarking">
Technologies being applied are poorly presented with incomplete/missing details. Knowledge of technologies is poorly demonstrated.

</td>

<td colspan="2" className="proposalpresentationmarking">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setcapabilitymarks2(e.target.value)}
      value={capabilitymarks2} />
      


</td>

</tr>
{/* <tr>
<td className="proposalpresentationmarking">

</td>
</tr> */}

<tr> <br></br>
<div className="l0percentage"> 
    Solution Implementation [Based on LO3] - [40%]    
    </div><br></br><br></br>
{/* <th  className="tableheading">Solution Implementation [Based on LO3] - [{l03}]</th> */}

</tr>
<tr>
<td className="proposalpresentationmarking">
Design Excellence (20%)

</td>
<td className="proposalpresentationmarking">
Demonstrated excellent design features

</td>
<td className="proposalpresentationmarking">
Demonstrated sufficient design features

</td>
<td className="proposalpresentationmarking">
Demonstrated marginal/minimal design features

</td>
<td className="proposalpresentationmarking">
Demonstrated poor design features

</td>

<td colspan="2" className="proposalpresentationmarking">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setimplementationmarks1(e.target.value)}
      value={implementationmarks1} />
      


</td>

</tr>
<tr>
<td className="proposalpresentationmarking">
Completion of prototype/product/research (30%)

</td>
<td className="proposalpresentationmarking">
Work completed is satisfactory (approximately 50% where applicable) and no identifiable delay as per the project plan

</td>
<td className="proposalpresentationmarking">
Work completed is acceptable. There are minor delays as per the project plan. Corrective actions have been identified and are being executed.
</td>
<td className="proposalpresentationmarking">
Work completed is not not sufficient. There are some delays as per the project plan. Acceptable corrective actions have been identified.
</td>
<td className="proposalpresentationmarking">
Work completed is not not sufficient. There are major delays as per the project plan. Acceptable corrective actions have not been identified.
</td>

<td colspan="2" className="proposalpresentationmarking">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setimplementationmarks2(e.target.value)}
      value={implementationmarks2} />
      


</td>

</tr>
<tr>
<td className="proposalpresentationmarking">
Standards/best practices (20%)

</td>
<td className="proposalpresentationmarking">
Application of appropriate standards/best practices is well demonstrated and clear evidence are present

</td>
<td className="proposalpresentationmarking">
Application of appropriate standards/best practices is adequately demonstrated and some evidence are present

</td>
<td className="proposalpresentationmarking">
Application of some standards/best practices is demonstrated. Few evidence are present

</td>
<td>
Application of standards/best practices is not demonstrated. No evidence.

</td>

<td colspan="2">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setimplementationmarks3(e.target.value)}
      value={implementationmarks3} />
      


</td>
</tr>
{/* new */}
<tr>
<td className="proposalpresentationmarking">
User Requirements / Functional Requirements 20%

</td>
<td className="proposalpresentationmarking">
Comprehensive and realistic user requirements and the functional requirements well described.

</td>
<td className="proposalpresentationmarking">
Comprehensive and realistic user requirements and the functional requirements adequately described.

</td>
<td className="proposalpresentationmarking">
Comprehensive and realistic user requirements and the functional requirements barely described.

</td>
<td>
Comprehensive and realistic user requirements and the functional requirements poorly described.

</td>

<td colspan="2">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setimplementationmarks4(e.target.value)}
      value={implementationmarks4} />
      


</td>
</tr>

{/* new */}

<tr>
<td className="proposalpresentationmarking">
Risk mitigation (10%)

</td>
<td className="proposalpresentationmarking">
Project risks and appropriate measures have been clearly identified. Corrective actions are being executed or a comprehensive execution plan exists

</td>
<td className="proposalpresentationmarking">
Project risks and appropriate measures have been adequately identified. Corrective actions are being executed or a comprehensive execution plan exists

</td>
<td className="proposalpresentationmarking">
Some project risks have been identified. Acceptable corrective actions are not being executed. An acceptable plan does not exist.

</td>
<td>
No clear understanding of project risks. An acceptable risk mitigation plan does not exist.

</td>

<td colspan="2">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setimplementationmarks5(e.target.value)}
      value={implementationmarks5} />
      


</td>
</tr>



{/* <tr>
<td>

</td>
</tr> */}

<tr> <br></br>
<div className="l2percentage">
    Effective communication [Based on LO4]-[15%]
</div><br></br><br></br>
{/* <th>
Effective Communication [Based on LO4] - [{l04}]
</th> */}

</tr>
<tr>
<td>
Communication skills
(60%)

</td>
<td>
Excellent structure and smooth flow of the presentation.Excellent performance at the Q&A session

</td>
<td>
Well developed structure and good flow of the presentation. Good performance at the Q&A session.

</td>
<td>
Fairly developed structure and the flow of the presentation. Fair performance at the Q&A session.

</td>
<td>
Poorly developed structure and fragmented flow of the presentation. Poor performance at the Q&A session.

</td>

<td colspan="2">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setcommunicationmarks1(e.target.value)}
      value={communicationmarks1} />
      


</td>

</tr>
<tr>
<td>
Presentation skills (40%)

</td>
<td>
Excellent stage presence, body language, eye contact, voice projection and clarity. Commendable use of visual aids. Excellent time management.

</td>
<td>
Good stage presence and body language Use of visual aids Hardly managed the time

</td>
<td>
Average stage presence with no body language Little or no use of visual aids poor time management

</td>
<td>
Poor stage presence No use of visual aids Poor time management

</td>

<td colspan="2">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setcommunicationmarks2(e.target.value)}
      value={communicationmarks2} />
      


</td>
</tr>


{/* <tr>
<td>

</td>
</tr> */}

<tr> <br></br>
<div className="l3percentage">
Ability of commercialization / potential for entrepreneurship [Based on LO5] - [10%]

</div><br></br><br></br>
{/* <th>
Ability of commercialization / potential for entrepreneurship [Based on LO5] - [{l05}]
</th> */}

</tr>
<tr>
<td>
Ability of
commercialization /
potential for
entrepreneurship
100%

</td>
<td>
Demonstrated sound evidence
to prove business potential
highlighting many achievable
user benefits

</td>
<td>
Sufficient evidence to
prove business potential
highlighting some
achievable user benefits

</td>
<td>
Few evidence to prove
business potential with
few user benefits

</td>
<td>
Very few or No
evidence to prove
business potential
with unachievable
or No user
benefits

</td>

<td colspan="2">

      <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
      name="name" 
      className = "proposalpresentationinput"
      onChange={(e) => setcommercializationmarks(e.target.value)}
      value={commercializationmarks} />
      


</td>

</tr>

<tr><br></br>
<label>
<b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Extra feedback:</b></label><br/><br/>
    
      <input type="text" style={{borderColor:"royalblue"}}
      name="name"
      className = "proposalpresentationfeedback"
      onChange={(e) => setextrafeedback(e.target.value)}
      value={extrafeedback} />

      <br></br><br></br>

      <label>
<b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Recommend for NBQSA (Yes/No)</b></label><br/><br/>
    
      <input type="text" style={{borderColor:"royalblue"}}
      name="name"
      className = "proposalpresentationfeedback"
      onChange={(e) => setrecommendation(e.target.value)}
      value={recommendation} />


</tr>
    </table>


    
   
    <div className="form-group">

        <table className="tablemarks1">
            <tr>
                <td style={{padding:"5px",margin:"5px"}}>
                <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Examiner 1:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name" 
      className = "input"
      onChange={(e) => setexaminer1(e.target.value)}
      value={examiner1} />

                </td>
            <td className="tabletd1">
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Examiner 2:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name"
      className = "input"
      onChange={(e) => setexaminer2(e.target.value)}
      value={examiner2} />
            </td>
            {/* <td className="tabletd1">
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Moderator:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name"
      className = "input"
      onChange={(e) => setmoderator(e.target.value)}
      value={moderator} />


            </td> */}

<td className="tabletd1">
            <label>
       <b style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}}>Moderator:</b></label><br/><br/>
      <input type="text" style={{margin:"10px",borderColor:"royalblue"}}
      name="name"
      className = "input"
      onChange={(e) => setmoderator(e.target.value)}
      value={moderator} />
            </td>
            </tr>
        </table>
   
              
              </div>
             


  <button type="submit" style={{fontSize:"medium",fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",fontSize:"medium",marginLeft:"-25px"}} className="btn btn-primary1" id="Log1Button">
      Enter marks
    </button>

    
  </form></div>
      </div>
  
      {/* <Footer/> */}
 
    </>
  );
}
export default EnterProgressPresentation1Marks;






