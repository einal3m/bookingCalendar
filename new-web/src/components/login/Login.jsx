import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import './Login.css';
import LoginForm from './LoginForm';

class Login extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillUpdate(nextProps) {
    if (nextProps.authenticated) {
      this.context.router.history.push("/app");
    }
  }

  render() {
    return (
      <div className="login">
        <div className="row no-gutters">
          <div className="col-md-3 col-md-offset-3 banner">
            <img src={'images/login_banner.jpg'} alt="" />
          </div>
          <div className="col-md-3 form">
            <LoginForm />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    authenticated: state.authenticated
  }
};

export default connect(mapStateToProps)(Login);
