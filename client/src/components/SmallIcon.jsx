import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './smallIcon.css'

const SmallIcon = props => {
    const left = `${(props.timeSpot / props.max) * 100}%`
    return (
        <div
            styleName="small-icon"
            data-testid="small-icon-component"
            style={{ left: `${(props.timeSpot / props.max) * 100}%` }}
        />
    )
}

export default CSSModules(SmallIcon, styles)
