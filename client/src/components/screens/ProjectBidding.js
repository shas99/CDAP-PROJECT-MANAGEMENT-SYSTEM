import axios from 'axios';
import React, { Component } from 'react'

export default class ProjectBidding extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            availableproject:[],
            biddingdetails:[]
           
          
        };
       
    }

    placeBid =(e)=>{
      e.preventDefault();

      try{
        //Decode user token 
        //Take users student ID
        //pass it to bidplacedGroup id as data
        //pass data to axios.put()
       
      }
      catch(error){

      }
    }
   
   
 

  

componentDidMount(){

        const id = this.props.match.params.id;
        axios.get(`/api/AvailableProject/availableprojects/${id}`).then((res)=>{
        if(res.data.success){
                this.setState({
                        availableproject:res.data.availableProjects,
                        biddingdetails:res.data.availableProjects.bidding
                });
                // console.log(this.state.biddingdetails);   
            }    
        });
    }


  render() {
    const { projectName,projectDescription,projectBiddingCount,projectSupervisedBy,projectType,publishedDate} =this.state.availableproject;
     const{biddingPlacedGroup, date,time}=this.state.biddingdetails
    return (
     

      <div>ProjectBidding
          <h1> Project Name :{projectName}</h1>
          <h1>{projectDescription}</h1>
          <h1>{projectBiddingCount}</h1>
          <h1>{projectSupervisedBy}</h1>
          <h1>{projectType}</h1>
          <h1>{publishedDate}</h1>
          <br/>
          {/* Bidding function is called to this project upon onclick 
           */}
           

           <button type="submit" onClick={this.placeBid}>
             Place Bid
           </button>

           <br/>
           <h2>Current Bids</h2>
           <h1>{biddingPlacedGroup}</h1>
          <h1>{date}</h1>
          <h1>{time}</h1>
          

      </div>

    )
  }
}
