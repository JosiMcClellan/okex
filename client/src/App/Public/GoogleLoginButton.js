import React from 'react';
import PropTypes from 'prop-types';
import GoogleLogin from 'react-google-login';

const GoogleLoginButton = ({ handleLogin }) => (
  <GoogleLogin
    clientId="217438866959-01hptf1hcckc8k6cjs2qte7ecchruqdd.apps.googleusercontent.com"
    responseType="code"
    scope="email"
    fetchBasicProfile={false}
    onSuccess={handleLogin}
    onFailure={console.log}
    className="login"
    tag="div"
  >
    <img alt="Sign In with Google" src="google_sign_in.png" />
  </GoogleLogin>
);
GoogleLoginButton.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};

export default GoogleLoginButton;
