import React from 'react'
import "./StaffDashboard.css";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";



export default function MarkingConfigurationsDashboard() {
  return (
    <div className="bg-gray-900 w-180  h-[55rem]">
    <div id="back ">
        <Header/>
        <div className="ml-[40rem] mt-7">
                        <div class="w-[180px] gap-1  h-[100px] text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-100 ">
                                          <button>
                                          <a href='/proposalmarkingconfiguration'>Proposal Marking Configuration</a>
                                          
                                          </button>
                        </div>

                        <br/>
                     

                       <div class="w-[180px] gap-1  h-[100px] text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/proposalreportmarkingconfiguration'> Proposal Report Marking Configuration</a>
                            </button>
                       </div>
                       <br/>
                       <div class="w-[180px] gap-1  h-[100px] text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/statusdocumentmarkingconfiguration'>Status Document Marking Configuration</a>
                            </button>
                       </div>
                       <br/>
                       <div class="w-[180px] gap-1  h-[100px] text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/progresspresentationmarkingconfiguration'> Progress Presentation Marking Configuration</a>
                            </button>
                       </div>
                       <br/>
                      


          </div>



    {/* <div className="StudentRectangle-42">
      <br/><br/>
      <Link to="/proposalmarkingconfiguration" id="Regs"> Proposal Presentation Configuration </Link>
      </div>

      <div className="StudentRectangle-43">
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
      </div> */}


      
      
    </div>
    </div>
  )
}
