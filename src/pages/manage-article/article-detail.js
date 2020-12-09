import Axios from 'axios';
import React from 'react';
import './article.css';
import s from "./article.module.scss";
import { Button } from "reactstrap";

class ArticleDetail extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          fistName: null,
          lastName: null,
          description: null,
          expertise: null,
          hospital: null,
          addressDetail: null
        }
    }

    // updateDoctor(doctorId) {
    //     const token = localStorage.getItem('accessToken');
    //     Axios.put(`http://localhost:3069/doctor/admin/${doctorId}/update`, {
    //         fistName: this.state.fistName ? this.state.fistName : undefined,
    //         lastName: this.state.lastName ? this.state.lastName : undefined,
    //         description: this.state.description ? this.state.description : undefined,
    //         addressDetail: this.state.addressDetail ? this.state.addressDetail : undefined
    //     }, {
    //         headers: {
    //             'x-access-token': `bearer ${token}`
    //         }
    //     })
    //     .then(() => window.location.reload(false))
    //     .catch((error) => alert(error));
    // }

    approve(e) {
        e.preventDefault();

        window.location.reload(false);
    }

    back = (e) => {
        e.preventDefault();

        // window.location.href = "#/app/manage-article"

        window.location.reload(false);
    }

    render() {
        if (!this.props.article) {
            alert('opp. Some thing wen\'t wrong')
        }
        return(
            <div className="">
                <div className="article">
                    <div className="article-title">
                        <h3>{this.props.article.title}</h3>
                    </div>
                    <div className="article-info">
                        <div className="article-info-left">
                            <div className="category">
                                <span className="article-info-key">Categories:</span>
                                {this.props.article.categories === [] ? <span></span> : this.props.article.categories.map((item) => (
                                    <span className="article-info-value">{item.name}</span>
                                ))}
                            </div>
                            <div className="tag">
                                <span className="article-info-key">Tags:</span>
                                {this.props.article.tags === [] ? <span></span> : this.props.article.tags.map((item) => (
                                    <span className="article-info-value">{item.name}</span>
                                ))}
                            </div>
                        </div>
                        <div className="article-info-right">
                            <div className="author">
                                <span className="article-info-key">Author:</span>
                                <span className="article-info-value">{this.props.article.doctor.fistName} {this.props.article.doctor.lastName}</span>
                            </div>
                            <div className="created-at">
                                <span className="article-info-key">Created at:</span>
                                <span className="article-info-value">{this.props.article.createAt}</span>
                            </div>
                        </div>
                    </div>
                    <div className="article-content">
                        {this.props.article.content}
                    </div>
                </div>
                <div className="article-button">
                    <Button color={"warning"} type="button" className="mr-xs" size="sm" onClick={e => this.approve(e)}>Approve</Button>
                    <a href="#/app/manage-article">
                    <Button color={""} type="button" className="mr-xs" size="sm" onClick={e => this.back(e)}>
                        Reject
                    </Button>
                    </a>
                </div>
            </div>
        )
    }
}

export default ArticleDetail;
