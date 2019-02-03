import React from 'react';
import Audio from '../components/Audio.jsx';
import { connect } from 'react-redux';
import List from '../components/List.jsx';
import listRef from '../actions/listRef.js';

const mapDispatchToProps = (dispatch) => {
  return {
    getListRef: (ref) => dispatch(listRef(ref))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    shoutOuts: state.shoutOutsToRender,
    isFlipped: ownProps.isFlipped
  };
}

var ListContainer = connect(mapStateToProps, mapDispatchToProps)(List);


export default ListContainer;
