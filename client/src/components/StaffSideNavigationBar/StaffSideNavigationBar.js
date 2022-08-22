import React from 'react'
// import "./SideNavigationBarComponent.css";
/* eslint-disable jsx-a11y/anchor-is-valid */

import { useState, useEffect } from "react";
import {Redirect} from "react-router-dom";
import axios from "axios";
import {withRouter} from 'react-router-dom';


export default function SideNavigationBar({page}) {

  
     //Logout feature
     const logOutHandler=()=>{
        localStorage.removeItem("authToken");
        window.location = '/stafflogin';
    
      };

    return (


   
<div class="sidebar" style={{position:"sticky"}}>
  {/* <a class="active" href="#home">Home</a>
  <a href="#news">News</a>
  <a href="#contact">Contact</a>
  <a href="#about">About</a> */}


<div  class="flex flex-col items-center w-48 h-full-screen overflow-hidden text-gray-300 bg-gray-800 rounded">
                <a class="flex items-center w-full px-3 mt-3" href="/dashboard">
                    <img src="https://cdn.discordapp.com/attachments/938131839661539339/973611175168327740/Favi.png" class="w-8 h-8" alt=""/>
                    <span class="ml-2 text-sm font-bold">Calibre Project Management</span>
                </a>
                <div class="w-full px-2">
                    <div class="flex flex-col items-center w-full mt-3 border-t border-gray-700">
                        <a class={page == "StaffDashboard" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/staffPrivate">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Home</span>
                        </a>

                        {/* {page == "StudentTopicRegistrationForm" ? <a class="text-gray-100 rounded"></a> : <a class=" "></a>} */}

                        <a class={page == "Add Marks" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/markdashboard">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Add Marks</span>
                        </a>

                        <a class={page == "StaffTopicInterestings" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/staffrecommendationform">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 10 0 C 4.488281 0 0 4.488281 0 10 L 0 40 C 0 45.511719 4.488281 50 10 50 L 40 50 C 45.511719 50 50 45.511719 50 40 L 50 10 C 50 4.488281 45.511719 0 40 0 Z M 10 2 L 40 2 C 44.433594 2 48 5.566406 48 10 L 48 40 C 48 44.433594 44.433594 48 40 48 L 10 48 C 5.566406 48 2 44.433594 2 40 L 2 10 C 2 5.566406 5.566406 2 10 2 Z M 20.5 8 C 19.722656 8 19.0625 8.660156 19.0625 9.4375 C 19.0625 12.257813 17.582031 14.199219 16.03125 15.53125 C 15.257813 16.195313 14.46875 16.679688 13.875 17 C 13.578125 17.160156 13.359375 17.296875 13.1875 17.375 C 13.015625 17.453125 12.804688 17.515625 12.9375 17.46875 C 12.925781 17.46875 12.917969 17.46875 12.90625 17.46875 C 12.359375 17.683594 12 18.226563 12 18.8125 L 12 22.59375 C 12 23.371094 12.691406 24 13.4375 24 L 16 24 L 16 33.65625 C 16 34.214844 16.058594 36.652344 17.15625 39.09375 C 18.253906 41.535156 20.621094 44 24.75 44 C 31.265625 44 34.304688 41.484375 34.5 41.3125 C 34.511719 41.3125 34.519531 41.3125 34.53125 41.3125 C 34.835938 41.042969 35 40.660156 35 40.25 L 35 35.75 C 35 35.230469 34.703125 34.75 34.25 34.5 C 33.804688 34.25 33.257813 34.246094 32.8125 34.53125 C 32.929688 34.457031 32.808594 34.53125 32.75 34.5625 C 32.691406 34.59375 32.582031 34.660156 32.46875 34.71875 C 32.242188 34.835938 31.9375 35 31.53125 35.15625 C 30.71875 35.46875 29.59375 35.75 28.4375 35.75 C 27.148438 35.75 26.699219 35.273438 26.375 34.71875 C 26.214844 34.441406 26.117188 34.148438 26.0625 33.90625 C 26.007813 33.664063 26 33.410156 26 33.5 L 26 24 L 31.5625 24 C 32.386719 24 33 23.339844 33 22.5625 L 33 17.4375 C 33 16.660156 32.378906 16 31.5625 16 L 26 16 L 26 9.4375 C 26 8.660156 25.339844 8 24.5625 8 Z M 21 10 L 24 10 L 24 17 C 24 17.550781 24.449219 18 25 18 L 31 18 L 31 22 L 25 22 C 24.449219 22 24 22.449219 24 23 L 24 33.5 C 24 33.714844 24.035156 33.949219 24.125 34.34375 C 24.214844 34.738281 24.359375 35.210938 24.65625 35.71875 C 25.246094 36.734375 26.519531 37.75 28.4375 37.75 C 29.9375 37.75 31.28125 37.375 32.25 37 C 32.5625 36.878906 32.769531 36.796875 33 36.6875 L 33 39.90625 C 32.757813 40.113281 30.488281 42 24.75 42 C 21.363281 42 19.863281 40.269531 18.96875 38.28125 C 18.074219 36.292969 18 34.054688 18 33.65625 L 18 23 C 18 22.449219 17.550781 22 17 22 L 14 22 L 14 19.1875 C 14.210938 19.09375 14.5 18.9375 14.84375 18.75 C 15.53125 18.378906 16.429688 17.84375 17.34375 17.0625 C 19.0625 15.585938 20.800781 13.214844 21 10 Z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Topic Interestings</span>
                        </a>
                        
                        <a class={page == "StudentGroups" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/staffproject">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 37 0 C 32.59375 0 29 3.59375 29 8 C 29 12.40625 32.59375 16 37 16 C 41.40625 16 45 12.40625 45 8 C 45 3.59375 41.40625 0 37 0 Z M 21.5 1 C 17.921875 1 15 3.921875 15 7.5 C 15 11.078125 17.921875 14 21.5 14 C 25.078125 14 28 11.078125 28 7.5 C 28 3.921875 25.078125 1 21.5 1 Z M 37 2 C 40.324219 2 43 4.675781 43 8 C 43 11.324219 40.324219 14 37 14 C 33.675781 14 31 11.324219 31 8 C 31 4.675781 33.675781 2 37 2 Z M 9 3 C 6.25 3 4 5.25 4 8 C 4 10.75 6.25 13 9 13 C 11.75 13 14 10.75 14 8 C 14 5.25 11.75 3 9 3 Z M 21.5 3 C 23.996094 3 26 5.003906 26 7.5 C 26 9.996094 23.996094 12 21.5 12 C 19.003906 12 17 9.996094 17 7.5 C 17 5.003906 19.003906 3 21.5 3 Z M 9 5 C 10.667969 5 12 6.332031 12 8 C 12 9.667969 10.667969 11 9 11 C 7.332031 11 6 9.667969 6 8 C 6 6.332031 7.332031 5 9 5 Z M 9 15 C 5.15625 15 2 18.15625 2 22 L 2 34 C 2 34.550781 2.449219 35 3 35 L 13 35 L 13 40 C 13 40.550781 13.449219 41 14 41 L 24 41 L 24 49 C 24 49.550781 24.449219 50 25 50 L 47 50 C 47.550781 50 48 49.550781 48 49 L 48 31 C 48 24.363281 42.636719 19 36 19 C 33.4375 19 31.179688 19.914063 29.253906 21.269531 C 27.964844 18.183594 25 16 21.5 16 C 18.945313 16 16.738281 17.132813 15.1875 18.851563 C 14.023438 16.570313 11.6875 15 9 15 Z M 9 17 C 11.417969 17 13.503906 18.757813 13.917969 21.078125 C 13.988281 21.492188 14.316406 21.816406 14.734375 21.886719 C 15.148438 21.957031 15.5625 21.761719 15.769531 21.390625 C 16.910156 19.378906 18.96875 18 21.5 18 C 24.542969 18 27.136719 20.082031 27.828125 22.9375 C 27.910156 23.277344 28.167969 23.550781 28.503906 23.65625 C 28.839844 23.757813 29.203125 23.679688 29.46875 23.445313 C 31.1875 21.90625 33.4375 21 36 21 C 41.566406 21 46 25.433594 46 31 L 46 48 L 26 48 L 26 40 C 26 39.449219 25.550781 39 25 39 L 15 39 L 15 34 C 15 33.449219 14.550781 33 14 33 L 4 33 L 4 22 C 4 19.246094 6.246094 17 9 17 Z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Student Groups</span>
                        </a>
                        <a class={page == "StaffPlaceAnnouncement" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/staffPlaceAnnouncement">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 25 1 C 11.222656 1 0 10.878906 0 23.1875 C 0 29.234375 2.773438 34.664063 7.21875 38.6875 C 6.546875 40.761719 5.046875 42.398438 3.53125 43.65625 C 2.714844 44.332031 1.933594 44.910156 1.3125 45.46875 C 1.003906 45.746094 0.722656 46.027344 0.5 46.375 C 0.277344 46.722656 0.078125 47.21875 0.21875 47.75 L 0.34375 48.15625 L 0.6875 48.375 C 1.976563 49.117188 3.582031 49.246094 5.3125 49.125 C 7.042969 49.003906 8.929688 48.605469 10.78125 48.09375 C 14.375 47.101563 17.75 45.6875 19.53125 44.90625 C 21.289063 45.273438 23.054688 45.5 24.90625 45.5 C 38.683594 45.5 49.90625 35.621094 49.90625 23.3125 C 49.90625 11.007813 38.78125 1 25 1 Z M 25 3 C 37.820313 3 47.90625 12.214844 47.90625 23.3125 C 47.90625 34.402344 37.730469 43.5 24.90625 43.5 C 23.078125 43.5 21.355469 43.320313 19.625 42.9375 L 19.28125 42.84375 L 19 43 C 17.328125 43.738281 13.792969 45.179688 10.25 46.15625 C 8.476563 46.644531 6.710938 47.019531 5.1875 47.125 C 4.167969 47.195313 3.539063 46.953125 2.84375 46.78125 C 3.339844 46.355469 4.019531 45.847656 4.8125 45.1875 C 6.554688 43.742188 8.644531 41.730469 9.375 38.75 L 9.53125 38.125 L 9.03125 37.75 C 4.625 34.015625 2 28.875 2 23.1875 C 2 12.097656 12.175781 3 25 3 Z M 23.8125 12.8125 C 23.511719 12.8125 23.40625 12.988281 23.40625 13.1875 L 23.40625 15.8125 C 23.40625 16.113281 23.613281 16.1875 23.8125 16.1875 L 26.1875 16.1875 C 26.488281 16.1875 26.59375 16.011719 26.59375 15.8125 L 26.59375 13.1875 C 26.59375 12.886719 26.386719 12.8125 26.1875 12.8125 Z M 23.90625 20.09375 C 23.605469 20.09375 23.5 20.300781 23.5 20.5 L 23.5 33.90625 C 23.5 34.207031 23.707031 34.3125 23.90625 34.3125 L 23.90625 34.40625 L 26.1875 34.40625 C 26.488281 34.40625 26.59375 34.199219 26.59375 34 L 26.59375 20.5 C 26.59375 20.199219 26.386719 20.09375 26.1875 20.09375 Z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Announcements</span>
                        </a>
                        {/* <a class={page == "StudentTopicRegistrationForm" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/topicregistration">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Topic Registrations</span>
                            
                        </a> */}
                    </div>
                    <div class="flex flex-col items-center w-full mt-2 border-t border-gray-700">
                        {/* <a class={page == "StudentMilestones" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/submissionmilestone">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                               
                            </svg>
                            <span class="ml-2 text-sm font-medium">Milestones</span>
                        </a> */}
                        {/* <a class={page == "StudentStatus" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/status">
                            <svg class="w-6 h-6 stroke-current"  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Status</span>
                        </a> */}
                        {/* <a class={page == "StudentTopicInterestings" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/studenttopicinterestingform">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                               
                            </svg>
                            <span class="ml-2 text-sm font-medium">Topic Interestings</span>
                            <span class="absolute top-0 left-0 w-2 h-2 mt-2 ml-2 bg-gray-500 rounded-full "></span>
                        </a> */}
                        {/* <a class={page == "StudentGroups" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/GroupScreen">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 37 0 C 32.59375 0 29 3.59375 29 8 C 29 12.40625 32.59375 16 37 16 C 41.40625 16 45 12.40625 45 8 C 45 3.59375 41.40625 0 37 0 Z M 21.5 1 C 17.921875 1 15 3.921875 15 7.5 C 15 11.078125 17.921875 14 21.5 14 C 25.078125 14 28 11.078125 28 7.5 C 28 3.921875 25.078125 1 21.5 1 Z M 37 2 C 40.324219 2 43 4.675781 43 8 C 43 11.324219 40.324219 14 37 14 C 33.675781 14 31 11.324219 31 8 C 31 4.675781 33.675781 2 37 2 Z M 9 3 C 6.25 3 4 5.25 4 8 C 4 10.75 6.25 13 9 13 C 11.75 13 14 10.75 14 8 C 14 5.25 11.75 3 9 3 Z M 21.5 3 C 23.996094 3 26 5.003906 26 7.5 C 26 9.996094 23.996094 12 21.5 12 C 19.003906 12 17 9.996094 17 7.5 C 17 5.003906 19.003906 3 21.5 3 Z M 9 5 C 10.667969 5 12 6.332031 12 8 C 12 9.667969 10.667969 11 9 11 C 7.332031 11 6 9.667969 6 8 C 6 6.332031 7.332031 5 9 5 Z M 9 15 C 5.15625 15 2 18.15625 2 22 L 2 34 C 2 34.550781 2.449219 35 3 35 L 13 35 L 13 40 C 13 40.550781 13.449219 41 14 41 L 24 41 L 24 49 C 24 49.550781 24.449219 50 25 50 L 47 50 C 47.550781 50 48 49.550781 48 49 L 48 31 C 48 24.363281 42.636719 19 36 19 C 33.4375 19 31.179688 19.914063 29.253906 21.269531 C 27.964844 18.183594 25 16 21.5 16 C 18.945313 16 16.738281 17.132813 15.1875 18.851563 C 14.023438 16.570313 11.6875 15 9 15 Z M 9 17 C 11.417969 17 13.503906 18.757813 13.917969 21.078125 C 13.988281 21.492188 14.316406 21.816406 14.734375 21.886719 C 15.148438 21.957031 15.5625 21.761719 15.769531 21.390625 C 16.910156 19.378906 18.96875 18 21.5 18 C 24.542969 18 27.136719 20.082031 27.828125 22.9375 C 27.910156 23.277344 28.167969 23.550781 28.503906 23.65625 C 28.839844 23.757813 29.203125 23.679688 29.46875 23.445313 C 31.1875 21.90625 33.4375 21 36 21 C 41.566406 21 46 25.433594 46 31 L 46 48 L 26 48 L 26 40 C 26 39.449219 25.550781 39 25 39 L 15 39 L 15 34 C 15 33.449219 14.550781 33 14 33 L 4 33 L 4 22 C 4 19.246094 6.246094 17 9 17 Z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Groups</span>
                        </a> */}
                        {/* <a class={page == "StudentFeedbacks" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/viewfeedback">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                               
                            </svg>
                            <span class="ml-2 text-sm font-medium">Feedback</span>
                        </a> */}
                        {/* <a class={page == "StudentMeetings" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="https://cdap-app-365.herokuapp.com/">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M 22 1 L 22 9 L 20 9 L 20 11 L 23.265625 11 L 11.070312 32.001953 A 1.0001 1.0001 0 0 0 11 32 C 11 32 7.4906773 31.93328 5.8320312 29.445312 A 1.0001 1.0001 0 0 0 4.9882812 28.988281 A 1.0001 1.0001 0 0 0 4.1679688 30.554688 C 5.8148272 33.024975 8.4980182 33.712392 9.9609375 33.910156 L 5.2636719 42 L 17.820312 42 L 17.191406 45.767578 L 14.242188 45.029297 A 1.0004596 1.0004596 0 1 0 13.757812 46.970703 L 17.757812 47.970703 A 1.0001 1.0001 0 0 0 18.986328 47.164062 L 19.847656 42 L 31.152344 42 L 32.013672 47.164062 A 1.0001 1.0001 0 0 0 33.316406 47.949219 L 36.316406 46.949219 A 1.0005646 1.0005646 0 1 0 35.683594 45.050781 L 33.792969 45.681641 L 33.179688 42 L 44.736328 42 L 40.039062 33.910156 C 41.501982 33.712392 44.185173 33.024975 45.832031 30.554688 A 1.0001 1.0001 0 0 0 44.980469 28.988281 A 1.0001 1.0001 0 0 0 44.167969 29.445312 C 42.509323 31.933282 39 32 39 32 A 1.0001 1.0001 0 0 0 38.931641 32.001953 L 26.734375 11 L 30 11 L 30 9 L 28 9 L 28 1 L 22 1 z M 24 3 L 26 3 L 26 9 L 24 9 L 24 3 z M 25 11.992188 L 29.076172 19.013672 C 27.985772 18.42057 26.645032 18 25 18 C 23.355581 18 22.01598 18.415717 20.927734 19.003906 L 25 11.992188 z M 25 20 C 29.201091 20 30.567224 22.905239 30.826172 23.503906 C 30.571931 24.104594 29.234449 27 25 27 C 20.761174 27 19.423719 24.095998 19.171875 23.5 C 19.423719 22.904002 20.761174 20 25 20 z M 25 20 C 25 20 24 21.75 24 23.5 C 24 25.25 25 27 25 27 C 25 27 26 25.25 26 23.5 C 26 21.75 25 20 25 20 z M 17.570312 24.787109 C 18.4835 26.263019 20.741233 29 25 29 C 29.258767 29 31.5165 26.263019 32.429688 24.787109 L 36.617188 32 L 13.382812 32 L 17.570312 24.787109 z M 12.222656 34 L 19 34 L 19 36 L 11.060547 36 L 12.222656 34 z M 21 34 L 29 34 L 29 36 L 21 36 L 21 34 z M 31 34 L 37.777344 34 L 38.939453 36 L 31 36 L 31 34 z M 40 37.826172 L 41.261719 40 L 37 40 L 37 38 L 40 38 L 40 37.826172 z M 9.9003906 38 L 13 38 L 13 40 L 8.7382812 40 L 9.9003906 38 z M 15 38 L 24 38 L 24 40 L 19.171875 40 A 1.0001 1.0001 0 0 0 18.953125 39.986328 A 1.0001 1.0001 0 0 0 18.833984 40 L 15 40 L 15 38 z M 26 38 L 35 38 L 35 40 L 32.154297 40 A 1.0001 1.0001 0 0 0 32.017578 39.986328 A 1.0001 1.0001 0 0 0 31.835938 40 L 26 40 L 26 38 z" />
                            </svg>
                            <span class="ml-2 text-sm font-medium">Schedule Meetings</span>
                        </a> */}
                        {/* <a class={page == "UpdateProfile" ? "flex items-center w-full h-12 px-3 mt-2 text-gray-400 bg-gray-700 text-gray-100 rounded" : "flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700"} href="/edituserprofile/:id">
                            <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 50 50" stroke="currentColor">
                                
                            </svg>
                            <span class="ml-2 text-sm font-medium">Update Profile</span>
                        </a> */}
                    </div>
                </div><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
                <a class="flex items-center justify-center w-full h-16 mt-auto bg-gray-800 hover:bg-gray-700">
                    <div class="border flex px-6 py-1 rounded-lg flex items-center" onClick={logOutHandler}>
                        <span class="ml-2 text-sm font-medium w-16">Log Out</span>
                        <svg class="w-6 h-6 stroke-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 25 25" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    
                </a>
            </div>

	
  
</div>
  )
}
