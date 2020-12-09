import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Switch, Route, withRouter, Redirect } from "react-router";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Hammer from "rc-hammerjs";

import Sidebar from "../Sidebar";
import {
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from "../../actions/navigation";
import s from "./Layout.module.scss";
import BreadcrumbHistory from "../BreadcrumbHistory";

// pages
import ManageUser from "../../pages/manage-user/manage-user";
import UserDetail from "../../pages/manage-user/user-detail";
import ManageDoctor from "../../pages/manage-doctor/manage-doctor";
import CreateDoctor from "../../pages/manage-doctor/create-doctor";
import ManageArticles from "../../pages/manage-article/manage-article";
import CreateArticles from "../../pages/manage-article/create-article";
import ManageTimeLine from "../../pages/manage-time-line/manage-time-line";
import ManageHospital from "../../pages/manage-hospital/manage-hospital";
import CreateHospital from "../../pages/manage-hospital/create-hospital";
import ManageExpertise from "../../pages/manage-expertise/manage-expertise";
import CreateExpertise from "../../pages/manage-expertise/create-expertise";
import ManageCategory from "../../pages/manage-category/manage-category";
import CreateCategory from "../../pages/manage-category/create-category";
import ManageAdmin from "../../pages/manage-admin/manage-admin";
import CreateAdmin from "../../pages/manage-admin/create-admin";

class Layout extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
  };

  constructor(props) {
    super(props);

    this.handleSwipe = this.handleSwipe.bind(this);
    this.handleCloseSidebar = this.handleCloseSidebar.bind(this);
  }

  componentDidMount() {

    this.handleResize();
    window.addEventListener("resize", this.handleResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize.bind(this));
  }

  handleResize() {
    if (window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    } else if (window.innerWidth >= 768) {
      this.props.dispatch(openSidebar());
    }
  }

  handleCloseSidebar(e) {
    if (e.target.closest("#sidebar-drawer") == null && this.props.sidebarOpened && window.innerWidth <= 768) {
      this.props.dispatch(toggleSidebar());
    }
  }

  handleSwipe(e) {
    if ("ontouchstart" in window) {
      if (e.direction === 4) {
        this.props.dispatch(openSidebar());
        return;
      }

      if (e.direction === 2 && this.props.sidebarOpened) {
        this.props.dispatch(closeSidebar());
        return;
      }
    }
  }

  render() {
    return (
      <div
        className={[
          s.root,
          !this.props.sidebarOpened ? s.sidebarClose : "",
          "flatlogic-one",
          "dashboard-light",
        ].join(" ")}
        onClick={e => this.handleCloseSidebar(e)}
      >
        <Sidebar />
        <div className={s.wrap}>
          {/* <Header /> */}

          <Hammer onSwipe={this.handleSwipe}>
            <main className={s.content}>
              <BreadcrumbHistory url={this.props.location.pathname} />
              <TransitionGroup>
                <CSSTransition
                  key={this.props.location.key}
                  classNames="fade"
                  timeout={200}
                >
                  <Switch>
                    <Route
                      path="/app/main"
                      exact
                      render={() => <Redirect to="/app/manage-doctor" />}
                    />

                    <Route path={"/app/manage-admin/create"} component={CreateAdmin} />
                    <Route path={"/app/manage-admin"} exact component={ManageAdmin} />

                    <Route path={"/app/manage-user/detail"}  component={UserDetail} />
                    <Route path={"/app/manage-user"} component={ManageUser} />

                    <Route path={"/app/manage-doctor/create"} component={CreateDoctor} />
                    <Route path={"/app/manage-doctor"} component={ManageDoctor} />

                    <Route path={"/app/manage-article/create"} component={CreateArticles} />
                    <Route path={"/app/manage-article"} component={ManageArticles} />

                    <Route path={"/app/manage-time-slot"} component={ManageTimeLine} />

                    <Route path={"/app/manage-hospital/create"} component={CreateHospital} />
                    <Route path={"/app/manage-hospital"} component={ManageHospital} />

                    <Route path={"/app/manage-expertise/create"} component={CreateExpertise} />
                    <Route path={"/app/manage-expertise"} component={ManageExpertise} />

                    <Route path={"/app/manage-category/create"} component={CreateCategory} />
                    <Route path={"/app/manage-category"} component={ManageCategory} />
                  </Switch>
                </CSSTransition>
              </TransitionGroup>
            </main>
          </Hammer>
        </div>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
  };
}

export default withRouter(connect(mapStateToProps)(Layout));
