import React, { Component } from "react";
import axios from "axios";
import "./MatchedSupervisors.css";

export default class MatchedSupervisors extends Component{

    constructor(props){
        super(props);

        this.state={
            post:{}
        };
    }

    componentDidMount(){

        const id = this.props.match.params.id;

        axios.get(`api/auth/suggestsupervisor`).then((res) =>{
            if(res.data.success){
                this.setState({
                    post:res.data.post
                });
                console.log(this.state.post);
            }
        });

    }
  
  render(){

    const {groupID,SupervisorID,SupervisorName} = this.state.post;

    return(
      <div>
        <div>
            <h1>Matched Supervisors</h1>
        </div>

        <div>
            <table>
                <tr>
                    <th>Group ID</th>
                    <th>Matched Supervisors</th>
                </tr>
                <td></td>
                <td></td>
            </table>
        
        </div>
      </div>
    )
  } 

}