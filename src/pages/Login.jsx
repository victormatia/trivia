import React, { Component } from 'react';
import logo from '../trivia.png';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      userName: '',
      isDisabled: true,
    };
  }

  validateInputs = () => {
    const { email, userName } = this.state;

    const validateEmail = email.length > 0;
    console.log(validateEmail);
    const validateUserName = userName.length > 0;
    console.log(validateUserName);

    if (validateEmail && validateUserName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  inputOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateInputs());
  };

  render() {
    const { email, userName, isDisabled } = this.state;

    return (
      <section>
        <div className="App">
          <header className="App-header">
            <img src={ logo } className="App-logo" alt="logo" />
            <p>SUA VEZ</p>
          </header>
          <form>
            <label htmlFor="email-input">
              <input
                data-testid="input-gravatar-email"
                name="email"
                value={ email }
                required
                onChange={ this.inputOnChange }
                type="email"
                placeholder="usuario@gmail.com"
              />
            </label>
            <label htmlFor="password-input">
              <input
                data-testid="input-player-name"
                required
                name="userName"
                value={ userName }
                onChange={ this.inputOnChange }
                type="text"
                placeholder="Nome de usuário"
              />
            </label>
            <button
              data-testid="btn-play"
              disabled={ isDisabled }
              type="submit"
            >
              Play

            </button>
          </form>
        </div>
      </section>
    );
  }
}
