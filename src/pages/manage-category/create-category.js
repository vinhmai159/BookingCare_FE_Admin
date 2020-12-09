import Axios from 'axios';
import React from "react";
import { Redirect } from 'react-router';
import { Alert, Button } from "reactstrap";
import './manage-category.css';
import s from "./manage-category.module.scss";

class CreateCategory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        name: null
    }
  }

  createCategory(e) {
    e.preventDefault();
    const token = localStorage.getItem('accessToken');
    Axios.post(`http://localhost:3069/category`, {
      name: this.state.name
    },{
      headers: {
        'x-access-token': `bearer ${token}` 
      }
    })
    .then(() => window.location.href = "#/app/manage-category")
    .catch((error) => Alert(error));


  }


  render() {
    return (
      <div className={s.root}>
        <form >
            <div className="category-row2">
                <span className="category-key">Name:</span>
                <input 
                    className="create-category-value"
                    value={this.state.name}
                    type="text"
                    placeholder="Input name..."
                    onChange={event => { this.setState({name: event.target.value})}}
                />
            </div>
            {/* <div className="category-row2">
                <span className="category-key">Description:</span>
                <textarea 
                    className="create-category-value"
                    value={this.state.description}
                    rows="3"
                    cols="30"
                    placeholder="Input description..."
                    onChange={event => { this.setState({description: event.target.value})}}
                />
            </div> */}
            <div className="category-button">
                <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.createCategory(e)}>Save</Button>
                <a href="#/app/manage-category">
                  <Button color={""} type="button" className="mr-xs" size="sm">
                    Cancel
                  </Button>
                </a>
            </div>
        </form>
      </div>
    );
  }
}

export default CreateCategory;
