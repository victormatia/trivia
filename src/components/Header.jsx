import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import createGravatarEmail from '../services/gravatar';

class Header extends Component {
  render() {
    const { userName, score, email } = this.props;
    console.log(this.props);
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ createGravatarEmail(email) }
          alt="Imagem de usuário"
        />
        <p data-testid="header-player-name">{ userName }</p>
        <p data-testid="header-score">{ score }</p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.any,
  score: PropTypes.any,
  userName: PropTypes.any,
}.isRequired;

const mapStateToProps = ({ name, score, gravatarEmail }) => ({
  userName: name,
  score,
  email: gravatarEmail,
});

export default connect(mapStateToProps)(Header);
