import React from 'react';
import Audio from '../components/Audio.jsx';
import { connect } from 'react-redux';
import durationChangeAction from '../actions/durationChange.js';
import handleTimeChange from '../actions/timeChange.js'
import togglePlay from '../actions/togglePlay.js';

const mapDispatchToProps = (dispatch) => {
  return {
    durationChange: (duration) => {
      dispatch(durationChangeAction(duration));
    },
    handleTimeChange: (time, totalShoutOuts, listRef, prevShoutOuts) => {
      dispatch(handleTimeChange(time, totalShoutOuts, listRef, prevShoutOuts));
    },
    handleTogglePlay: () => dispatch(togglePlay),
  }
}

const mapStateToProps = (state = {}) => {
  return {
    src: state.src, 
    shoutOuts: state.shoutOutsList,
    listRef: state.listRef,
    prevShoutOuts: state.shoutOutsToRender,
  };
}

var AudioContainer = connect(mapStateToProps, mapDispatchToProps)(Audio);


export default AudioContainer;