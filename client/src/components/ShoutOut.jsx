import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './shoutOut.css'

const ShoutOut = props => {
    return (
        <div styleName="shoutOut-container" data-testid="shoutout-component">
            <div styleName="img-container">
                <img src={props.data.img} height="100" width="100" />
            </div>
            <div styleName="title-container">
                <h1>{props.data.title}</h1>
            </div>
            <div styleName="short-container">
                <p>{props.data.short}</p>
            </div>
            <div styleName="long-container">
                <p>{props.data.long}</p>
                <a href={props.data.link} target="_blank">
                    Read more
                </a>
            </div>
        </div>
    )
}

export default CSSModules(ShoutOut, styles)
