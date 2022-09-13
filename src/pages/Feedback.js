import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createGravatarEmail from '../services/gravatar';

class Feedback extends Component {
  playAgain = () => {
    const { history } = this.props;
    history.push('/');
  };

  ranking = () => {
    const { history } = this.props;
    history.push('/ranking');
  };

  render() {
    const { assertions, score, userName, email } = this.props;

    const three = 3;

    return (
      <div>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ createGravatarEmail(email) }
            alt="Imagem de usuário"
          />
          <p data-testid="header-player-name">{ userName }</p>
          <p data-testid="feedback-total-score">
            Score:
            {' '}
            { score }
          </p>
          <p data-testid="feedback-total-question">
            Assertions:
            {' '}
            { assertions }
          </p>
        </header>
        <main>
          {assertions < three ? (
            <h5 data-testid="feedback-text">Could be better...</h5>)
            : (<h5 data-testid="feedback-text">Well Done!</h5>)}
        </main>
        <button
          type="button"
          data-testid="btn-play-again"
          name="play again"
          onClick={ () => this.playAgain() }
        >
          Play Again

        </button>
        <button
          type="button"
          data-testid="btn-play-again"
          name="play again"
          onClick={ () => this.ranking() }
        >
          Ranking

        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.assertions,
  score: state.score,
});

Feedback.propTypes = {
  email: PropTypes.any,
  score: PropTypes.any,
  userName: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Feedback);
