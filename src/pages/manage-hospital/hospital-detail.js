import React from 'react';
import Axios from 'axios';
import s from './manage-hospital.module.scss';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class HospitalDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null,
          description: null,
        }
    }

    updateHospital(hospitalId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/hospital/admin/${hospitalId}/update`, {
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
            <div className="hospital-component">
                <form>
                    <div className="hospital-row">
                        <label className="hospital-key">Name:</label>
                        <input 
                            className="hospital-value"
                            type="text"
                            defaultValue={this.props.hospital ? this.props.hospital.name : null}
                            onChange={event => this.setState({ name: event.target.value }) }
                        />
                    </div>
                    <div className="hospital-row">
                        <label className="hospital-key">Description:</label>
                        <input 
                            className="hospital-value"
                            type="text"
                            defaultValue={this.props.hospital ? this.props.hospital.description : null}
                            onChange={event => this.setState({ description: event.target.value }) }
                        />
                    </div>
                    <div className="hospital-button">
                        <Button  color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => { e.preventDefault(); this.updateHospital(this.props.hospital.id); }}>Save</Button>
                        <Button  color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default HospitalDetail;
