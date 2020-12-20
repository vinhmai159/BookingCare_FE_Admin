import React from 'react';
import Axios from 'axios';
import s from './manage-time-line.module.scss';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class TimeLineDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            startTime: null,
            endTime: null
        }
    }

    updateTimeLine(timeLineId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/timeslot/update/${timeLineId}`, {
            startTime: this.state.startTime ? this.state.startTime : undefined,
            endTime: this.state.endTime ? this.state.endTime : undefined,
        }, {
            headers: {
                'x-access-token': `bearer ${token}`
            }
        })
        .then(() => window.location.reload(false))
        .catch((error) => {
            if (error.response){
                alert(error.response.data.message);        
            } else {
                alert(error);
            } 
        });
    }

    handleRefresh = (e) => {
        e.preventDefault();

        window.location.reload(false)
    }

    render() {
        if (!this.props.showDetail) {
            return null;
        }
        return(
            <div className="timeLine-component">
                <form>
                    <div className="timeLine-row">
                        <label className="timeLine-key">Start time:</label>
                        <input 
                            className="timeLine-value"
                            type="text"
                            defaultValue={this.props.timeLine ? this.props.timeLine.name.slice(0,5) : null}
                            onChange={event => this.setState({ startTime: event.target.value }) }
                        />
                    </div>
                    <div className="timeLine-row">
                        <label className="timeLine-key">End time:</label>
                        <input 
                            className="timeLine-value"
                            type="text"
                            defaultValue={this.props.timeLine ? this.props.timeLine.name.slice(8,13) : null}
                            onChange={event => this.setState({ endTime: event.target.value }) }
                        />
                    </div>
                    <div className="timeLine-button">
                        <Button  color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => { e.preventDefault(); this.updateTimeLine(this.props.timeLine.id); }}>Save</Button>
                        <Button  color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default TimeLineDetail;
