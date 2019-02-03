import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form.jsx';
import toggleFlipped from '../actions/toggleFlipped.js';

const mapDispatchToProps = (dispatch) => {
  return {
    handleFlip: () => dispatch(toggleFlipped),
  }
}

const mapStateToProps = (state) => {
  return {
    currentTime: state.currentTime,
  };
}

var FormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);


export default FormContainer;

