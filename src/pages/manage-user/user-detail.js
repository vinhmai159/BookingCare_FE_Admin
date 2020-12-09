import React from 'react';
import Axios from 'axios';
import s from './manage-user.module.scss';
import './user-detail.css';
import { Alert, Button, Form, Input, Table } from "reactstrap";

class UserDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          fistName: null,
          lastName: null,
          birthday: null,
          gender: null,
          address: null
        }
    }

    updateUser(userId) {
        const token = localStorage.getItem('accessToken');
        Axios.put(`http://localhost:3069/user/admin/${userId}/update`, {
            fistName: this.state.fistName ? this.state.fistName : null,
            lastName: this.state.lastName ? this.state.lastName : null,
            birthday: this.state.birthday ? this.state.birthday : null,
            gender: this.state.gender ? this.state.gender : null,
            address: this.state.address ? this.state.address : null
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
            <div className="user-detail-component">
                <form>
                    <div className="user-detail-row">
                        <label className="user-detail-key">Fist name:</label>
                        <input 
                            className="user-detail-value"
                            type="text"
                            defaultValue={this.props.user ? this.props.user.fistName : null}
                            onChange={event => this.setState({ fistName: event.target.value }) }
                        />
                    </div>
                    <div className="user-detail-row">
                        <label className="user-detail-key">Last name:</label>
                        <input 
                            className="user-detail-value"
                            type="text"
                            defaultValue={this.props.user ? this.props.user.lastName : null}
                            onChange={event => this.setState({ lastName: event.target.value }) }
                        />
                    </div>
                    <div className="user-detail-row">
                        <label className="user-detail-key">email:</label>
                        <input 
                            className="user-detail-value"
                            type="text"
                            value={this.props.user ? this.props.user.email : null}
                        />
                    </div>
                    <div className="user-detail-row">
                        <label className="user-detail-key">Birthday:</label>
                        <input 
                            className="user-detail-value"
                            type="text"
                            defaultValue={this.props.user ? this.props.user.birthday : null}
                            onChange={event => this.setState({ birthday: event.target.value }) }
                        />
                    </div>
                    <div className="user-detail-row">
                        <label className="user-detail-key">Gender:</label>
                        <input 
                            className="user-detail-value"
                            type="text"
                            defaultValue={this.props.user ? this.props.user.gender : null}
                            onChange={event => this.setState({ gender: event.target.value }) }
                        />
                    </div>
                    <div className="user-detail-row">
                        <label className="user-detail-key">Address:</label>
                        <textarea 
                            className="user-detail-value"
                            row="2"
                            col="25"
                            defaultValue={this.props.user ? this.props.user.address : null}
                            onChange={event => this.setState({ address: event.target.value }) }
                        />
                    </div>
                    <div className="user-detail-button">
                        <Button  color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => { e.preventDefault(); this.updateUser(this.props.user.id); }}>Save</Button>
                        <Button  color={""} type="button" className="mr-xs" size="sm" onClick={this.handleRefresh} >Cancel</Button>
                    </div>
                </form>
            </div>
        )
    }
}

export default UserDetail;
