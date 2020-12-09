import React from 'react';
import Axios from 'axios';
import s from './manage-admin.module.scss';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class AdminDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null,
          phoneNumber: null
        }
    }

    updateAdmin(adminId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/api/admin/${adminId}/update`, {
            name: this.state.name ? this.state.name : undefined,
            phoneNumber: this.state.phoneNumber ? this.state.phoneNumber : undefined
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
            <div className="admin-component">
                <form>
                    <div className="admin-row">
                        <label className="admin-key">Name:</label>
                        <input 
                            className="admin-value"
                            type="text"
                            defaultValue={this.props.admin ? this.props.admin.name : null}
                            onChange={event => this.setState({ name: event.target.value }) }
                        />
                    </div>
                    <div className="admin-row">
                        <label className="admin-key">Phone number:</label>
                        <input 
                            className="admin-value"
                            type="text"
                            defaultValue={this.props.admin ? this.props.admin.phoneNumber : null}
                            onChange={event => this.setState({ phoneNumber: event.target.value }) }
                        />
                    </div>
                    <div className="admin-button">
                        <Button  color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => { e.preventDefault(); this.updateAdmin(this.props.admin.id); }}>Save</Button>
                        <Button  color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default AdminDetail;
