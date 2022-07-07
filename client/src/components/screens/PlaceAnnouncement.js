import React from 'react'
import { useState } from "react";
import axios from 'axios';
export default function PlaceAnnouncement() {

    const [title, setTitle] = useState("");
    const [description,setDescription] = useState("")
    const [announcementDate,setDate] = useState("");
    const [time ,setaTime] =useState("");
    const [deadline,setaDeadline]= useState("");
    const current = new Date();
    const announcementID = "62c66fa8957236a99937300a";
    const pdate = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
   
     //*******POST ANNOUNCEMENT HANDLER FUNCTION *******/
     const postAnnouncementHandler = async (e) => {
        e.preventDefault();
        try {
          
          const { data } = await axios.put(
            `/api/announcement/setAnnouncement/${announcementID}`,
            { title,description,announcementDate,deadline }
            );
            alert("Announcement Placed")
          console.log("Here is the data"+time)
         
        } catch (error) {
          // setError(error.response.data.error);  
          // console.log(error.response.data.error)
          alert("Error Announcement notset")
              
        }
      };








  return (
    <div className='bg-gray-900 w-130  h-[50rem] ' >
<form className='bg-gray-600 w-[35rem] absolute rounded top-[190px] right-[430px] h-auto' onSubmit={postAnnouncementHandler}>
 <br/>
  <div class="mb-6 w-56  bg-slate-200">
    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Announcement Topic</label>
    <input type="text" id="email" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light left-50"  required="" onChange={(e) => setTitle(e.target.value)}
          value={title}/>
  </div>
  <div class="mb-6">
    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Date</label>
    <input type="text" id="password" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setDate(e.target.value)}
          value={announcementDate}/>
  </div>
  {/* <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"> Time </label>
    <input type="text" id="time" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setaTime(e.target.value)}
          value={time} />
  </div> */}

  <div class="mb-6">
    <label for="repeat-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Deadline</label>
    <input type="text" id="deadline" class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" required="" onChange={(e) => setaDeadline(e.target.value)}
          value={deadline} />
  </div>


  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Description</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Leave a comment..." onChange={(e) => setDescription(e.target.value)}
          value={description}></textarea>

  <center>
  <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Post Announcement</button>
  </center>
</form>

       


    </div>
  )
}
