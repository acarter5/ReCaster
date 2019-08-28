import React from 'react'
import ReactDOM from 'react-dom'
import CSSModules from 'react-css-modules'
import styles from './form.css'
import { formatSeconds, unformatSeconds } from '../utils/NumberUtils.js'
import createShoutOutWikipedia from '../lib/createShoutOuts.js'
import { dispatchData } from '../lib/getShoutOuts'

class Form extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            shoutoutTime: formatSeconds(Math.floor(this.props.currentTime)),
            wikipediaSRC: ''
        }

        this.handleScrollToElement = this.handleScrollToElement.bind(this)
        this.handleTimeInput = this.handleTimeInput.bind(this)
        this.handleWikipediaInput = this.handleWikipediaInput.bind(this)
        this.makeShoutOutWikipedia = this.makeShoutOutWikipedia.bind(this)
        this.handleFlip = this.handleFlip.bind(this)
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentTime !== prevProps.currentTime) {
            this.setState({
                shoutoutTime: formatSeconds(Math.floor(this.props.currentTime))
            })
        }
    }

    handleScrollToElement(ref) {
        var node = ReactDOM.findDOMNode(this.refs[ref])
        node.scrollIntoView({ block: 'end' })
    }

    handleTimeInput(event) {
        this.setState({ shoutoutTime: event.target.value })
    }

    handleWikipediaInput(event) {
        this.setState({ wikipediaSRC: event.target.value })
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

    makeShoutOutWikipedia(event) {
        event.preventDefault()
        event.stopPropagation()

        const shoutoutTime = unformatSeconds(this.state.shoutoutTime)
        const src = this.state.wikipediaSRC
        const srcArr = this.state.wikipediaSRC.split('/')
        const title = srcArr[srcArr.length - 1]

        const params = {
            shoutoutTime,
            title,
            src
        }

        this.setState({ wikipediaSRC: '' })
        createShoutOutWikipedia(params)
            .then(dispatchData)
            .then(this.handleFlip)
    }

    render() {
        return (
            <div styleName="back-card">
                <div data-testid="form-component" styleName="form-container">
                    <div styleName="title-screen">
                        <img
                            styleName="excited-girl"
                            src="./assets/excited_girl.gif"
                        />
                        <h2>
                            Hear something that deserves <br /> a shoutout?
                        </h2>
                        <h3>
                            what type of shoutout do you <br /> want to make:
                        </h3>
                        <div styleName="platform-button-outer-container">
                            <div styleName="platform-button-inner-container">
                                <a
                                    href="#"
                                    onClick={event => {
                                        event.preventDefault()
                                        event.stopPropagation()
                                        this.handleScrollToElement('wikipedia')
                                    }}
                                >
                                    <img src="./assets/wikipedia_icon.png" />
                                    Wikipedia Article
                                </a>
                            </div>

                            <div styleName="platform-button-inner-container">
                                <a href="#">
                                    <img src="./assets/facebook_icon.png" />
                                    Facebook Post
                                </a>
                            </div>

                            <div styleName="platform-button-inner-container">
                                <a href="#">
                                    <img src="./assets/twitter_icon.jpeg" />
                                    Tweet
                                </a>
                            </div>
                        </div>
                    </div>

                    <div
                        styleName="shoutout-submit wikipedia-submit"
                        ref="wikipedia"
                    >
                        <h2>Wikipedia:</h2>
                        <form>
                            <h3>
                                Just give us the link to the Wikipedia article
                            </h3>
                            <input
                                data-testid="wikipedia-input"
                                type="text"
                                value={this.state.wikipediaSRC}
                                onChange={this.handleWikipediaInput}
                            />
                            <h3>
                                And the time that the Wikipedia article or
                                subject is mentioned in the podcast
                            </h3>
                            <input
                                type="text"
                                value={this.state.shoutoutTime}
                                onChange={this.handleTimeInput}
                            />
                            <input
                                data-testid="wikipedia-submit"
                                type="submit"
                                onClick={this.makeShoutOutWikipedia}
                            />
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default CSSModules(Form, styles, { allowMultiple: true })
