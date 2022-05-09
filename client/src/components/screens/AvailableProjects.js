import axios from 'axios';
import React, { Component } from 'react'

export default class AvailableProjects extends Component {

  constructor(props) {
    super(props);

    this.state = {
      availableprojects: [],
    };
  } 
  componentDidMount() {
    this.retrieveAvailableProjects();
  }
  retrieveAvailableProjects() {
    axios.get('http://localhost:5000/api/AvailableProject/availableProjects').then((res) => {
      if (res.data.success) {
        this.setState({
          availableprojects: res.data
        });

        console.log(this.state.availableprojects)
      }
    });
  }

  render() {
    console.log('State: ', this.state);
    return (
      <div>AvailableProjects

      {this.state.availableprojects}
      {console.log(this.state.availableprojects)}
      </div>
    )
  }
}
