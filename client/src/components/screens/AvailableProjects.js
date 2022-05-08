import React, { Component } from 'react'
import axios from "axios";
export default class AvailableProjects extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          availableprojects: [],
        };
      }
    
  componentDidMount() {
    this.viewAvailableProjects();
  }

  viewAvailableProjects() {
    axios.get("/AvailableProject/availableProjects").then((res) => {
      if (res.data.success) {
        this.setState({
          bookings: res.data.existingBookings,
        });
      }
    });
  }

  render() {
    return (
      <div>
          AvailableProjects
          <div>
                {/* display data in here */}
          </div>
      </div>
    )
  }
}
