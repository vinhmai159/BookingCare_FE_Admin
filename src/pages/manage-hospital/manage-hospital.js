import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-hospital.css';
import s from './manage-hospital.module.scss';
import HospitalDetail from './hospital-detail';

class ManageHospital extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          hospitals: [],
          hospital: null,
          showDetail: false
        }

        this.getHospitals()
    }

    getHospitals() {
        const token = localStorage.getItem('accessToken');
        Axios.get('http://localhost:3069/hospital', {
            headers: {
                'x-access-token': `bearer ${token}`
            }
        })
        .then((json) => this.setState({hospitals: json.data[0]}))
        .catch((error) => alert(error));
    }

    deleteHospital(hospitalId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/hospital/${hospitalId}`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getHospital(hospital) {
        this.setState({hospital, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="hospital-header">
          <Form className={`d-md-down-none`} inline>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
            />
          </Form>
          <a href="#/app/manage-hospital/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new hospital 
            </Button>
          </a>
        </div>
        <Table responsive>
          <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">Created at</th>
              <th className="hidden-sm-down">Name</th>
              <th className="hidden-sm-down">Description</th>
              <th className="hidden-sm-down">Actions</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.hospitals === [] ? <div></div> : this.state.hospitals.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down hospital-cell create-at">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down hospital-cell">{item.name}</td>
                <td className="hidden-sm-down hospital-cell">{item.description}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getHospital(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteHospital(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <HospitalDetail hospital={this.state.hospital} showDetail={this.state.showDetail}></HospitalDetail>
      </div>
      );
  }
};

export default ManageHospital;