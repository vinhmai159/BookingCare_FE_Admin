import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-time-line.css';
import s from './manage-time-line.module.scss';
import TimeLineDetail from './time-line-detail';

class ManageTimeLine extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          name: null,
          timeLines: [],
          timeLine: null,
          showDetail: false
        }

        this.getTimeLines()
    }

    getTimeLines() {
        const token = localStorage.getItem('accessToken');
        Axios.get('http://localhost:3069/timeslot', {
            headers: {
                'x-access-token': `bearer ${token}`
            },
            params: {
              name: this.state.name !== '' ? this.state.name : null
            }
        })
        .then((json) => this.setState({timeLines: json.data}))
        .catch((error) => alert(error));
    }

    deleteTimeLine(timeLineId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/timeslot/delete/${timeLineId}`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getTimeLine(timeLine) {
        this.setState({timeLine, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="timeLine-header">
          <Form className={`d-md-down-none`} inline onSubmit={e => { e.preventDefault(); this.getTimeLines()}}>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
              onChange={event => { this.setState({name: event.target.value});}}
            />
            <Button color={"warning"} className="mr-xs btn-search" size="sm" ><i className="fa fa-search"></i></Button>
          </Form>
          <a href="#/app/manage-time-slot/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new timeLine 
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
            {this.state.timeLines === [] ? <div></div> : this.state.timeLines.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down timeLine-cell">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down timeLine-cell">{item.name}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getTimeLine(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteTimeLine(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <TimeLineDetail timeLine={this.state.timeLine} showDetail={this.state.showDetail}></TimeLineDetail>
      </div>
      );
  }
};

export default ManageTimeLine;