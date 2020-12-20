import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-user.css';
import s from './manage-user.module.scss';
import UserDetail from './user-detail';

class ManageUser extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          data: null,
          users: [],
          user: null,
          showDetail: false
        }

        this.getUsers()
    }

    getUsers() {
        const token = localStorage.getItem('accessToken');
        Axios.get('http://localhost:3069/user', {
            headers: {
                'x-access-token': `bearer ${token}`
            },
            params: {
              data: this.state.data !== '' ? this.state.data : null
            }
        })
        .then((json) => this.setState({users: json.data.data}))
        .catch((error) => alert(error));
    }

    deleteUser(userId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/user/${userId}`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getUser(user) {
        this.setState({user, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="user-header">
          <Form className={`d-md-down-none`} inline onSubmit={e => { e.preventDefault(); this.getUsers()}}>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
              onChange={event => { this.setState({data: event.target.value});}}
            />
            <Button color={"warning"} className="mr-xs btn-search" size="sm" ><i className="fa fa-search"></i></Button>
          </Form>
          {/* <a href="#/app/articles/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new article 
            </Button>
          </a> */}
        </div>
        <Table responsive>
          <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">created at</th>
              <th className="hidden-sm-down">email</th>
              <th className="hidden-sm-down">full name</th>
              <th className="hidden-sm-down">birthday</th>
              <th className="hidden-sm-down">address</th>
              <th className="hidden-sm-down">actions</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.users === [] ? <div></div> : this.state.users.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down user-cell create-at">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down user-cell">{item.email}</td>
                <td className="hidden-sm-down user-cell">{item.fistName} {item.lastName}</td>
                <td className="hidden-sm-down user-cell">{item.birthday}</td>
                <td className="hidden-sm-down user-cell">{item.address}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getUser(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteUser(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <UserDetail user={this.state.user} showDetail={this.state.showDetail}></UserDetail>
      </div>
      );
  }
};

export default ManageUser;