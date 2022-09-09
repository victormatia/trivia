import React, { Component } from 'react';
import { getTokenLocalStorage } from '../services/localStorage';

export default class Game extends Component {
  async componentDidMount() {
    const local = await getTokenLocalStorage();
    console.log(local);
  }

  render() {
    return (
      <section>Game</section>
    );
  }
}
