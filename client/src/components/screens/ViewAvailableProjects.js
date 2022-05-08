import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewAvailableProjects.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import React, { Component } from 'react'

export default class ViewAvailableProjects extends Component {

  constructor(props){

    super(props);
    
    this.state= {
    
    availableprojects: [],
    
    
    };
    
    }
    componentDidMount(){

      this.retrieveAvailableProjects();
      
      
      }
      retrieveAvailableProjects(){

        axios.get('/api/AvailableProject/availableProjects').then((res)=> {
        
        if(res.data.success){
        
        this.setState({
        
        availableprojects: res.AvailableProject
        
        });
        
        }
        
        });
        
        }
  render() {
    return (
      <div>
     {this.state.availableprojects}
     {this.retrieveAvailableProjects}
      
     
       </div>
      
     
 


     

    
    )
  }
}
