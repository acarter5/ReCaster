import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './main.css';
import AudioContainer from '../containers/AudioContainer.jsx';
import List from './List.jsx';
import FormContainer from '../containers/FormContainer.jsx';
import store from '../store/store.js';
import ListContainer from '../containers/ListContainer.jsx';
import ReactCardFlip from 'react-card-flip';
import getData from '../lib/getShoutOuts.js';



class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFlipped: store.getState().isFlipped
    }

    // this.getData = this.getData.bind(this);
    this.listElement = null;
    this.handleChange = this.handleChange.bind(this);
    this.handleOnFlip = this.handleOnFlip.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.showFront = this.showFront.bind(this);
  }

  componentWillMount() {
    getData(this.props.id);
  }

  componentDidMount() {
    store.subscribe(this.handleChange)
  }

  getListReference(ref) {
    this.listElement = ref;
  }

  handleChange() {
    if (store.getState().isFlipped !== this.state.isFlipped) {
      this.setState({isFlipped: store.getState().isFlipped})
    }
  }

  handleOnFlip(flipped) {
    if (flipped) {
      this.refs.backButton.getDOMNode().focus();
    }
  }

  handleKeyDown(e) {
    if (this.state.isFlipped && e.keyCode === 27) {
      this.showFront();
    }
  }

  showFront() {
    this.setState({
      isFlipped: false
    });
  }

  render() {
    return (
      <div styleName='main-container'>
        <div styleName='flipper-container'>
        <ReactCardFlip
          isFlipped={this.state.isFlipped}
          infinite={true}
        >
          <ListContainer key="front" isFlipped={this.state.isFlipped}/>
          <FormContainer key="back"/>
        </ReactCardFlip>
        </div>
        <AudioContainer />
      </div>
    )
  }
}

export default CSSModules(Main, styles);

module.exports.Main = Main;