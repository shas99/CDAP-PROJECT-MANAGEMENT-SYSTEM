import { useState, useEffect } from "react";
import axios from "axios";
import "./PrivateScreen.css"
import "./ViewAvailableProjects.css"
import Header from "../Header/Header";
import Footer from "../Footer/Footer";


const ViewAvailableProjects = ({history}) =>{
  const [ProjectsData, setProjectsData] = useState("")
  const [error, setError] = useState("");
  const [privateData, setPrivateData] = useState("");
  const [projectarray, setprojectarray] = useState("");
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
      } catch (error) {
        localStorage.removeItem("authToken");
        setError("You are not authorized please login");
      }
    };

    const fetchProjectsData = async () =>{
      const projectsconfig = {
        headers: {
          "Content-Type":"application/json",
          Authorization:`Bearer ${localStorage.getItem("authToken")}`,
        },
      }

      try{
        const{data} = await axios.get("/api/AvailableProject/availableprojects",projectsconfig);
        //console.log(typeof data.data);
        const array = Object.entries(data.data)
        setProjectsData(data.data);
       // console.log(array);
        console.log( data.data);

        
       //console.log(objectToArray(data.data));

        
      }catch(error){

        
      }
    }
    fetchProjectsData()
    fetchPrivateDate()
  }, [history])
  const objectToArray = obj => {
    const keys = Object.keys(obj);
    const res = [];
    for(let i = 0; i < keys.length; i++){
       res.push(obj[keys[i]]);
       setprojectarray(res)
       console.log(projectarray);
      
       
       

    };
    return res; 

 };

//  const listItems = numbers.map((number) =>    <li>{number}</li>  )
// ;
// const projectitems = ProjectsData.map((project) => 
// <li>{project}</li>
// )
  return  error ? ( 
  
    <span className="error-message">{error}</span>
  ) :(
    <div >
      <Header/>
   {/* <br/><ul>{projectitems}</ul>  */}
      <h1 id="caption">All projects</h1>
      <br/><br/>
      <div className="card">
      <div className="container">
        <h4><b>Project 1 </b></h4> 
        <hr ></hr>
        {/* <p className="markscontent"> {fetchProjectsData[0].projectName}</p>   */}
        {/* <p className="markscontent"> {fetchProjectsData[0].projectDescription}</p>  */}
        {/* <p className="markscontent"> {fetchProjectsData[0].projectBiddingCount}</p>  */}
        {console.log(ProjectsData)}

        
         {/* <ul>
        {fetchProjectsData.map(project => {
          return (
            <li key={project._id}>
              {project.projectName}
            

            </li>

            
          )

        })} 
      </ul>  */}
      </div>
      </div>
      <br/>
      
      <br/>
     
      <br/><br/>
    


      <br/>
    
      
</div>
    
    
    
    
  )
}
export default ViewAvailableProjects;









/*import { useState, useEffect } from "react";
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
    
    availableprojects:[],
    
    
    };
    
    }
    componentDidMount(){

      this.retrieveAvailableProjects();
      
      
      }
      retrieveAvailableProjects(){

        axios.get('/api/AvailableProject/availableProjects').then((res)=> {
        
        if(res.data.success){
        
        this.setState({
        
        availableprojects: res.data.AvailableProject.availableprojects
        
        });
        
        }
        
        });
        
        }
  render() {
    const {
      projectName,
      projectDescription,
      projectBiddingCount
    } = this.retrieveAvailableProjects;

    return (
  
      <h4>{projectName}</h4>
    );
  }
}
/*
import React, { Component } from 'react';
import axios from 'axios';
import { useState, useEffect } from "react";


export default class ViewAvailableProjects extends Component {
  constructor(props) {
    super(props);

    this.state = {
      availableprojects: [],
    };
  }
  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/api/AvailableProject/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          availableprojects: res.data.ViewAvailableProjects,
        });
        console.log(this.state.availableprojects);
      }
    });
  }
 
  render() {
    const {
      projectName,
      projectDescription,
      projectBiddingCount
     
    } = this.state.availableprojects;
    return (
      <div style={{ marginTop: '20px' }}>
        <h4>{projectName}</h4>
        <hr />
        <d1 className='row'>
          <dt className='col-sm-4'>Project description</dt>
          <dd className='col-sm-10'>{projectDescription}</dd>

          <dt className='col-sm-4'>Project count</dt>
          <dd className='col-sm-10'>{this.state.projectBiddingCount}</dd>
        </d1>

  
         
      </div>
    );
  }
}*/

