import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import fetchToken from '../services/fetch';
import saveOnLocalStorage from '../services/localStorage';
import ButtonSettings from '../components/buttonSettings';
import { saveGravatarEmail } from '../redux/store/actions/saveGravatarEmail';

class Login extends Component {
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
    const validateUserName = userName.length > 0;

    if (validateEmail && validateUserName) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  inputOnChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateInputs());
  };

  handleClick = async (event) => {
    event.preventDefault();
    const { history, dispatch } = this.props;
    const { email, userName } = this.state;
    const fecth = await fetchToken();
    await saveOnLocalStorage(fecth);
    dispatch(saveGravatarEmail(email, userName));
    history.push('/game');
  };

  render() {
    const { email, userName, isDisabled } = this.state;
    const { history } = this.props;

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
              onClick={ this.handleClick }
            >
              Play

            </button>
            <ButtonSettings
              history={ history }
            />
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
