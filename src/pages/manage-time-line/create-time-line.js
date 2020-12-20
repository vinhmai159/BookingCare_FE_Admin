import Axios from 'axios';
import React from "react";
import { Redirect } from 'react-router';
import { Alert, Button } from "reactstrap";
import './manage-time-line.css';
import s from "./manage-time-line.module.scss";

class CreateTimeLine extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      startTime: null,
      endTime: null
    }
  }

  createTimeLine(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/timeslot/create`, {
      startTime: this.state.startTime,
      endTime: this.state.endTime
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/manage-time-slot")
    .catch((error) => {
      if (error.response){
          alert(error.response.data.message);        
      } else {
          alert(error);
      } 
  });
  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="timeLine-row2">
                <span className="timeLine-key">Stat time:</span>
                <input 
                    className="create-timeLine-value"
                    value={this.state.email}
                    type="text"
                    placeholder="Input start time..."
                    onChange={event => { this.setState({startTime: event.target.value})}}
                />
            </div>
            <div className="timeLine-row2">
                <span className="timeLine-key">End time:</span>
                <input 
                    className="create-timeLine-value"
                    value={this.state.email}
                    type="text"
                    placeholder="Input end time..."
                    onChange={event => { this.setState({endTime: event.target.value})}}
                />
            </div>
            <div className="timeLine-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createTimeLine(e)}>Save</Button>
                <a href="#/app/manage-time-slot">
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

export default CreateTimeLine;
