import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { dismissAlert } from "../../actions/alerts";
import {
  changeActiveSidebarItem
} from "../../actions/navigation";
import { logoutUser } from "../../actions/user";
import accountIcon from "../../images/account.svg";
import darkCategory from '../../images/dark-category.svg';
import darkExpertise from '../../images/dark-expertise.svg';
import darkHospital from '../../images/dark-hospital.svg';
import darkDoctor from '../../images/doctor-dark.svg';
import lightDoctor from '../../images/doctor-light.svg';
import lightCategory from '../../images/light-category.svg';
import lightExpertise from '../../images/light-expertise.svg';
import lightHospital from '../../images/light-hospital.svg';
import logo from "../../images/logo.svg";
import logoutIcon from "../../images/logout.svg";
import settingsIcon from "../../images/settings.svg";
import darkTime from '../../images/time-dark.svg';
import lightTime from '../../images/time-light.svg';
import darkTypography from "../../images/Typography-dark.svg";
import lightTypography from "../../images/Typography.svg";
import darkUser from '../../images/user-dark.svg';
import lightUser from '../../images/user-light.svg';
import LinksGroup from "./LinksGroup/LinksGroup";
import s from "./Sidebar.module.scss";


class Sidebar extends React.Component {
  static propTypes = {
    sidebarStatic: PropTypes.bool,
    sidebarOpened: PropTypes.bool,
    dispatch: PropTypes.func.isRequired,
    activeItem: PropTypes.string,
    location: PropTypes.shape({
      pathname: PropTypes.string
    }).isRequired
  };

  static defaultProps = {
    sidebarStatic: true,
    sidebarOpened: true,
    activeItem: ""
  };

  constructor(props) {
    super(props);

    this.doLogout = this.doLogout.bind(this);
  }

  dismissAlert(id) {
    this.props.dispatch(dismissAlert(id));
  }

  doLogout() {
    this.props.dispatch(logoutUser());
  }

  render() {
    return (
        <div className={`${(!this.props.sidebarOpened && !this.props.sidebarStatic ) ? s.sidebarClose : ''} ${s.sidebarWrapper}`} id={"sidebar-drawer"}>
        <nav className={s.root}>
          <header className={s.logo}>
            <img src={logo} alt="logo" className={s.logoStyle} />
            <span>HEALTH&nbsp;</span> Care
          </header>
          <h5 className={s.navTitle}>FEATURE</h5>
          <ul className={s.nav}>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage admin"
              isHeader
              link="/app/manage-admin"
              index="main"
            >
              {window.location.href.includes("admin") ? (
                <img
                  src={darkDoctor}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightDoctor}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage doctor"
              isHeader
              link="/app/manage-doctor"
              index="main"
            >
              {window.location.href.includes("doctor") ? (
                <img
                  src={darkDoctor}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightDoctor}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage user"
              isHeader
              link="/app/manage-user"
              index="main"
            >
              {window.location.href.includes("user") ? (
                <img
                  src={darkUser}
                  alt="darkUser"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightUser}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage time slot"
              isHeader
              link="/app/manage-time-slot"
              index="main"
            >
              {window.location.href.includes("timeSlot") ? (
                <img
                  src={darkTime}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightTime}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage article"
              isHeader
              link="/app/manage-article"
              index="main"
            >
              {window.location.href.includes("article") ? (
                <img
                  src={darkTypography}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightTypography}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage hospital"
              isHeader
              link="/app/manage-hospital"
              index="main"
            >
              {window.location.href.includes("hospital") ? (
                <img
                  src={darkHospital}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightHospital}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage expertise"
              isHeader
              link="/app/manage-expertise"
              index="main"
            >
              {window.location.href.includes("expertise") ? (
                <img
                  src={darkExpertise}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightExpertise}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              activeItem={this.props.activeItem}
              header="Manage category"
              isHeader
              link="/app/manage-category"
              index="main"
            >
              {window.location.href.includes("category") ? (
                <img
                  src={darkCategory}
                  alt="darkDoctor"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={lightCategory}
                  alt="lightUser"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
          <ul className={s.downNav}>
            <hr />
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Settings"
              isHeader
              index="main"
            >
              <img
                src={settingsIcon}
                alt="lightDashboard"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Account"
              isHeader
            >
              <img
                src={accountIcon}
                alt="lightDashboard"
                width={"24px"}
                height={"24px"}
              />
            </LinksGroup>
            <LinksGroup
              onActiveSidebarItemChange={activeItem =>
                this.props.dispatch(changeActiveSidebarItem(activeItem))
              }
              header="Logout"
              isHeader
              onClick={() => this.doLogout()}
            >
              {window.location.href.includes("another-page") ? (
                <img
                  src={logoutIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <img
                  src={logoutIcon}
                  alt="lightDashboard"
                  width={"24px"}
                  height={"24px"}
                />
              )}
            </LinksGroup>
          </ul>
        </nav>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    sidebarOpened: store.navigation.sidebarOpened,
    sidebarStatic: store.navigation.sidebarStatic,
    alertsList: store.alerts.alertsList,
    activeItem: store.navigation.activeItem,
    navbarType: store.navigation.navbarType,
  };
}

export default withRouter(connect(mapStateToProps)(Sidebar));
