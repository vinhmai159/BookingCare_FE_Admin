import Axios from 'axios';
import React from "react";
import { Redirect } from 'react-router';
import { Alert, Button } from "reactstrap";
import './manage-admin.css';
import s from "./manage-admin.module.scss";

class CreateAdmin extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: null,
        phoneNumber: null,
        userName: null,
        password: null
    }
  }

  createAdmin(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/api/admin/create`, {
      name: this.state.name,
      phoneNumber: this.state.phoneNumber,
      description: this.state.description,
      userName: this.state.userName,
      password: this.state.password
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/manage-admin")
    .catch((error) => Alert(error));


  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="admin-row2">
                <span className="admin-key">User name:</span>
                <input 
                    className="create-admin-value"
                    value={this.state.userName}
                    type="text"
                    placeholder="Input user name..."
                    onChange={event => { this.setState({userName: event.target.value})}}
                />
            </div>
            <div className="admin-row2">
                <span className="admin-key">Password:</span>
                <input 
                    className="create-admin-value"
                    value={this.state.password}
                    type="text"
                    placeholder="Input password..."
                    onChange={event => { this.setState({password: event.target.value})}}
                />
            </div>
            <div className="admin-row2">
                <span className="admin-key">Name:</span>
                <input 
                    className="create-admin-value"
                    value={this.state.name}
                    type="text"
                    placeholder="Input name..."
                    onChange={event => { this.setState({name: event.target.value})}}
                />
            </div>
            <div className="admin-row2">
                <span className="admin-key">Phone number:</span>
                <input 
                    className="create-admin-value"
                    value={this.state.phoneNumber}
                    type="text"
                    placeholder="Input phone number..."
                    onChange={event => { this.setState({phoneNumber: event.target.value})}}
                />
            </div>
            <div className="admin-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createAdmin(e)}>Save</Button>
                <a href="#/app/manage-admin">
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

export default CreateAdmin;
