import toggleFlipped from '../../actions/toggleFlipped.js'
import togglePlay from '../../actions/togglePlay.js'

export const makeHandleFlip = dispatch => {
    return () =>
        new Promise((resolve, reject) => {
            dispatch(toggleFlipped)
            resolve()
        })
}

export const makeHandleTogglePlay = dispatch => {
    return () => dispatch(togglePlay)
}
