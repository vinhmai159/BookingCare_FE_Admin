import Axios from 'axios';
import React from "react";
import { Redirect } from 'react-router';
import { Alert, Button } from "reactstrap";
import './manage-doctor.css';
import s from "./manage-doctor.module.scss";

class CreateDoctor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        fistName: null,
        lastName: null,
        description: null,
        addressDetail: null,
        expertiseId: null,
        hospitalId: null,
        email: null,
        password: null
    }
  }

  createDoctor(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/doctor/create`, {
      fistName: this.state.fistName,
      lastName: this.state.lastName,
      description: this.state.description,
      addressDetail: this.state.addressDetail,
      expertiseId: this.state.expertiseId ? this.state.expertiseId : undefined,
      hospitalId: this.state.hospitalId ? this.state.hospitalId: undefined,
      email: this.state.email,
      password: this.state.password
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/manage-doctor")
    .catch((error) => Alert(error));


  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="doctor-row2">
                <span className="doctor-key">Email:</span>
                <input 
                    className="create-doctor-value"
                    value={this.state.email}
                    type="text"
                    placeholder="Input email..."
                    onChange={event => { this.setState({email: event.target.value})}}
                />
            </div>
            <div className="doctor-row2">
                <span className="doctor-key">Password:</span>
                <input 
                    className="create-doctor-value"
                    value={this.state.password}
                    type="text"
                    placeholder="Input password..."
                    onChange={event => { this.setState({password: event.target.value})}}
                />
            </div>
            <div className="doctor-row2">
                <span className="doctor-key">Fist name:</span>
                <input 
                    className="create-doctor-value"
                    value={this.state.fistName}
                    type="text"
                    placeholder="Input fistName..."
                    onChange={event => { this.setState({fistName: event.target.value})}}
                />
            </div>
            <div className="doctor-row2">
                <span className="doctor-key">Last name:</span>
                <input 
                    className="create-doctor-value"
                    value={this.state.lastName}
                    type="text"
                    placeholder="Input lastName..."
                    onChange={event => { this.setState({lastName: event.target.value})}}
                />
            </div>
            <div className="doctor-row2">
                <label for="expertise" className="doctor-key">Choose a expertise:</label>
                <select name="expertise" id="expertiseId" className="create-doctor-value">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
            </div>
            <div className="doctor-row2">
                <label for="hospital" className="doctor-key">Choose a hospital:</label>
                <select name="hospital" id="hospitalId" className="create-doctor-value">
                  <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                </select>
            </div>
            <div className="doctor-row2">
                <span className="doctor-key">Description:</span>
                <textarea 
                    className="create-doctor-value"
                    value={this.state.description}
                    rows="3"
                    cols="30"
                    placeholder="Input description..."
                    onChange={event => { this.setState({description: event.target.value})}}
                />
            </div>
            <div className="doctor-row2">
                <span className="doctor-key">Address:</span>
                <textarea 
                    className="create-doctor-value"
                    value={this.state.addressDetail}
                    rows="3"
                    cols="30"
                    placeholder="Input addressDetail..."
                    onChange={event => { this.setState({addressDetail: event.target.value})}}
                />
            </div>
            <div className="doctor-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createDoctor(e)}>Save</Button>
                <a href="#/app/manage-doctor">
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

export default CreateDoctor;