/*

import React from 'react';
import axios from 'axios';

class ViewAvailableProjects extends React.Component {
  state = {
    projectName: '',
    projectDescription: '',
    projectBiddingCount: ''
  };

  // componentDidMount = () => {
  //   this.getBlogPost();
  // };

  hello = () => {
    axios.get('/api/AvailableProject/availableprojects')
      .then((response) => {
        const data = response.data;
        this.setState({ posts: data });
        console.log(data);
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  displayAvailableProject = (availableprojects) => {

    if (!availableprojects.length) return null;

    return availableprojects.map((availableprojects, index) => (
      <div key={index} >
        <h3>{availableprojects.projectName}</h3>
        <h3>{availableprojects.projectDescription}</h3>
        <h3>{availableprojects.projectBiddingCount}</h3>
      </div>
    ));
  };


  render() {
    return (
      <>
        <h1>
          <button onClick={this.hello} class="btn btn-danger">click here to get data</button>
        </h1>

        <div className="blog-">
          {this.displayAvailableProject(this.state.availableprojects)}
          <table>
            <tr>
              <th>project name</th>
              <th>project description</th>
              <th>project projectBiddingCount</th>
            </tr>
            <tr>
              <td>rah098755@gmail.com</td>
              <td>8340251638</td>
            </tr>
            <tr>
              <td>kumar_rahulkkcs@yahoo.com</td>
              <td>78750251638</td>
            </tr>
            <tr>
              <td>anita@gmail.com</td>
              <td>9652251638</td>
            </tr>
          </table>
        </div>       
      </>
    )
  }
}


export default ViewAvailableProjects;*/
/*
import React from 'react';
import axios from 'axios';


class ViewAvailableProjects extends React.Component {
  state = {
    projectName: '',
    projectDescription: '',
    projectBiddingCount: '',
    projects: []
  };
  componentDidMount = () => {
    this.getProject();
  }
  getProject = () => {
    axios.get('/api/AvailableProject/availableprojects')
    .then((response) => {
      const data = response.data;
      this.setState({ projects: data});
      console.log('Data has been received');

    }).catch(()=>{
      alert('Error retrieving data')
    })
  }
  handleChange = ({ target }) => {
    const {name, value } = target;
    this.setState({ [name]: value})
  }

render{
  
    getProject = (projects) => {
      if(!projects.length) return null;

    

      return() projects.map((projects,index)=> (
        <div key={index} >
          <h1>{projects.projectName}</h1>
          <h1>{projects.projectDescription}</h1>
          <h1>{projects.projectBiddingCount}</h1>
          

        </div>
      ));
    };
  }

  }*/

  /*
  import React from 'react';
import axios from 'axios';




class ViewAvailableProjects extends React.Component {

  state = {
    projectName: '',
    projectDescription: '',
    projectBiddingCount: '',
    
    projects: []
  };

  componentDidMount = () => {
    this.getProjects();
  };


  getProjects = () => {
    axios.get('/api/AvailableProject/availableprojects')
      .then((response) => {
        const data = response.data;
        this.setState({ projects: data });
        console.log(data);
      })
      .catch(() => {
        alert('Error retrieving data!!!');
      });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

 getProjects = (projects) => {

    if (!projects.length) return null;


    return projects.map((projects, index) => (
      <div key={index} className="blog-post__display">
        <h3>{projects.projectName}</h3>
        <p>{projects.projectDescription}</p>
        <p>{projects.projectBiddingCount}</p>
      </div>
    ));
  };

  render() {

    console.log('State: ', this.state);

    //JSX
    return(
      <div className="app">
        <h2>Welcome to the best app ever</h2>
      

        <div className="blog-">
          {this.getProjects(this.state.projects)}
        </div>
      </div>
    );
  }
}


export default ViewAvailableProjects;*/
   
   
  