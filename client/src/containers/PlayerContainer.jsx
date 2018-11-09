import React from 'react';
import Audio from '../components/Audio.jsx';
import { connect } from 'react-redux';
import Player from '../components/Player.jsx';
import togglePlay from '../actions/togglePlay.js';
import toggleFlipped from '../actions/toggleFlipped.js';

const mapDispatchToProps = (dispatch) => {
  return {
    handleFlip: () => dispatch(toggleFlipped),
  }
}


const mapStateToProps = (state, ownProps) => {
  return {
    currentTime: state.currentTime, 
    duration: state.duration,
    isPlaying: state.isPlaying,
    shoutOuts: state.shoutOutsList,
    currentShoutOut: state.currentShoutOut,
    audioElement: ownProps.audioElement,
    handleRewind: ownProps.handleRewind,
    handleFastForward: ownProps.handleFastForward,
    changeCurrentTime: ownProps.changeCurrentTime,
    handleTogglePlay: ownProps.handleTogglePlay
  };
}

var PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);


export default PlayerContainer;
