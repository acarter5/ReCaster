import React from 'react'
import ShoutOut from './ShoutOut.jsx'
import CSSModules from 'react-css-modules'
import styles from './list.css'

const List = props => {
    return (
        <div styleName="list-container" data-testid="list-component">
            <div>
                <div styleName="flex-container" ref={props.getListRef}>
                    {props.shoutOuts.map((shoutout, index) => (
                        <ShoutOut data={shoutout} key={index} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CSSModules(List, styles)
