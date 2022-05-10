import axios from 'axios';
import React, { Component } from 'react'

export default class ProjectBidding extends Component {
    constructor(props) {
        super(props);

        this.state = {
            availableproject:[]
        };
    }
    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`/api/AvailableProject/availableprojects/${id}`).then((res)=>{
           
        if(res.data.success){
                this.setState({
                        availableproject:res.data.availableProjects
                });
                console.log(this.state.availableproject);
                
            }
            
           
        });
     
                
    }


  render() {
    const { projectName,projectDescription,projectBiddingCount,projectSupervisedBy,projectType,publishedDate} =this.state.availableproject;

    return (
      <div>ProjectBidding
          <h1> Project Name :{projectName}</h1>
          <h1>{projectDescription}</h1>
          <h1>{projectBiddingCount}</h1>
          <h1>{projectSupervisedBy}</h1>
          <h1>{projectType}</h1>
          <h1>{publishedDate}</h1>
          
          
      </div>

    )
  }
}
