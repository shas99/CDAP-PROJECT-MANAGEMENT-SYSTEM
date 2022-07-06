import React from 'react'
import "./StaffDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



export default function MarkingConfigurationsDashboard() {
  return (
    <div id="back">
        <Header/>
    <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/proposalmarkingconfiguration" id="Regs"> Proposal Presentation Configuration </Link>
      </div>

      <div className="StudentRectangle-40">
      <br/><br/>
      <Link to="/proposalreportmarkingconfiguration" id="Regs"> Proposal Report Configuration </Link>
      </div>

      <div className="StudentRectangle-39">
      <br/><br/>
      <Link to="/statusdocumentmarkingconfiguration" id="Regs"> Status Document 1 Configuration</Link>
      </div>


      <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/progresspresentationmarkingconfiguration" id="Regs"> Progress Presentation Configuration </Link>
      </div>


      <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/adminViewProjects" id="Regs"> Proposal Evaluation </Link>
      </div>


      <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/adminViewProjects" id="Regs"> Proposal Evaluation </Link>
      </div>


      <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/adminViewProjects" id="Regs"> Proposal Evaluation </Link>
      </div>


      <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/adminViewProjects" id="Regs"> Proposal Evaluation </Link>
      </div>
      <Footer/>
    </div>
  )
}
