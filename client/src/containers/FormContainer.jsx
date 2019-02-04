import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form.jsx';
import toggleFlipped from '../actions/toggleFlipped.js';
import getData from '../asyncActions/getShoutOuts.js';

const mapDispatchToProps = (dispatch) => {
  return {
    handleFlip: () => new Promise((resolve, reject) => {
      dispatch(toggleFlipped);
      resolve()
    }),
    getShoutOuts: () => dispatch(getData()),
  }
}

const mapStateToProps = (state) => {
  return {
    currentTime: state.currentTime,
    isFlipped: state.isFlipped,
    listRef: state.listRef,
  };
}

var FormContainer = connect(mapStateToProps, mapDispatchToProps)(Form);


export default FormContainer;

