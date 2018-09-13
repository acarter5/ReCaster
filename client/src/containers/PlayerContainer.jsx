import React from 'react';
import Audio from '../components/Audio.jsx';
import { connect } from 'react-redux';
import Player from '../components/Player.jsx';
import togglePlay from '../actions/togglePlay.js';
import handleTogglePlay from '../actions/handleTogglePlay';

const mapDispatchToProps = (dispatch) => {
  return {
    handleTogglePlay: (audioElement) => dispatch(handleTogglePlay(audioElement))
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    currentTime: state.currentTime, 
    duration: state.duration,
    isPlaying: state.isPlaying,
    shoutOuts: state.shoutOutsList,
    currentShoutOut: state.currentShoutOut,
    audioElement: ownProps.audioElement
  };
}

var PlayerContainer = connect(mapStateToProps, mapDispatchToProps)(Player);


export default PlayerContainer;
