import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './main.css'
import AudioContainer from '../containers/AudioContainer.jsx'
import FormContainer from '../containers/FormContainer.jsx'
import ListContainer from '../containers/ListContainer.jsx'
import ReactCardFlip from 'react-card-flip'
import { dispatchData } from '../lib/getShoutOuts'

class Main extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        dispatchData()
    }

    render() {
        return (
            <div styleName="main-container" data-testid="main-component">
                <div>
                    <p>does this works?</p>
                </div>
                <div styleName="flipper-container">
                    <ReactCardFlip
                        isFlipped={this.props.isFlipped}
                        infinite={true}
                    >
                        <ListContainer key="front" />
                        <FormContainer key="back" />
                    </ReactCardFlip>
                </div>
                <AudioContainer />
            </div>
        )
    }
}

export default CSSModules(Main, styles)
