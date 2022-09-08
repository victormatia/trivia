import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class ButtonSettings extends Component {
  constructor() {
    super();
    this.state = {};
  }

  pushConfigurações = (event) => {
    event.preventDefault();
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    return (
      <button
        data-testid="btn-settings"
        type="button"
        onClick={ this.pushConfigurações }
      >
        Configurações
      </button>
    );
  }
}

ButtonSettings.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(ButtonSettings);
