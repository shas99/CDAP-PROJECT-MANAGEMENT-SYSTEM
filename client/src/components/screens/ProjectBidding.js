import axios from 'axios';
import React, { Component } from 'react'

export default class ProjectBidding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableproject:[],
            biddingdetails:[],
            biddingPlacedGroup:"",
            date:"",
            time:""
        };
    }
    
    onsubmit =(e)=>{
      e.preventDefault();
 
      const { biddingPlacedGroup,date,time} =this.state; 
      const data ={
         biddingPlacedGroup:biddingPlacedGroup,
         date:date,
         time:time
          
      }
      console.log(data);
      //console.log(this.state.MemberID);
      const id = this.props.match.params.id;
      axios.put(`http://localhost:5000/api/AvailableProject/availableProjects/placeBidding/${id}`, data).then((res)=>{
          if(res.data.success){
              alert(`New bidding placed`)
             
              
          }
      }).catch(error => {
          alert ("Empty fields are not accepted");
      });

      
  }
    
    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/api/AvailableProject/availableprojects/${id}`).then((res)=>{
           
        if(res.data.success){
                this.setState({
                        availableproject:res.data.availableProjects,
                        biddingdetails:res.data.availableProjects.bidding
                });
                console.log(this.state.biddingdetails);
                
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
          {/* Needs form input to place bidding details in order to place a bid */}
          <form>
                          <div className="form-group" style={{marginTop:'50px',marginBottom:'15px'}}>
                            <label for="emailC" style={{marginBottom:'5px',color:'#000'}}>Your Group ID :</label>
                                  <input type="email" 
                                  className="form-control" 
                                  name="CustomerEmail" 
                                  
                                  id="cEmail"
                                  defaultValue={this.state.biddingPlacedGroup}
                                  onChange={this.handleInputChange}  
                                  required/>
                          </div>
                          <div className="form-group">
                            <label for="cName" style={{marginBottom:'5px',color:'#000'}}>Date</label>
                                <input type="text" 
                                className="form-control" 
                               
                                id="cName" name="CustomerName" 
                                defaultValue= {this.state.date}  
                                onChange={this.handleInputChange} required/>
                        
                          </div>
                          <div className="form-group">
                            <label for="MobileNo">Time :</label>
                                <input type="tel" 
                                className="form-control" 
                                id="MobileNo"name="MobileNumber" 
                                defaultValue={this.state.time}  
                                onChange={this.handleInputChange}  required/>
                          </div>
                          <button  onClick={this.onsubmit}>
                              
                              &nbsp; Submit Bid
                          </button>

          </form>
          
          {/* Bidding function is called to this project upon onclick 
           */}
           <br/>
           <h2>Current Bids</h2>
           <h1>{biddingPlacedGroup}</h1>
          <h1>{date}</h1>
          <h1>{time}</h1>
          

      </div>

    )
  }
}
