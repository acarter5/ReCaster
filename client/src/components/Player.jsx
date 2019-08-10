import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './player.css'
import { formatSeconds } from '../utils/NumberUtils.js'
import Slider from './Slider.jsx'

class Player extends React.Component {
    constructor(props) {
        super(props)

        this.handleFlip = this.handleFlip.bind(this)
    }

    handleFlip() {
        var time
        var displayVal
        this.props.handleFlip().then(() => {
            time = this.props.isFlipped ? 0 : 200
            displayVal = this.props.isFlipped ? 'hidden' : 'visible'
            setTimeout(() => {
                this.props.listRef.style.visibility = displayVal
            }, time)
        })
    }

    render() {
        return (
            <div styleName="player-container">
                <div
                    styleName="rewind-button"
                    onClick={() => this.props.handleRewind()}
                    role="button"
                    tabIndex="0"
                >
                    <p styleName={`rewind`} />
                </div>

                <div
                    styleName="play-button"
                    onClick={this.props.handleTogglePlay}
                    role="button"
                    tabIndex="0"
                >
                    <p
                        styleName={`${this.props.isPlaying ? 'pause' : 'play'}`}
                    />
                </div>

                <div
                    styleName="fast-forward-button"
                    onClick={() => this.props.handleFastForward()}
                    role="button"
                    tabIndex="0"
                >
                    <p styleName={`fast-forward`} />
                </div>

                <Slider
                    max={this.props.duration}
                    value={this.props.currentTime}
                    shoutOuts={this.props.shoutOuts}
                    currentShoutOut={this.props.currentShoutOut}
                    onChange={this.props.changeCurrentTime}
                />
                <div styleName="player-time">
                    {formatSeconds(Math.floor(this.props.currentTime))}
                    <div styleName="player-time-separator">/</div>
                    {formatSeconds(Math.floor(this.props.duration))}
                </div>
                <div
                    styleName="shoutout-button"
                    onClick={this.handleFlip}
                    role="button"
                    tabIndex="0"
                >
                    <img
                        src="assets/shoutout_icon.png"
                        alt="Make a shoutout!"
                        height="30"
                        width="30"
                    />
                </div>
            </div>
        )
    }
}

export default CSSModules(Player, styles, { allowMultiple: true })
