import React from 'react';
import Axios from 'axios';
import s from './manage-time-line.module.scss';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class TimeLineDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null
        }
    }

    updateTimeLine(timeLineId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/timeslot/update/${timeLineId}`, {
            name: this.state.name ? this.state.name : undefined,
        }, {
            headers: {
                'x-access-token': `bearer ${token}`
            }
        })
        .then(() => window.location.reload(false))
        .catch((error) => alert(error));
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
                        <label className="timeLine-key">Name:</label>
                        <input 
                            className="timeLine-value"
                            type="text"
                            defaultValue={this.props.timeLine ? this.props.timeLine.name : null}
                            onChange={event => this.setState({ name: event.target.value }) }
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
