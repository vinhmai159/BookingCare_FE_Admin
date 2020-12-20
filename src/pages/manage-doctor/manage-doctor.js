import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-doctor.css';
import s from './manage-doctor.module.scss';
import DoctorDetail from './doctor-detail';

class ManageDoctor extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null,
          doctors: [],
          doctor: null,
          showDetail: false
        }

        this.getDoctors()
    }

    getDoctors() {
        const token = localStorage.getItem('accessToken');
        Axios.get('http://localhost:3069/doctor', {
            headers: {
                'x-access-token': `bearer ${token}`
            },
            params: {
              name: this.state.name !== '' ? this.state.name : null
            }
        })
        .then((json) => this.setState({doctors: json.data}))
        .catch((error) => alert(error));
    }

    deleteDoctor(doctorId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/doctor/${doctorId}/delete`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getDoctor(doctor) {
        this.setState({doctor, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="doctor-header">
          <Form className={`d-md-down-none`} inline onSubmit={e => { e.preventDefault(); this.getDoctors()}}>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
              onChange={event => { this.setState({name: event.target.value});}}
            />
            <Button color={"warning"} className="mr-xs btn-search" size="sm" ><i className="fa fa-search"></i></Button>
          </Form>
          <a href="#/app/manage-doctor/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new doctor 
            </Button>
          </a>
        </div>
        <Table responsive>
          <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">Created at</th>
              <th className="hidden-sm-down">Email</th>
              <th className="hidden-sm-down">Full name</th>
              <th className="hidden-sm-down">Expertise</th>
              <th className="hidden-sm-down">Hospital</th>
              <th className="hidden-sm-down">Actions</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.doctors === [] ? <div></div> : this.state.doctors.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down doctor-cell create-at">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down doctor-cell">{item.email}</td>
                <td className="hidden-sm-down doctor-cell">{item.fistName} {item.lastName}</td>
                <td className="hidden-sm-down doctor-cell">{item.expertise ? item.expertise.name : null}</td>
                <td className="hidden-sm-down doctor-cell">{item.hospital ? item.hospital.name : null}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getDoctor(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteDoctor(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <DoctorDetail doctor={this.state.doctor} showDetail={this.state.showDetail}></DoctorDetail>
      </div>
      );
  }
};

export default ManageDoctor;