import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './audio.css';
import Player from './Player.jsx'


const Audio = (props) => {
  return (
    <div styleName='audio-container'>
      <audio ref={props.getRef} onDurationChange={props.durationChange} onTimeUpdate={props.customOnTimeChange} 
       src="https://play.podtrac.com/npr-510313/npr.mc.tritondigital.com/NPR_510313/media/anon.npr-podcasts/podcast/npr/hibt/2018/02/20180223_hibt_wikipedia-c2d9f4e7-ccd9-40d0-b07f-e6e4a87e1657.mp3" />
      <Player togglePlay={props.togglePlay} currentTime={props.currentTime} duration={props.duration} isPlaying={props.isPlaying} shoutOuts={props.shoutOuts} currentShoutOut={props.currentShoutOut}/>
    </div>
  )
}

export default CSSModules(Audio, styles);

module.exports.Audio = Audio;