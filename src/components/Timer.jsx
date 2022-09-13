import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { desableOptions } from '../redux/store/actions/disableOptions';
import { updateTime } from '../redux/store/actions/updateTime';

class Timer extends Component {
  constructor() {
    super();
    this.state = {
      id: 0,
      count: 30,
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    const seconds = 1000;

    const id = setInterval(() => {
      this.setState((prev) => {
        const curr = prev.count - 1;
        dispatch(updateTime(curr));
        return {
          id,
          count: curr,
        };
      });
    }, seconds);
  }

  componentWillUnmount() {
    const { id } = this.state;
    clearTimeout(id);
  }

  render() {
    const { count, id } = this.state;
    const { timer, dispatch } = this.props;

    if (count === 0) {
      clearTimeout(id);
      dispatch(desableOptions());
    }
    if (timer === 'pause') {
      clearTimeout(id);
    }

    return (
      <div>{ count }</div>
    );
  }
}

Timer.propTypes = {
  timer: PropTypes.string,
}.isRequired;

const mapStateToProps = ({ timer }) => ({
  timer,
});

export default connect(mapStateToProps)(Timer);
