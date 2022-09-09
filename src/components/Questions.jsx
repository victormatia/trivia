import React, { Component } from 'react';
import { connect } from 'react-redux';

class Questions extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <h3>opa</h3>
    );
  }
}

export default connect()(Questions);
