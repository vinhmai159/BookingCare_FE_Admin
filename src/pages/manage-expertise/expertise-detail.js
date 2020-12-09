import React from 'react';
import Axios from 'axios';
import s from './manage-expertise.module.scss';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class ExpertiseDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null
        }
    }

    updateExpertise(expertiseId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/expertise/${expertiseId}/update`, {
            name: this.state.name ? this.state.name : undefined,
            description: this.state.description ? this.state.description : undefined
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
            <div className="expertise-component">
                <form>
                    <div className="expertise-row">
                        <label className="expertise-key">Name:</label>
                        <input 
                            className="expertise-value"
                            type="text"
                            defaultValue={this.props.expertise ? this.props.expertise.name : null}
                            onChange={event => this.setState({ name: event.target.value }) }
                        />
                    </div>
                    {/* <div className="expertise-row">
                        <label className="expertise-key">Description:</label>
                        <input 
                            className="expertise-value"
                            type="text"
                            defaultValue={this.props.expertise ? this.props.expertise.description : null}
                            onChange={event => this.setState({ description: event.target.value }) }
                        />
                    </div> */}
                    <div className="expertise-button">
                        <Button  color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => { e.preventDefault(); this.updateExpertise(this.props.expertise.id); }}>Save</Button>
                        <Button  color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ExpertiseDetail;
