/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
export default function Dashboard ({history}) {


    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");
    const [privateData2, setPrivateData2] = useState("");
    const [privateData3, setPrivateData3] = useState("");

    // Announcement Data setting 
    const [title,setTitle]=useState("");
    const [postedDate,setPostedDate]= useState("");
    const [description,setDescription]=useState("");
    const [deadline,setaDeadline]=useState("");
  
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
            setPrivateData2(data.data2);
            setPrivateData3(data.data3);

          console.log("Hey "+data.data3)
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

    //******* RETRIEVE ANNOUNCEMENT DETAILS  */
    const getRelevantAnnouncementData =async ()=>{
        const announcementID = "62c66fa8957236a99937300a";
     
        try{
          const{data}=await axios.get(`/api/announcement/getAnnouncement/${announcementID}`);
          console.log("Heyyyy "+data.announcement.announcementTitle);
          setTitle(data.announcement.announcementTitle);
          setDescription(data.announcement.announcementDescription);
          setaDeadline(data.announcement.announcementDeadline);
          setPostedDate(data.announcement.announcementDate);

         
        }catch(error){
          
          
        }
        
  
      }
      getRelevantAnnouncementData();
  



  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :
  
  (
    //         DASHBOARD SCREEN 
    <div className='bg-gray-900 text-gray-100'>
    <div class="flex ">
        <div x-data="{ open: true }" class="fixed top-0  z-50">
           {/* SIDENAVBAR */}
            <div  class="flex flex-col items-center w-48 h-screen overflow-hidden text-gray-300 bg-gray-800 rounded  " >
                <a class="flex items-center w-full px-3 mt-3" href="#">
                    <img src="https://cdn.discordapp.com/attachments/938131839661539339/973611175168327740/Favi.png" class="w-8 h-8" alt=""/>
                    <span class="ml-2 text-sm font-bold">Calibre Project Management</span>
                </a>
                <div class="w-full px-2">
                    <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Home</span>
                        </a>
                        <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">My Projects</span>
                        </a>
                        <a class="flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">My Tickets</span>
                        </a>
                        <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Forms</span>
                        </a>
                    </div>
                    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                        <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Products</span>
                        </a>
                        <a class="flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Settings</span>
                        </a>
                        <a class="relative flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Messages</span>
                            <span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-gray-500 rounded-full "></span>
                        </a>
                    </div>
                </div>
                <a class="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700 " >
                    <div class="border flex px-2 py-1 rounded-lg flex items-center gap-2" onClick={logOutHandler}>
                        <span class="ml-2 text-sm font-medium ">Log Out</span>
                        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                </a>
            </div>
           
        </div>
        </div>
                {/* Mobile View  */}
                <div   class="flex flex-col items-center w-12 h-screen overflow-hidden text-gray-300 bg-gray-800 rounded " >
                    <a class="flex items-center justify-center mt-3" href="#">
                        <img class="w-8 h-8" src="https://cdn.discordapp.com/attachments/938131839661539339/973611175168327740/Favi.png" alt=""/>
                    </a>
                    <div class="flex flex-col items-center mt-3 border-t border-gray-700">
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </a>
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </a>
                        <a class="flex items-center justify-center w-12 h-12 mt-2 text-gray-100 bg-gray-700 rounded" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </a>
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                        </a>
                    </div>
                    <div class="flex flex-col items-center mt-2 border-t border-gray-700">
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </a>
                        <a class="flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                        </a>
                        <a class="relative flex items-center justify-center w-12 h-12 mt-2 rounded hover:bg-gray-700" href="#">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                            <span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-gray-500 rounded-full"></span>
                        </a>
                    </div>
                    <a class="flex items-center justify-center w-16 h-16 mt-auto bg-gray-800 hover:bg-gray-700" href="#">
                        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </a>
                </div>
                <div class="md:ml-60 ml-16 mr-1 mt-3">
            
            <div class="absolute top-0 right-0 ">
                <div class="w-screen flex justify-end items-center bg-gray-800 text-white h-10 md:hidden">
                   
                        
                </div>
            </div>

            <div class="absolute top-0 right-0 ">
                <div class="w-screen flex justify-end items-center bg-gray-800 text-white h-10 md:hidden">
                    <a >
                        {/* <svg class="w-6 rotate-180 fill-gray-300 mr-5" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 330 330" style="enable-background:new 0 0 330 330;" xml:space="preserve"> <g id="XMLID_2_"> <path id="XMLID_4_" d="M51.213,180h173.785c8.284,0,15-6.716,15-15s-6.716-15-15-15H51.213l19.394-19.393 c5.858-5.857,5.858-15.355,0-21.213c-5.856-5.858-15.354-5.858-21.213,0L4.397,154.391c-0.348,0.347-0.676,0.71-0.988,1.09 c-0.076,0.093-0.141,0.193-0.215,0.288c-0.229,0.291-0.454,0.583-0.66,0.891c-0.06,0.09-0.109,0.185-0.168,0.276 c-0.206,0.322-0.408,0.647-0.59,0.986c-0.035,0.067-0.064,0.138-0.099,0.205c-0.189,0.367-0.371,0.739-0.53,1.123 c-0.02,0.047-0.034,0.097-0.053,0.145c-0.163,0.404-0.314,0.813-0.442,1.234c-0.017,0.053-0.026,0.108-0.041,0.162 c-0.121,0.413-0.232,0.83-0.317,1.257c-0.025,0.127-0.036,0.258-0.059,0.386c-0.062,0.354-0.124,0.708-0.159,1.069 C0.025,163.998,0,164.498,0,165s0.025,1.002,0.076,1.498c0.035,0.366,0.099,0.723,0.16,1.08c0.022,0.124,0.033,0.251,0.058,0.374 c0.086,0.431,0.196,0.852,0.318,1.269c0.015,0.049,0.024,0.101,0.039,0.15c0.129,0.423,0.28,0.836,0.445,1.244 c0.018,0.044,0.031,0.091,0.05,0.135c0.16,0.387,0.343,0.761,0.534,1.13c0.033,0.065,0.061,0.133,0.095,0.198 c0.184,0.341,0.387,0.669,0.596,0.994c0.056,0.088,0.104,0.181,0.162,0.267c0.207,0.309,0.434,0.603,0.662,0.895 c0.073,0.094,0.138,0.193,0.213,0.285c0.313,0.379,0.641,0.743,0.988,1.09l44.997,44.997C52.322,223.536,56.161,225,60,225 s7.678-1.464,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L51.213,180z"/> <path id="XMLID_5_" d="M207.299,42.299c-40.944,0-79.038,20.312-101.903,54.333c-4.62,6.875-2.792,16.195,4.083,20.816 c6.876,4.62,16.195,2.794,20.817-4.083c17.281-25.715,46.067-41.067,77.003-41.067C258.414,72.299,300,113.884,300,165 s-41.586,92.701-92.701,92.701c-30.845,0-59.584-15.283-76.878-40.881c-4.639-6.865-13.961-8.669-20.827-4.032 c-6.864,4.638-8.67,13.962-4.032,20.826c22.881,33.868,60.913,54.087,101.737,54.087C274.956,287.701,330,232.658,330,165 S274.956,42.299,207.299,42.299z"/> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> </svg> */}
                    </a>
                        
                </div>
            



            <div class="grid grid-cols-1 lg:grid-cols-2 items-center  mt-5 px-3 rounded-2xl bg-gray-800 lg:bg-indigo-700 shadow-md pb-5 ml-[13rem]">
                
                <div id="col" class='lg:w-[38vw] md:-translate-y-2'>
                    <h1 class="text-xl md:text-3xl mt-3 md:mt-10 ">Greetings , Mr. <span class="font-semibold"> {privateData2}</span></h1>
                    <h1 class="text-xs text-gray-400 mt-1"> Student</h1>
                    <hr class="border-gray-300 mt-2 md:w-96 lg:hidden"/>
                </div>

                <div class="md:text-right mt-3">
                    <h1 class='text-sm text-g>ray-400'>{privateData}</h1>
                    <h1 class='text-3xl font-semibold text-gray-200'>{privateData3}</h1>
                    <h1 class='text-gray-400'>SM0001</h1>
                </div>
            
             </div>
             {/* GRID SELECTION BUTTONS */}
             <br/><br/><br/>
             <div className="w-full">
                
{/*  Grid Buttons */}
                <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 items-center gap-x-180 gap-y-4 w-full">

                      <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/matchedsupervisors'> Matched Supervisors</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-180">

                            <button>
                                <a href='/viewfeedback'> My Feedbacks</a>
                          
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-180">
                          <button>
                          <a href='/studenttopicinterestingform'> My Topic Preference</a>
                           
                           </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-180">
                           <button>
                           <a href='/viewmarks'> My Grades</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1 h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/groupscreen'> My Group</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/matchedsupervisors'> Matched Supervisors</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/topicregistration'> Topic Registration Form</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/submissionmilestone'> Submit File</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href="https://cdap-app-365.herokuapp.com/"> Schedule Meeting</a>
                            </button>
                       </div>

                       <div class="w-36 gap-1  h-12 text-sm rounded-lg flex justify-center items-center shadow-md bg-blue-700 lg:bg-gray-800 hover:bg-blue-700 duration-300 gap-x-0.5">
                           <button>
                           <a href='/userprofile'> My Profile</a>
                            </button>
                            <br/>

                            
                  </div>
{/* 
                       ANNOUNCEMENT SECTION */}
                       <div className='ml-[20rem] w-full mt-[6rem]'>
                       <div class="flex items-center gap-2 mb-3">
                     
                                                                        
                                                                        <svg class="w-5 fill-indigo-500" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                                            width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" >
                                                                        <g>
                                                                            <path d="M22.7,45.4l-1.3-1c-1.4-1-1.4-3-1.4-4v-2.9c0-0.8-0.7-1.5-1.5-1.5h-6c-0.8,0-1.5,0.7-1.5,1.5v7.7
                                                                                c0,2.7,1.6,4.8,4.1,4.8H20c2.9,0,3.1-2,3.1-2l0,0C23.1,48,23.6,46.2,22.7,45.4z"/>
                                                                            <path d="M45,18V4.4c0,0,0,0,0-0.1c0-2.4-3-3.1-4.6-1.5l-8.9,8.4c-1.4,1.2-3.2,1.7-5,1.7H11.3C6.1,13,2,17.5,2,22.7
                                                                                v0.2c0,5.2,4.1,9.1,9.3,9.1h15.2c1.9,0,3.7,0.8,5.1,2l8.8,8.6c1.6,1.6,4.6,1,4.6-1.4c0,0,0,0,0-0.1V27.6c3,0,4.8-2.1,4.8-4.8
                                                                                C49.8,20.1,48,18,45,18z"/>
                                                                        </g>
                                                                        </svg>
                                        
                                                                        <h1 class="text-2xl -translate-y-0.5 ">Latest <span class="font-semibold">Announcements</span> </h1>
                                        
                                                                           
                        </div>
                                              
                           <div class=" lg:w-3/3 px-8 py-5 bg-gray-800 rounded-lg shadow-md">

                                    <button class=' text-xs text-orange-400 bg-gray-900 px-2 py-0.5 rounded-xl -translate-x-1'>News Admin</button>
                                    <h1 class="text-2xl font-semibold">{title}  </h1>
                                    <p class="text-gray-400 text-sm">{description}</p>
                                    <p class="text-gray-400 text-sm">Posted on : {postedDate}</p>
                                    <p class="text-gray-400 text-sm">Deadline :   {deadline}</p>
                                    <hr class="w-2/3 border-gray-500 my-4 hidden"/>
                                
                            
                            </div> 


                            </div>


 






















                    </div>
                
                






            </div>

             </div>
           
             </div>


       
      





     

            

</div>
        



             

       


  )
}
