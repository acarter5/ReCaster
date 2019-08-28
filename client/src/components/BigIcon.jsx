import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './bigIcon.css'

const BigIcon = props => {
    const left = `${(props.timeSpot / props.max) * 100}%`
    return (
        <div
            styleName="big-icon"
            style={{ left }}
            data-testid="big-icon-component"
        />
    )
}

export default CSSModules(BigIcon, styles)
