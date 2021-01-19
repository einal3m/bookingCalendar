import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";
import './login.css';

async function loginUser(credentials) {
 // return fetch('http://localhost:8080/login', {
 //   method: 'POST',
 //   headers: {
 //     'Content-Type': 'application/json'
 //   },
 //   body: JSON.stringify(credentials)
 // })
 //   .then(data => data.json())
  return {
    token: 'test123'
  };
}

function renderErrorMessage(errorMessage) {
  if (errorMessage) {
    return (
      <div className='error-message'>
        {errorMessage}
      </div>
    );
  }
  return undefined;
}

function Login({ setToken, errorMessage }) {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    setToken(token);
  }

  return (
    <div className="login">
      <div className="row no-gutters justify-content-center">
        <div className="col-sm-3 banner">
          <img src={'images/login_banner.jpg'} alt="" />
        </div>
        <div className="col-sm-3 form">
          <form id="login-form" onSubmit={handleSubmit}>
            <h1>Login</h1>
            <div className="form-group">
              <label htmlFor="inputUsername">Username</label>
              <input type="text" className="form-control" id="inputUsername" placeholder="Username" onChange={e => setUserName(e.target.value)} />
            </div>
            <div className="form-group">
              <label htmlFor="inputPassword">Password</label>
              <input type="password" className="form-control" id="inputPassword" placeholder="Password" onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <button type="submit" className="btn btn-outline-primary">Login</button>
            </div>
          </form>
          {renderErrorMessage(errorMessage)}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    errorMessage: state.notifications.get('errorMessage')
  }
};

export default connect(mapStateToProps)(Login);

Login.propTypes = {
  setToken: PropTypes.func.isRequired
}
