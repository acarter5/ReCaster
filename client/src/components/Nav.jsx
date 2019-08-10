import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './nav.css'

const Nav = props => {
    return (
        <div styleName="nav-bar">
            <p styleName="recaster">recaster</p>
        </div>
    )
}

export default CSSModules(Nav, styles, { allowMultiple: true })
