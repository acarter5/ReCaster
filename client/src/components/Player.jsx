import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './player.css';
import { formatSeconds } from '../utils/NumberUtils.js'
import Slider from './Slider.jsx'

const Player = (props) => {
  return (
    <div styleName='player-container'>
      <div
        styleName="play-button"
        onClick={() => props.handleTogglePlay(props.audioElement)}
        role="button"
        tabIndex="0"
      >
        <p styleName={`player-button-icon ${props.isPlaying ? 'pause' : 'play'}`} />
      </div>
      <Slider
        max={props.duration}
        value={props.currentTime}
        shoutOuts={props.shoutOuts}
        currentShoutOut={props.currentShoutOut}
      />
      <div styleName="player-time">
        {formatSeconds(Math.floor(props.currentTime))}
        <div styleName="player-time-separator">
          /
        </div>
        {formatSeconds(Math.floor(props.duration))}
      </div>
    </div>
  )
}

export default CSSModules(Player, styles, {allowMultiple: true});

module.exports.Player = Player;