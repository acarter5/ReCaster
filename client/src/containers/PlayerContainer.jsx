import { connect } from 'react-redux'
import Player from '../components/Player.jsx'
import { makeHandleFlip } from './lib'

const mapDispatchToProps = dispatch => {
    return {
        handleFlip: makeHandleFlip(dispatch)
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentTime: state.currentTime,
        duration: state.duration,
        isPlaying: state.isPlaying,
        isFlipped: state.isFlipped,
        shoutOuts: state.shoutOutsList,
        currentShoutOut: state.currentShoutOut,
        audioElement: ownProps.audioElement,
        handleRewind: ownProps.handleRewind,
        handleFastForward: ownProps.handleFastForward,
        changeCurrentTime: ownProps.changeCurrentTime,
        handleTogglePlay: ownProps.handleTogglePlay,
        listRef: state.listRef
    }
}

var PlayerContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Player)

export default PlayerContainer
