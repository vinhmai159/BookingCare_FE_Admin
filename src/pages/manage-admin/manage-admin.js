import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-admin.css';
import s from './manage-admin.module.scss';
import AdminDetail from './admin-detail';

class ManageAdmin extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          admins: [],
          admin: null,
          showDetail: false
        }

        this.getAdmins()
    }

    getAdmins() {
        const token = localStorage.getItem('accessToken');
        Axios.post('http://localhost:3069/api/admin',{}, {
            headers: {
                'x-access-token': `bearer ${token}`
            }
        })
        .then((json) => this.setState({admins: json.data[0]}))
        .catch((error) => alert(error));
    }

    deleteAdmin(adminId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/api/admin/${adminId}/delete`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getAdmin(admin) {
        this.setState({admin, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="admin-header">
          <Form className={`d-md-down-none`} inline>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
            />
          </Form>
          <a href="#/app/manage-admin/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new admin 
            </Button>
          </a>
        </div>
        <Table responsive>
          <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">Created at</th>
              <th className="hidden-sm-down">UserName</th>
              <th className="hidden-sm-down">Name</th>
              <th className="hidden-sm-down">Phone number</th>
              <th className="hidden-sm-down">Actions</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.admins === [] ? <div></div> : this.state.admins.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down admin-cell create-at">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down admin-cell">{item.userName}</td>
                <td className="hidden-sm-down admin-cell">{item.name}</td>
                <td className="hidden-sm-down admin-cell">{item.phoneNumber}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getAdmin(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteAdmin(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <AdminDetail admin={this.state.admin} showDetail={this.state.showDetail}></AdminDetail>
      </div>
      );
  }
};

export default ManageAdmin;