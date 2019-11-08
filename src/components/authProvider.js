import React from 'react';
import PropTypes from 'prop-types';
import SignUp from './signup';

class AuthProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignUp: false,
      showLogin: false,
      showNewsLetter: false,
      snackbarVariant: 'success',
      snackbarMessage: '',
      openSnackbaar: false,
    };

    this.onLoginClick = this.onLoginClick.bind(this);
    this.onLoginOrSignupClick = this.onLoginOrSignupClick.bind(this);
    this.onLoginOrSignupGoogle = this.onLoginOrSignupGoogle.bind(this);
    this.onLoginOrSignupFacebook = this.onLoginOrSignupFacebook.bind(this);
    this.onSubscribeClick = this.onSubscribeClick.bind(this);
    this.handleCloseSnackbar = this.handleCloseSnackbar.bind(this);
  }

  handleCloseSnackbar() {
    console.log('On snackbar close');
    this.setState({ openSnackbaar: false });
  }

  onLoginClick() {
    console.log('Login Clicked');
    this.setState({ showSignUp: true });
  }

  login(username, password) {
    const postData = { password, username };
    const body = Object.keys(postData)
      .map(key => {
        return (
          encodeURIComponent(key) + '=' + encodeURIComponent(postData[key])
        );
      })
      .join('&');

    var url = `http://localhost:8080/login`;
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }).then(response => {
      if (response.status === 200) Promise.resolve();
      else Promise.reject();
    });
  }

  onLoginOrSignupClick(state) {
    console.log('Sign up clicked', state);
    this.login(state.email, state.password)
      .then(s => {
        console.log('Logged In');
      })
      .catch(s => {
        console.log('Error logging in');
      });
  }

  onLoginOrSignupFacebook(state) {
    console.log('Facebook clicked');
  }

  onLoginOrSignupGoogle(state) {
    console.log('Google Clicked');
  }

  onSubscribeClick(state) {
    console.log('On Subscribe click');
  }

  render() {
    return (
      <div>
        {this.state.showSignUp && (
          <SignUp
            open={true}
            onSubscribeClick={this.onSubscribeClick}
            onLoginOrSignupClick={this.onLoginOrSignupClick}
            showSubcriptionDialog={false}
            onLoginOrSignupGoogle={this.onLoginOrSignupGoogle}
            onLoginOrSignupFacebook={this.onLoginOrSignupFacebook}
          />
        )}
      </div>
    );
  }
}

AuthProvider.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default AuthProvider;
