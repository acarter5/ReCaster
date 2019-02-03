import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './audio.css';
import PlayerContainer from '../containers/PlayerContainer.jsx'


class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.getAudioRef = this.getAudioRef.bind(this);
    this.audioElement = null;
    this.handleRewind = this.handleRewind.bind(this);
    this.handleFastForward = this.handleFastForward.bind(this);
    this.changeCurrentTime = this.changeCurrentTime.bind(this);
    this.audioElement = null;
    this.handleTogglePlay = this.handleTogglePlay.bind(this);
  }

  handleTogglePlay() {
    this.audioElement.paused ? this.audioElement.play() : this.audioElement.pause();
    this.props.handleTogglePlay()
  }

  getAudioRef(ref) {
    this.audioElement = ref;
  }

  handleRewind() {
    this.audioElement.currentTime = this.audioElement.currentTime - 30; 
  }

  handleFastForward() {
    this.audioElement.currentTime = this.audioElement.currentTime + 30;
  }

  changeCurrentTime(time) {
    this.audioElement.currentTime = time;
  }

  render() {
    return (
      <div styleName='audio-container'>
        <audio preload='auto' ref={this.getAudioRef} onDurationChange={() => this.props.durationChange(this.audioElement.duration)} 
         src={this.props.src} 
         onTimeUpdate={() =>{
          this.props.handleTimeChange(this.audioElement.currentTime, this.props.shoutOuts, this.props.listRef, this.props.prevShoutOuts)
         } } />
        <PlayerContainer handleTogglePlay={this.handleTogglePlay} changeCurrentTime={this.changeCurrentTime} handleRewind={this.handleRewind} handleFastForward={this.handleFastForward}/>
      </div>
    )
  }
}

export default CSSModules(Audio, styles);

module.exports.Audio = Audio;