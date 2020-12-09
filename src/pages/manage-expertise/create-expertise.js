import Axios from 'axios';
import React from "react";
import { Redirect } from 'react-router';
import { Alert, Button } from "reactstrap";
import './manage-expertise.css';
import s from "./manage-expertise.module.scss";

class CreateExpertise extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: null
    }
  }

  createExpertise(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/expertise/create`, {
      name: this.state.name
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/manage-expertise")
    .catch((error) => Alert(error));


  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="expertise-row2">
                <span className="expertise-key">Name:</span>
                <input 
                    className="create-expertise-value"
                    value={this.state.name}
                    type="text"
                    placeholder="Input name..."
                    onChange={event => { this.setState({name: event.target.value})}}
                />
            </div>
            {/* <div className="expertise-row2">
                <span className="expertise-key">Description:</span>
                <textarea 
                    className="create-expertise-value"
                    value={this.state.description}
                    rows="3"
                    cols="30"
                    placeholder="Input description..."
                    onChange={event => { this.setState({description: event.target.value})}}
                />
            </div> */}
            <div className="expertise-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createExpertise(e)}>Save</Button>
                <a href="#/app/manage-expertise">
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

export default CreateExpertise;
