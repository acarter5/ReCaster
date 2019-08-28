import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './audio.css'
import PlayerContainer from '../containers/PlayerContainer.jsx'
import t from 'prop-types'

class Audio extends React.Component {
    constructor(props) {
        super(props)

        this.getAudioRef = this.getAudioRef.bind(this)
        this.audioElement = null
        this.handleRewind = this.handleRewind.bind(this)
        this.handleFastForward = this.handleFastForward.bind(this)
        this.changeCurrentTime = this.changeCurrentTime.bind(this)
        this.audioElement = null
        this.handleTogglePlay = this.handleTogglePlay.bind(this)
    }

    handleTogglePlay() {
        this.audioElement.paused
            ? this.audioElement.play()
            : this.audioElement.pause()
        this.props.handleTogglePlay()
    }

    getAudioRef(ref) {
        this.audioElement = ref
    }

    handleRewind() {
        this.audioElement.currentTime = this.audioElement.currentTime - 30
    }

    handleFastForward() {
        this.audioElement.currentTime = this.audioElement.currentTime + 30
    }

    changeCurrentTime(time) {
        this.audioElement.currentTime = time
    }

    render() {
        return (
            <div styleName="audio-container" data-testid="audio-component">
                <audio
                    data-testid="audio-element"
                    preload="auto"
                    ref={this.getAudioRef}
                    onDurationChange={e => {
                        this.props.durationChange(this.audioElement.duration)
                    }}
                    src={this.props.src}
                    onTimeUpdate={() => {
                        this.props.handleTimeChange(
                            this.audioElement.currentTime,
                            this.props.shoutOuts,
                            this.props.listRef,
                            this.props.prevShoutOuts
                        )
                    }}
                >
                    <source src={this.props.src} type="audio/mpeg" />
                </audio>
                <PlayerContainer
                    handleTogglePlay={this.handleTogglePlay}
                    changeCurrentTime={this.changeCurrentTime}
                    handleRewind={this.handleRewind}
                    handleFastForward={this.handleFastForward}
                />
            </div>
        )
    }
}

Audio.propTypes = {
    durationChange: t.func,
    handleTogglePlay: t.func,
    handleTimeChange: t.func,
    shoutOuts: t.array,
    prevShoutOuts: t.array,
    listRef: t.object
}

export default CSSModules(Audio, styles)
