import { useState, useEffect } from "react";
import axios from "axios";
// import "./MatchedSupervisors.css";
import "./ProposalReportMarks.css";
import Header from "../Header/Header";
// import Footer from "../Footer/Footer";

const ProposalReportMarks = ({history}) => {
    const [error,setError]= useState("");
    const [privateData,setPrivateData]= useState("");
    const [groupID, setgroupID]= useState("");
    const [studentIDs, setstudentIDs] = useState("");
    const [studentnames, setstudentnames] = useState("");
    const [cosupervisor, setcosupervisor] = useState("");
    const [supervisor, setsupervisor] = useState("");
    const [extrafeedback, setextrafeedback] = useState("");
    const [provengapmarks1, setprovengapmarks1] = useState("");
    const [provengapmarks2, setprovengapmarks2] = useState("");
    const [capabilitymarks1, setcapabilitymarks1] = useState("");
    const [capabilitymarks2, setcapabilitymarks2] = useState("");
    const [implementationmarks1, setimplementationmarks1] = useState("");
    const [implementationmarks2, setimplementationmarks2] = useState("");
    const [implementationmarks3, setimplementationmarks3] = useState("");
    const [communicationmarks1, setcommunicationmarks1] = useState("");
    const [communicationmarks2, setcommunicationmarks2] = useState("");
    const [communicationmarks3, setcommunicationmarks3] = useState("");
    const [commercializationmarks1, setcommercializationmarks1] = useState("");
    const [enterproposalreportmarks,setenterproposalreportmarks] = useState("")
    const [fetchenterproposalreportmarksData, setenterproposalreportmarksData] = useState("");
    const [totalContribution ,setTotalContribution] = useState("");
    const [excellent,setExcellent] = useState("");
    const [good,setGood] = useState("");
    const [average,setAverage] = useState("");
    const [belowAverage,setBelowAverage] = useState("");
    const [l01,setl01] = useState("");
    const [l02,setl02] = useState("");
    const [l03,setl03] = useState("");
    const [l04,setl04] = useState("");
    const [l05,setl05] = useState("");

    const proposalReportMarkingID = "62b5f7ef425a8a64871de741";
    
    useEffect(() => {
        const fetchenterproposalreportmarksData= async () => {
            const enterproposalreportmarksconfig = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                }
            }
            try{
                const { data} = await axios.get("/api/staffPrivate/addproposalreportmarks", enterproposalreportmarksconfig);
                const enterproposalreportmarksArray = data.data.split("/")
                console.log(enterproposalreportmarksArray[0])
                const enterproposalreportmarks1 =enterproposalreportmarksArray[0].split(",")
                setenterproposalreportmarks(enterproposalreportmarks1)
                setenterproposalreportmarksData(enterproposalreportmarksArray[0]);
               
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
                const { data } = await axios.get("/api/staffPrivate/staffPrivate", config); 
                setPrivateData(data.data);
            }catch(error){
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }

        }



        fetchPrivateDate();
        fetchenterproposalreportmarksData()
    }, [history])

    const logOutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    const enterproposalreportmarksHandler = async (e) => {
        e.preventDefault();
         const config = {
            header: {
                "Content-Type": "application/json",
            },
         }
         try{
            const {data}=await axios.post(
                "/api/staffPrivate/addproposalreportmarks",
                { groupID, studentIDs, studentnames,  cosupervisor, supervisor, extrafeedback,provengapmarks1,provengapmarks2,capabilitymarks1,capabilitymarks2,implementationmarks1,implementationmarks2,implementationmarks3,communicationmarks1,communicationmarks2,communicationmarks3,commercializationmarks1,enterproposalreportmarks},
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

    // //*********** GET PROPOSAL REPORT MARKING CONFIGURATION DATA *********** */
    const getRelevantProposaReportlMarkingConfigData =async ()=>{
     
        try{
          const{data}=await axios.get(`/api/markingRubrik/proposalReportMarkingConfiguration/${proposalReportMarkingID}`);
         
         setTotalContribution(data.proposalDetails.affectedTotalContribution)
         setExcellent(data.proposalDetails.excellentGradeRange)
         setGood(data.proposalDetails.goodGradeRange)
         setAverage(data.proposalDetails.averageGradeRange)
         setBelowAverage(data.proposalDetails.belowAverageGradeRange)
         setl01(data.proposalDetails.affectedL01Grade)
         setl02(data.proposalDetails.affectedL02Grade)
         setl03(data.proposalDetails.affectedL03Grade)
         setl04(data.proposalDetails.affectedL04Grade)
         setl05(data.proposalDetails.affectedL05Grade)
         
        }catch(error){
          
          
        }
        
  
      }
      getRelevantProposaReportlMarkingConfigData();

  




   

    return  error ? ( 
  
        <span className="error-message">{error}</span>
      ) : ( 
    
        <>
        <div id="propreportback">
        <Header/>
        <p style={{color:"#FFF",textAlign:"right"}}>
        {privateData}  
        &nbsp;&nbsp;&nbsp;&nbsp;
       
        <button onClick={logOutHandler} id="logout">Log Out</button>
          </p>
          
          <p style={{color:"#FFF"}}>
          <br/><br/><br/><br/>
          
          </p>
        
            

          <div className="enterproposalreportmarksbackground">        
          <form onSubmit={enterproposalreportmarksHandler} className="group-screen__form_Enterproposalreport_marks">
      <h3 className="login-screen__title" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>RP (IT4010) - Proposal Report Mark Sheet [Total contribution = {totalContribution} ]</h3>
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
            <b style={{fontSize:"medium"}}>Student Name:</b></label><br/><br/>
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
    <th className="proposalpresentationmarking"> Excellent[{excellent}] </th>
    <th className="proposalpresentationmarking"> Good[{good}] </th>
    <th className="proposalpresentationmarking"> Average[{average}] </th>
    <th className="proposalpresentationmarking"> Below Average[{belowAverage}] </th>
    <th className="proposalpresentationmarking"> Marks[out of 100] </th>
  </tr>
  <tr>  <br></br>
   <div className="l0percentage" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif"}}>Proven gap/Creative Solution [Based on LO1] - [{l01}]</div>
   <br></br><br></br><br/>

  
    
  
    
    
   
    </tr> 
    <tr>
        <td className="proposalpresentationmarking" >
        1. Knowledge gap
    (Problem) with novel and
    creative solution
    70%
        </td>
        <td className="proposalpresentationmarking">
        Clearly argued the existence
    of knowledge gap using
    credible, multiple sources.
    Excellent justification for
    novelty and creativity.

        </td>
        <td className="proposalpresentationmarking">
        Sufficiently argued the
    existence of knowledge
    gap using limited
    sources.
    Good justification for
    novelty and creativity.
        </td>
        <td className="proposalpresentationmarking">
        Moderately argued the
    knowledge gap with
    very few or no sources.
    Average justification for
    novelty and creativity.

        </td>
        <td className="proposalpresentationmarking">
        Knowledge gap is
    not clearly
    identified.
    Poor or No
    justification for
    novelty and
    creativity.
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
        2. Compare existing
    systems and related work
    30%

        </td>
        <td className="proposalpresentationmarking">
        Extensively compared the
    research problem in the
    present context of the research
    domain / with similar products
    and services.

        </td>
        <td className="proposalpresentationmarking">
        Sufficiently compared
    the research problem in
    the present context of
    the research domain /
    with similar products
    and services.

        </td>
        <td className="proposalpresentationmarking">
        Moderately compared
    the research problem in
    the present context of
    the research domain /
    with similar products
    and services

        </td>
        <td className="proposalpresentationmarking">
        Poorly compared
    or No comparison
    has been done

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
    Capability in applying the knowledge in particular stream [Based on LO2] - [{l02}]
    </div><br></br><br></br>
</tr>
<tr>
    <td className="proposalpresentationmarking">
    Application of key pillars
in the specialized area of
knowledge
50%

    </td>
    <td className="proposalpresentationmarking">
    Clearly identified the most
appropriate research area
(Machine learning, Image
processing, Data Science etc.)



        </td>

        <td className="proposalpresentationmarking">
        Satisfactorily identified the
research area.

        </td>

        <td className="proposalpresentationmarking">
        Vaguely identified.
But appropriateness is
doubtful.

        </td>
        <td className="proposalpresentationmarking">
        Indistinctly
identified or Not
identified.
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
    50%

        </td>
        <td className="proposalpresentationmarking">
        Demonstrated full awareness
    of technologies in the relevant
    area and a critical evaluation
    of technologies proving
    selection of the best
    technology/s.

        </td>
        <td className="proposalpresentationmarking">
        Adequate awareness of
    technologies to be used
    and a good evaluation of
    technologies proving
    selection of the best
    technologies.

        </td>
        <td className="proposalpresentationmarking">
        Moderate awareness of
    technologies to be used.

        </td>
        <td className="proposalpresentationmarking">
        Poor or Zero
    awareness of
    technologies to be
    used.

        </td>

        <td colspan="2" className="proposalpresentationmarking">
    
            <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
            name="name" 
            className = "proposalpresentationinput"
            onChange={(e) => setcapabilitymarks2(e.target.value)}
            value={capabilitymarks2} />
            


        </td>

    </tr>

 


<tr> <br></br>
    <div className="l0percentage"> 
        Solution Implementation [Based on LO3] - [{l03}]    

        </div><br></br><br></br>
    </tr>
    <tr>
        <td className="proposalpresentationmarking">
        High-level System
    Architecture and
    identification of selfevaluation
    plan/criteria
    50%

        </td>
        <td className="proposalpresentationmarking">
        Brilliantly justified high-level
    SA with highly acceptable
    self-evaluation plan.

        </td>
        <td className="proposalpresentationmarking">
        Adequately justified
    high-level SA with
    acceptable selfevaluation
    plan.

        </td>
        <td className="proposalpresentationmarking">
        Barely justified highlevel
    SA with fairly
    acceptable selfevaluation
    plan.

        </td>
        <td className="proposalpresentationmarking">
        Poorly justified or
    No evidence of
    High-level SA
    with inappropriate
    or No selfevaluation
    plan.

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
        User Requirements /
    Functional Requirements
    20%

        </td>
        <td className="proposalpresentationmarking">
        Comprehensive and realistic
    user requirements and the
    functional requirements well
    described.

        </td>
        <td className="proposalpresentationmarking">
        Comprehensive and
    realistic user
    requirements and the
    functional requirements
    adequately described.

        </td>
        <td className="proposalpresentationmarking">
        Comprehensive and
    realistic user
    requirements and the
    functional requirements
    barely described.
        </td>
        <td className="proposalpresentationmarking">
        Comprehensive
    and realistic user
    requirements and
    the functional
    requirements
    poorly described.
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
        Work Breakdown
    Structure (WBS)
    30%

        </td>
        <td className="proposalpresentationmarking">
        Comprehensive planning
    demonstrate in WBS, realistic
    time estimates and right
    workload distribution.

        </td>
        <td className="proposalpresentationmarking">
        Good planning
    demonstrate in WBS,
    realistic time estimates
    and good workload
    distribution.

        </td>
        <td className="proposalpresentationmarking">
        Satisfactory planning of
    WBS, barely feasible
    time estimates and
    acceptable workload
    distribution.

        </td>
        <td>
        Poor or No
    planning of WBS,
    Unrealistic time
    estimates and
    unacceptable
    workload
    distribution.

        </td>

        <td colspan="2">
    
            <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
            name="name" 
            className = "proposalpresentationinput"
            onChange={(e) => setimplementationmarks3(e.target.value)}
            value={implementationmarks3} />
            


        </td>
    </tr>


    



    {/* </td>
</tr> */}
{/* <tr>
    <td>

    </td>
</tr> */}



    <tr> <br></br>
        <div className="l2percentage">
            Effective communication [Based on LO4]-[15%]
        </div><br></br><br></br>
        

    </tr>
    <tr>
        <td>
        Idea delivery
    50%

        </td>
        <td>
        Excellent explanation of
    proposal content (objectives and
    methodology etc.), with logical
    discussion of the system's
    features.

        </td>
        <td>
        Sufficiently explained the
    proposal content (objectives
    and methodology etc.), with
    good discussion of system's
    features.

        </td>
        <td>
        Proposal content
    explained but
    containing some
    irrelevant information.

        </td>
        <td>
        Weakly explained
    the proposal
    content with lot of
    irrelevant
    information.

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
        Structure and
    mechanics of language
    30%

    </td>
        <td>
        Excellent structure and
    formatting, meaningful chapters
    (as recommended) with logical
    flow.
    Excellent language usage
    without grammatical and
    typographical errors.

        </td>
        <td>
        Acceptable structure and
    formatting, meaningful
    chapters (as recommended)
    with logical flow.
    Fairly good language usage
    with very few grammatical
    and typographical errors

        </td>
        <td>
        Poorly designed
    structure and
    formatting.
    Many grammatical and
    typographical errors.

        </td>
        <td>
        Unacceptable
    structure.
    Very poor writing.

        </td>

        <td colspan="2">
        
            <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
            name="name" 
            className = "proposalpresentationinput"
            onChange={(e) => setcommunicationmarks2(e.target.value)}
            value={communicationmarks2} />
            


        </td>

    </tr>
    {/* newly added */}
    <tr>
        <td>
        Referencing (IEEE)
    20%

        </td>
        <td>
        Proper citing and referencing.

        </td>
        <td>
        Acceptable level of citing
    and referencing.

        </td>
        <td>
        Few citations with
    incorrect referencing.

        </td>
        <td>
        Very few or No
    citations and
    incorrect or No
    referencing

        </td>

        <td colspan="2">
        
        <input type="text" style={{fontFamily:"-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif",width:"75px",margin:"100px",borderColor:"royalblue"}}
        name="name" 
        className = "proposalpresentationinput"
        onChange={(e) => setcommunicationmarks3(e.target.value)}
        value={communicationmarks3} />
        


    </td>
        </tr>


    {/* </td>
</tr> */} 

<tr> <br></br>
    <div className="l3percentage">
    Ability of commercialization / potential for entrepreneurship [Based on LO5] - [{l05}]

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
            onChange={(e) => setcommercializationmarks1(e.target.value)}
            value={commercializationmarks1} />
            


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
    export default ProposalReportMarks;
                
          