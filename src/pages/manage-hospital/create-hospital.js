import Axios from 'axios';
import React from "react";
import { Redirect } from 'react-router';
import { Alert, Button } from "reactstrap";
import './manage-hospital.css';
import s from "./manage-hospital.module.scss";

class CreateHospital extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: null,
        description: null
    }
  }

  createHospital(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/hospital/create`, {
      name: this.state.name,
      description: this.state.description
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/manage-hospital")
    .catch((error) => Alert(error));


  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="hospital-row2">
                <span className="hospital-key">Name:</span>
                <input 
                    className="create-hospital-value"
                    value={this.state.name}
                    type="text"
                    placeholder="Input name..."
                    onChange={event => { this.setState({name: event.target.value})}}
                />
            </div>
            <div className="hospital-row2">
                <span className="hospital-key">Description:</span>
                <textarea 
                    className="create-hospital-value"
                    value={this.state.description}
                    rows="3"
                    cols="30"
                    placeholder="Input description..."
                    onChange={event => { this.setState({description: event.target.value})}}
                />
            </div>
            {/* <div className="hospital-row2">
                <span className="hospital-key">Address:</span>
                <textarea 
                    className="create-hospital-value"
                    value={this.state.addressDetail}
                    rows="3"
                    cols="30"
                    placeholder="Input addressDetail..."
                    onChange={event => { this.setState({addressDetail: event.target.value})}}
                />
            </div> */}
            <div className="hospital-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createHospital(e)}>Save</Button>
                <a href="#/app/manage-hospital">
                  <Button color={""} type="button" className="mr-xs" size="sm">
                    Cancel
                  </Button>
                </a>
            </div>
        </form>
      </div>
    );
  }
}

export default CreateHospital;
