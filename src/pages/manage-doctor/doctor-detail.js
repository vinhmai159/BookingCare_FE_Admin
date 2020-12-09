import React from 'react';
import Axios from 'axios';
import s from './manage-doctor.module.scss';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class DoctorDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          fistName: null,
          lastName: null,
          description: null,
          expertise: null,
          hospital: null,
          addressDetail: null
        }
    }

    updateDoctor(doctorId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/doctor/admin/${doctorId}/update`, {
            fistName: this.state.fistName ? this.state.fistName : undefined,
            lastName: this.state.lastName ? this.state.lastName : undefined,
            description: this.state.description ? this.state.description : undefined,
            addressDetail: this.state.addressDetail ? this.state.addressDetail : undefined
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
            <div className="doctor-component">
                <form>
                    <div className="doctor-row">
                        <label className="doctor-key">Fist name:</label>
                        <input 
                            className="doctor-value"
                            type="text"
                            defaultValue={this.props.doctor ? this.props.doctor.fistName : null}
                            onChange={event => this.setState({ fistName: event.target.value }) }
                        />
                    </div>
                    <div className="doctor-row">
                        <label className="doctor-key">Last name:</label>
                        <input 
                            className="doctor-value"
                            type="text"
                            defaultValue={this.props.doctor ? this.props.doctor.lastName : null}
                            onChange={event => this.setState({ lastName: event.target.value }) }
                        />
                    </div>
                    <div className="doctor-row">
                        <label className="doctor-key">email:</label>
                        <input 
                            className="doctor-value"
                            type="text"
                            value={this.props.doctor ? this.props.doctor.email : null}
                        />
                    </div>
                    <div className="doctor-row">
                        <label className="doctor-key">Description:</label>
                        <input 
                            className="doctor-value"
                            type="text"
                            defaultValue={this.props.doctor ? this.props.doctor.description : null}
                            onChange={event => this.setState({ description: event.target.value }) }
                        />
                    </div>
                    <div className="doctor-row">
                        <label className="doctor-key">Expertise:</label>
                        <input 
                            className="doctor-value"
                            type="text"
                            defaultValue={this.props.doctor ? this.props.doctor.expertise.name : null}
                            onChange={event => this.setState({ expertise: event.target.value }) }
                        />
                    </div>
                    <div className="doctor-row">
                        <label className="doctor-key">Hospital:</label>
                        <input 
                            className="doctor-value"
                            type="text"
                            defaultValue={this.props.doctor ? this.props.doctor.hospital.name : null}
                            onChange={event => this.setState({ hospital: event.target.value }) }
                        />
                    </div>
                    <div className="doctor-row">
                        <label className="doctor-key">Address:</label>
                        <textarea 
                            className="doctor-value"
                            row="2"
                            col="25"
                            defaultValue={this.props.doctor ? this.props.doctor.addressDetail : null}
                            onChange={event => this.setState({ addressDetail: event.target.value }) }
                        />
                    </div>
                    <div className="doctor-button">
                        <Button  color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => { e.preventDefault(); this.updateDoctor(this.props.doctor.id); }}>Save</Button>
                        <Button  color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default DoctorDetail;
