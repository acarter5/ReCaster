import React from 'react';
import CSSModules from 'react-css-modules';
import axios from 'axios';
import styles from './main.css';
import Audio from './Audio.jsx';
import List from './List.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentTime: 0,
      durration: 0,
      audioElement: null,
      isPlaying: false,
      shoutOuts: [],
      currentShoutOut: null,
      shoutOutsToRender: [],
      src: '',
    }

    this.customOnTimeChange = this.customOnTimeChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.durationChange = this.durationChange.bind(this);
    this.getAudioRef = this.getAudioRef.bind(this);
    this.getListReference = this.getListReference.bind(this);
    this.getData = this.getData.bind(this);
    this.listElement = null;
  }

  componentDidMount() {
    this.getData();
  }

  getListReference(ref) {
    this.listElement = ref;
  }

  getData() {
    var self = this;
    axios.get(`http://localhost:3000/episodes/${this.props.id}`)
      .then((res) => {
        const data = res.data.pop();
        self.setState({src: data.src});
        self.setState({shoutOuts: JSON.parse(data.shoutouts)});
      })
      .catch((err) => {
        throw(err);
      })
  }

  customOnTimeChange() {

    this.setState({currentTime: this.audioElement.currentTime});
    this.state.shoutOuts.forEach((shoutOut) => {
      if (Math.floor(this.audioElement.currentTime) === shoutOut.timespot && shoutOut !== this.state.currentShoutOut) {
        this.setState({currentShoutOut: shoutOut}, () => {
          this.setState((prevState) => {
            return {shoutOutsToRender: prevState.shoutOutsToRender.concat(this.state.currentShoutOut)};
          }, () => {
            this.listElement.scrollTop = this.listElement.scrollHeight;
          })
        });
      }
    });
  }

  togglePlay() {
    const {audioElement} = this;
    if (audioElement.paused) {
      this.setState({isPlaying: true});
      audioElement.play();
    } else {
      this.setState({isPlaying: false});
      audioElement.pause();
    }
  }
  durationChange() {
    this.setState({duration: this.audioElement.duration});
  }

  getAudioRef(ref) {
    this.audioElement = ref;
  }

  render() {
    return (
      <div styleName='main-container'>
        <List getRef={this.getListReference} shoutOuts={this.state.shoutOutsToRender} />
        <Audio getRef={this.getAudioRef} durationChange={this.durationChange} customOnTimeChange={this.customOnTimeChange} togglePlay={this.togglePlay} currentTime={this.state.currentTime} duration={this.state.duration} isPlaying={this.state.isPlaying} shoutOuts={this.state.shoutOuts} currentShoutOut={this.state.currentShoutOut}/>
      </div>
    )
  }
}

export default CSSModules(Main, styles);

module.exports.Main = Main;