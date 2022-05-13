import axios from 'axios';
import React from 'react'
import "./GroupScreen.css";
import { useState } from "react";
export default function ProjectBidding() {
  const [bidPlacedGroup, setBiddingPlacedGroup] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [error, setError] = useState("");

    const biddingPlaceHandler = async (e) => {
      e.preventDefault();
  
  
      try {
        const id = "624c562f87fc2a19cc03813a";
        const { data } = await axios.put(
          "http://localhost:5000/api/AvailableProject/availableProjects/placeBidding/627629c761d1ab9d2934088d",
          { bidPlacedGroup,date,time }
          
        );
        console.log(data)
        console.log(bidPlacedGroup)
       
      } catch (error) {
        setError(error.response.data.error);  
        alert("Error bidding notset")
            
      }
    };

  return (
    <div>ProjectBidding
          {/* Form  */}
          <form onSubmit={biddingPlaceHandler} >
      <h3 >Group registration</h3>
     
      <div >
        <label>
          Your Group ID:</label>
          <input type="text" 
          className = "input"
          name="name" 
          onChange={(e) => setBiddingPlacedGroup(e.target.value)}
          value={bidPlacedGroup} />
          
        
        </div>
        <div >
        <label>
           Date:</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setDate(e.target.value)}
          value={date} />
          
        
          </div>
          <div >
        <label>
           Time :</label>
          <input type="text" 
          name="name" 
          className = "input"
          onChange={(e) => setTime(e.target.value)}
          value={time} />
                  
                  </div>
      <button type="submit" className="btn btn-primary1" id="Log1Button">
         Place Bid
         </button>

        
      </form>

    </div>
  )
}
