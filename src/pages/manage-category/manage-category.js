import React from 'react';
import Axios from 'axios';
import { Alert, Button, Form, Input, Table } from "reactstrap";
import './manage-category.css';
import s from './manage-category.module.scss';
import CategoryDetail from './detail-category';

class ManageCategory extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          categories: [],
          category: null,
          name: null,
          showDetail: false
        }

        this.getCategories()
    }

    getCategories() {
        const token = localStorage.getItem('accessToken');
        Axios.get('http://localhost:3069/category', {
            headers: {
                'x-access-token': `bearer ${token}`
            },
            params: {
              name: this.state.name !== '' ? this.state.name : null
            }
        })
        .then((json) => this.setState({categories: json.data.data}))
        .catch((error) => alert(error));
    }

    deleteCategory(categoryId) {
        const token = localStorage.getItem('accessToken');
        Axios.delete(`http://localhost:3069/category/${categoryId}`, {
          headers: {
            'x-access-token': `bearer ${token}` 
          }
        })
        .then(() => window.location.reload(false))
        .catch((error) => Alert(error));
      }

      getCategory(category) {
        this.setState({category, showDetail: true});
      }


  render() {
    return (
        <div className={s.root}>
        <div className="category-header">
          <Form className={``} inline onSubmit={e => { e.preventDefault(); this.getCategories()}}>
            <Input
              id="search-input"
              placeholder="Search"
              style={{ borderBottomLeftRadius: 4, borderTopLeftRadius: 4 }}
              onChange={event => { this.setState({name: event.target.value});}}
            />
            <Button color={"warning"} className="mr-xs btn-search" size="sm" ><i className="fa fa-search"></i></Button>
          </Form>
          <a href="#/app/manage-category/create">
            <Button color={"warning"} type="button" className="mr-xs" size="sm">
              Create new category 
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
            {this.state.categories === [] ? <div></div> : this.state.categories.map((item, index) => (
              <tr className="fs-sm ">
                <td className="hidden-sm-down ">{index + 1}</td>
                <td className="hidden-sm-down category-cell">{(new Date(item.createAt)).toString()}</td>
                <td className="hidden-sm-down category-cell">{item.name}</td>
                <td className="hidden-sm-down">
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.getCategory(item); }}>
                    <a href="#">
                      <i className="fa fa-pencil"/>
                    </a>
                  </Button>
                  <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => {e.preventDefault(); this.deleteCategory(item.id); }}>
                    <i className="fa fa-trash-o"/>
                  </Button>
                </td>
              </tr>
            )) }
          </tbody>
        </Table>
        <CategoryDetail category={this.state.category} showDetail={this.state.showDetail}></CategoryDetail>
      </div>
      );
  }
};

export default ManageCategory;