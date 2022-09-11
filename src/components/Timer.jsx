import React, { Component } from 'react';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      count: 30,
    };
  }

  componentDidMount() {
    const seconds = 1000;

    const id = setInterval(() => {
      this.setState((prev) => ({
        id,
        count: prev.count - 1,
      }));
    }, seconds);
  }

  render() {
    const { count, id } = this.state;

    if (count === 0) {
      clearTimeout(id);
    }

    return (
      <div>{ count }</div>
    );
  }
}

export default Timer;
