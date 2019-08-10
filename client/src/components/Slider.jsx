import React from 'react'
import BigIcon from './BigIcon.jsx'
import SmallIcon from './SmallIcon.jsx'
import CSSModules from 'react-css-modules'
import styles from './slider.css'
import offsetLeft from '../utils/DOMUtils.js'

const prevent = e => {
    e.preventDefault()
    e.stopPropagation()
}

class Slider extends React.Component {
    constructor(props) {
        super(props)
        this.onClick = this.onClick.bind(this)
        this.onMouseDown = this.onMouseDown.bind(this)
        this.onMouseMove = this.onMouseMove.bind(this)
        this.onMouseUp = this.onMouseUp.bind(this)
        this.domNode = null
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    onClick(e) {
        const { max, onChange } = this.props
        const percent =
            (e.clientX - offsetLeft(e.currentTarget)) /
            e.currentTarget.offsetWidth
        this.props.onChange(percent * max)
    }

    onMouseDown() {
        document.addEventListener('mousemove', this.onMouseMove)
        document.addEventListener('mouseup', this.onMouseUp)
    }

    onMouseMove(e) {
        const { domNode, props } = this
        const { max, onChange } = props

        const diff = e.clientX - offsetLeft(domNode)
        const percent = Math.min(Math.max(diff / domNode.offsetWidth, 0), 1)
        onChange(percent * max)
    }

    onMouseUp() {
        document.removeEventListener('mousemove', this.onMouseMove)
        document.removeEventListener('mouseup', this.onMouseUp)
    }

    render() {
        const { max, value } = this.props
        const width = `${(value / max) * 100}%`

        return (
            <div styleName="slider-container">
                <div styleName="slider" onClick={this.onClick}>
                    <div
                        styleName="slider-bar"
                        ref={node => {
                            this.domNode = node
                        }}
                    >
                        {max > 0 ? (
                            <div styleName="slider-bar-fill" style={{ width }}>
                                <div
                                    styleName="slider-handle"
                                    onClick={prevent}
                                    onMouseDown={this.onMouseDown}
                                />
                            </div>
                        ) : null}
                        {this.props.shoutOuts.map((shoutOut, index) => {
                            return shoutOut === this.props.currentShoutOut ? (
                                <BigIcon
                                    max={max}
                                    timeSpot={shoutOut.timespot}
                                    key={index}
                                />
                            ) : (
                                <SmallIcon
                                    timeSpot={shoutOut.timespot}
                                    max={max}
                                    key={index}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default CSSModules(Slider, styles, { allowMultiple: true })
