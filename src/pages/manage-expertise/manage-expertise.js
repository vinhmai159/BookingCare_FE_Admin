import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-expertise.css';
import s from './manage-expertise.module.scss';
import ExpertiseDetail from './expertise-detail';

class ManageExpertise extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          expertises: [],
          expertise: null,
          name: null,
          showDetail: false
        }

        this.getExpertises()
    }

    getExpertises() {
        const token = localStorage.getItem('accessToken');
        Axios.post('http://localhost:3069/expertise', {
          name: this.state.name,
        }, {
          headers: {
            'x-access-token': `bearer ${token}`
        }
        })
        .then((json) => this.setState({expertises: json.data[0]}))
        .catch((error) => alert(error));
    }

    deleteExpertise(expertiseId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/expertise/${expertiseId}/delete`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getExpertise(expertise) {
        this.setState({expertise, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="expertise-header">
          <Form className={``} inline onSubmit={e => { e.preventDefault(); this.getExpertises()}}>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
              onChange={event => {this.setState({name: event.target.value});}}
            />
            <Button color={"warning"} className="mr-xs btn-search" size="sm" >
              <i className="fa fa-search"></i>
            </Button>
          </Form>
          <a href="#/app/manage-expertise/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new expertise 
            </Button>
          </a>
        </div>
        <Table responsive>
          <thead>
            <tr className="fs-sm">
              <th className="hidden-sm-down">#</th>
              <th className="hidden-sm-down">Created at</th>
              <th className="hidden-sm-down">Name</th>
              <th className="hidden-sm-down">Actions</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.expertises === [] ? <div></div> : this.state.expertises.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down expertise-cell">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down expertise-cell">{item.name}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getExpertise(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteExpertise(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <ExpertiseDetail expertise={this.state.expertise} showDetail={this.state.showDetail}></ExpertiseDetail>
      </div>
      );
  }
};

export default ManageExpertise;