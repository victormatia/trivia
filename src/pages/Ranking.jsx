import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPlayersLocalStorage } from '../services/localStorage';

class Ranking extends Component {
  constructor() {
    super();
    this.state = {
      ranking: [],
    };
  }

  async componentDidMount() {
    const ranking = await getPlayersLocalStorage();
    // ordenação inspirada em https://www.horadecodar.com.br/2021/01/11/como-ordenar-um-array-de-objetos-em-javascript/
    ranking.sort((a, b) => {
      if (a.score > b.score) {
        const menosum = -1;
        return menosum;
      }
      return true;
    });
    this.setState({ ranking });
  }

  pushLogin = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { ranking } = this.state;
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
        {ranking.map((player, index) => (
          <div key={ index }>
            <li>
              <img
                src={ player.picture }
                alt="imagem gravatar"
              />
            </li>
            <li
              data-testid={ `player-name-${index}` }
            >
              {player.name}
            </li>
            <li
              data-testid={ `player-score-${index}` }
            >
              {player.score}
            </li>
            <li>
              {player.assertions}
            </li>
            <br />
          </div>
        ))}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  userName: state.player.name,
  email: state.player.gravatarEmail,
});

Ranking.propTypes = {
  email: PropTypes.any,
  score: PropTypes.any,
  userName: PropTypes.any,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect(mapStateToProps)(Ranking);
