import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import createGravatarEmail from '../services/gravatar';
import { getPlayersLocalStorage, savePlayerLocalStorage } from '../services/localStorage';
import { restartScore } from '../redux/store/actions/restartScore';

class Feedback extends Component {
  async componentDidMount() {
    const { assertions, score, userName, email } = this.props;
    const player = {
      assertions,
      score,
      name: userName,
      email,
      picture: createGravatarEmail(email),
    };
    const ranking = await getPlayersLocalStorage();
    ranking.push(player);
    savePlayerLocalStorage(ranking);
  }

  // opa

  playAgain = () => {
    const { history, dispatch } = this.props;
    dispatch(restartScore());
    history.push('/');
  };

  ranking = () => {
    const { history, dispatch } = this.props;
    dispatch(restartScore());
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
          <p data-testid="header-score">
            { score }
          </p>
        </header>
        <main>
          {assertions < three ? (
            <h5 data-testid="feedback-text">Could be better...</h5>)
            : (<h5 data-testid="feedback-text">Well Done!</h5>)}
          <p data-testid="feedback-total-score">
            { score }
          </p>
          <p data-testid="feedback-total-question">
            { assertions }
          </p>
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
          data-testid="btn-ranking"
          name="play again"
          onClick={ () => this.ranking() }
        >
          Ranking

        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player }) => ({
  assertions: player.assertions,
  score: player.score,
  userName: player.name,
  email: player.gravatarEmail,
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
