import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './player.css';
import { formatSeconds } from '../utils/NumberUtils.js';
import Slider from './Slider.jsx';

class Player extends React.Component {
  constructor(props) {
    super(props)

    this.changeCurrentTime = this.changeCurrentTime.bind(this);
  }

  changeCurrentTime(currentTime) {
    this.props.audioElement.currentTime = currentTime
  }

  render() {
    return (
      <div styleName='player-container'>
        <div
          styleName="play-button"
          onClick={() => this.props.handleTogglePlay(this.props.audioElement)}
          role="button"
          tabIndex="0"
        >
          <p styleName={`player-button-icon ${this.props.isPlaying ? 'pause' : 'play'}`} />
        </div>
        <Slider
          max={this.props.duration}
          value={this.props.currentTime}
          shoutOuts={this.props.shoutOuts}
          currentShoutOut={this.props.currentShoutOut}
          onChange={this.changeCurrentTime}
        />
        <div styleName="player-time">
          {formatSeconds(Math.floor(this.props.currentTime))}
          <div styleName="player-time-separator">
            /
          </div>
          {formatSeconds(Math.floor(this.props.duration))}
        </div>
      </div>
    )
  }
}

export default CSSModules(Player, styles, {allowMultiple: true});

module.exports.Player = Player;