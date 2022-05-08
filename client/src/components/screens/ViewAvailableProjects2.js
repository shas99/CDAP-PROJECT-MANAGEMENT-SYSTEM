import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewAvailableProjects.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


import React, { Component } from 'react'
import res from "express/lib/response";

export default class ViewAvailableProjects extends Component {

  constructor(props){

    super(props);
    
    this.state= {
    
    availableprojects:{},
    
    
    };
    
    }
    componentDidMount(){
        const id = this.props.match.params.id;

        axios.get(`/availableprojects/${id}`).then((res) => {
            if(res.data.success){
                this.setState({
                    availableprojects:res.data.availableprojects
                });
                console.log(this.state.availableprojects)

            }
        });
      
    }
    render() {
        const {
            projectName, projectDescription, projectBiddingCount 
         
        } = this.state.availableprojects;
        return (
          <div style={{ marginTop: '20px' }}>
            <h4>{projectName}</h4>
            <hr />
            <d1 className='row'>
              <dt className='col-sm-4'>Project description</dt>
              <dd className='col-sm-10'>{projectDescription}</dd>
    
              <dt className='col-sm-4'>projectBiddingCount</dt>
              <dd className='col-sm-10'>{projectBiddingCount}</dd>

            </d1>
    
            
           
          </div>
        );
      }
    }

  
