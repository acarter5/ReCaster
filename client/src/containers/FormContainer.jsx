import React from 'react';
import { connect } from 'react-redux';
import Form from '../components/Form.jsx';

const mapStateToProps = (state) => {
  return {
    currentTime: state.currentTime,
  };
}

var FormContainer = connect(mapStateToProps, null)(Form);


export default FormContainer;

