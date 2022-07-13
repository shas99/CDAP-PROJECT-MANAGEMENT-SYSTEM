import React from 'react'
import { useState } from "react";
import axios from 'axios';
import Swal from 'sweetalert2'


export default function StaffPlaceAnnouncement() {
// CommonJS
const Swal = require('sweetalert2')
    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    const [announcementDate,setDate] = useState("");
    const [time ,setaTime] =useState("");
    const [deadline,setaDeadline]= useState("");
    const current = new Date();
    const announcementID = "62ce99ebde4f2a1d9e9bb84c";
    const pdate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
   
     //*******POST ANNOUNCEMENT HANDLER FUNCTION *******/
     const postAnnouncementHandler = async (e) => {
        e.preventDefault();
        try {
          
          
            //SUCCESS SWEET ALERT MESSAGE
            Swal.fire({
              title: 'Do you want to save the changes?',
              showDenyButton: true,
              showCancelButton: true,
              confirmButtonText: 'Save',
              denyButtonText: `Don't save`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                Swal.fire('Saved!', '', 'success')
                const { data } =  axios.put(
                  `/api/announcement/setAnnouncement/${announcementID}`,
                  { title,description,announcementDate,deadline }
                  );
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
              }
            })
         
        } catch (error) {
          // setError(error.response.data.error);  
          // console.log(error.response.data.error)
          alert("Error Announcement notset")
              
        }
      };








  return (
    <div className='bg-gray-900 w-130  h-[50rem] ' >
        <br/><br/><br/><br/> <br/> 
        <h1 className=' ml-[32rem] text-4xl text-gray-100 '>Post Annnouncement</h1>

        {/* SVG ICON */}
       
        <div class="ml-[54rem] mt-[-3rem]">
                                                                                    
                  <svg className="w-43 fill-indigo-500 " xmlns="http://www.w3.org/2000/svg" x="200px" y="550px " 
                         width="52px" height="52px" viewBox="0 0 52 52" enable-background="new 0 0 52 52" >
                     <g>
                         <path d="M22.7,45.4l-1.3-1c-1.4-1-1.4-3-1.4-4v-2.9c0-0.8-0.7-1.5-1.5-1.5h-6c-0.8,0-1.5,0.7-1.5,1.5v7.7
                             c0,2.7,1.6,4.8,4.1,4.8H20c2.9,0,3.1-2,3.1-2l0,0C23.1,48,23.6,46.2,22.7,45.4z"/>
                         <path d="M45,18V4.4c0,0,0,0,0-0.1c0-2.4-3-3.1-4.6-1.5l-8.9,8.4c-1.4,1.2-3.2,1.7-5,1.7H11.3C6.1,13,2,17.5,2,22.7
                             v0.2c0,5.2,4.1,9.1,9.3,9.1h15.2c1.9,0,3.7,0.8,5.1,2l8.8,8.6c1.6,1.6,4.6,1,4.6-1.4c0,0,0,0,0-0.1V27.6c3,0,4.8-2.1,4.8-4.8
                             C49.8,20.1,48,18,45,18z"/>
                     </g>
                     </svg>
                   
       
        </div>
<form className=' w-[35rem] absolute rounded top-[190px] right-[350px] h-auto' onSubmit={postAnnouncementHandler}>
 <br/>
  <div class="mb-6 w-56 ">
    <label for="email" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Announcement Topic</label>
    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-l rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-200 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light left-50"  required="" onChange={(e) => setTitle(e.target.value)}
          value={title}/>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Date</label>
    <input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setDate(e.target.value)}
          value={announcementDate}/>
  </div>
  {/* <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Time </label>
    <input type="text" id="time" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setaTime(e.target.value)}
          value={time} />
  </div> */}

  <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-300">Deadline</label>
    <input type="text" id="deadline" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setaDeadline(e.target.value)}
          value={deadline} />
  </div>


  <label for="message" class="block mb-2 text-l font-medium text-gray-900 dark:text-gray-400">Description</label>
<textarea id="message" rows="4" class="block p-2.5  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={(e) => setDescription(e.target.value)}
          value={description}></textarea>

  
  <button type="submit" class="text-white bg-purple-900 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">Post Announcement</button>

</form>

       


    </div>
  )
}
