import togglePlay from './togglePlay.js';





var handleTogglePlay = (audioElement) => {

  audioElement.paused ? audioElement.play() : audioElement.pause();

  return (dispatch) => {
    dispatch(togglePlay);
  }
};

export default handleTogglePlay