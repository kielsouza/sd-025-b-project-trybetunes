import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import LoadingPage from './LoadingPage';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      nameValue: '',
      isBtnDisabled: true,
      isLoading: false,
      userLoggedIn: false,
    };
  }

  handleChange = (event) => {
    const minimumLength = 3;
    const eventValue = event.target.value;
    if (eventValue.length >= minimumLength) {
      this.setState({
        nameValue: eventValue,
        isBtnDisabled: false,
      });
    } if (eventValue.length < minimumLength) {
      this.setState({
        isBtnDisabled: true,
      });
    }
  };

  handleClick = async () => {
    const { nameValue } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name: nameValue });
    this.setState({
      isLoading: false,
      userLoggedIn: true,
    });
  };

  render() {
    const {
      isBtnDisabled,
      isLoading,
      userLoggedIn,
    } = this.state;
    return (
      <div data-testid="page-login">
        Login
        { userLoggedIn && <Redirect to="/search" /> }
        { isLoading ? (
          <LoadingPage />
        ) : (
          <form>
            <label htmlFor="name-input">
              Nome:
              <input
                data-testid="login-name-input"
                id="name-input"
                type="text"
                placeholder="username"
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="login-submit-button"
              type="button"
              onClick={ this.handleClick }
              disabled={ isBtnDisabled }
            >
              Entrar
            </button>
          </form>
        )}
      </div>
    );
  }
}

export default Login;
