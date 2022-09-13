import PropTypes from 'prop-types';
import React, { Component } from 'react';

class Ranking extends Component {
  pushLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <section>
        <h1 data-testid="ranking-title">Ranking</h1>
        <button
          type="button"
          data-testid="btn-go-home"
          name="login"
          onClick={ () => this.pushLogin() }
        >
          Login

        </button>
      </section>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default Ranking;
