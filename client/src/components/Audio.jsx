import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './audio.css';
import PlayerContainer from '../containers/PlayerContainer.jsx'


class Audio extends React.Component {
  constructor(props) {
    super(props);

    this.getAudioRef = this.getAudioRef.bind(this);
    this.audioElement = null;
  }

  getAudioRef(ref) {
    this.audioElement = ref;
  }

  render() {
    return (
      <div styleName='audio-container'>
        <audio ref={this.getAudioRef} onDurationChange={() => this.props.durationChange(this.audioElement.duration)} 
         src={this.props.src} 
         onTimeUpdate={() =>{
          console.log(this.audioElement.currentTime) 
          this.props.handleTimeChange(this.audioElement.currentTime, this.props.shoutOuts, this.props.listRef, this.props.prevShoutOuts)
         } } />
        <PlayerContainer audioElement={this.audioElement}/>
      </div>
    )
  }
}

export default CSSModules(Audio, styles);

module.exports.Audio = Audio;