import React from 'react';
import CSSModules from 'react-css-modules';
import styles from './main.css';
import Audio from './Audio.jsx'
import List from './List.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      refences: [],
      currentTime: 0,
      durration: 0,
      audioElement: null,
      isPlaying: false,
      shoutOuts: [{timespot: 30, title: 'Q', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Q_cursiva.gif/200px-Q_cursiva.gif', short: 'Q (named cue /kjuː/)[1] is the 17th letter of the modern English alphabet and the ISO basic Latin alphabet. In nearly all languages using the Latin script it is a consonant, not a vowel.', long: 'The Semitic sound value of Qôp was /q/ (voiceless uvular stop), and the form of the letter could have been based on the eye of a needle, a knot, or even a monkey with its tail hanging down.[2][3][4] /q/ is a sound common to Semitic languages, but not found in many European languages.[a] Some have even suggested that the form of the letter Q is even more ancient: it could have originated from Egyptian hieroglyphics.', link: 'https://en.wikipedia.org/wiki/Q'},
        {timespot: 65, title: 'Jimmy Wales', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Wikimania_2016_-_Press_conference_with_Jimmy_Wales_and_Katherine_Maher_01_%28cropped%29.jpg/220px-Wikimania_2016_-_Press_conference_with_Jimmy_Wales_and_Katherine_Maher_01_%28cropped%29.jpg', short: 'Jimmy Donal Wales (born August 7, 1966), also known by the online moniker Jimbo, is an American Internet entrepreneur, best known as the co-founder of the online non-profit encyclopediaWikipedia and the for-profit web hosting company Wikia.', long: 'Wales was born in Huntsville, Alabama, where he attended Randolph School, a university-preparatory school.[8][9] Later, he earned bachelor\'s and master\'s degrees in finance from Auburn University and the University of Alabama respectively.', link: 'https://en.wikipedia.org/wiki/Jimmy_Wales'},
        {timespot: 113, title: 'Larry Page', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped%29.jpg/220px-Larry_Page_in_the_European_Parliament%2C_17.06.2009_%28cropped%29.jpg', short: 'Lawrence Page(born March 26, 1973) is an American computer scientist and Internet entrepreneur who co-founded Google with Sergey Brin.', long: 'Page is the chief executive officer (CEO) of Google\'s parent company, Alphabet Inc. After stepping aside as Google CEO in August 2001, in favor of Eric Schmidt, he re-assumed the role in April 2011. He announced his intention to step aside a second time in July 2015, to become CEO of Alphabet, under which Google\'s assets would be reorganized. Under Page, Alphabet is seeking to deliver major advancements in a variety of industries.', link: 'https://en.wikipedia.org/wiki/Larry_Page'},
        {timespot: 162, title: 'Johannes Gutenberg', img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Gutenberg.jpg/220px-Gutenberg.jpg', short: 'Johannes Gensfleisch zur Laden zum Gutenberg (/ˈɡuːtənbɜːrɡ/; c. 1400 – February 3, 1468) was a German blacksmith, goldsmith, printer, and publisher who introduced printing to Europe with the printing press. His introduction of mechanical movable type printing to Europe started the Printing Revolution and is regarded as a milestone of the second millennium, ushering in the modern period of human history.It played a key role in the development of the Renaissance, Reformation, the Age of Enlightenment, and the scientific revolution...'}],
      currentShoutOut: null,
      shoutOutsToRender: [],
    }

    this.customOnTimeChange = this.customOnTimeChange.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.durationChange = this.durationChange.bind(this);
    this.getAudioRef = this.getAudioRef.bind(this);
  }

  customOnTimeChange() {

    this.setState({currentTime: this.audioElement.currentTime});
    this.state.shoutOuts.forEach((shoutOut) => {
      if (Math.floor(this.audioElement.currentTime) === shoutOut.timespot && shoutOut !== this.state.currentShoutOut) {
        this.setState({currentShoutOut: shoutOut}, () => {
          this.setState((prevState) => {
            return {shoutOutsToRender: prevState.shoutOutsToRender.concat(this.state.currentShoutOut)};
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
        <List shoutOuts={this.state.shoutOutsToRender} />
        <Audio getRef={this.getAudioRef} durationChange={this.durationChange} customOnTimeChange={this.customOnTimeChange} togglePlay={this.togglePlay} currentTime={this.state.currentTime} duration={this.state.duration} isPlaying={this.state.isPlaying} shoutOuts={this.state.shoutOuts} currentShoutOut={this.state.currentShoutOut}/>
      </div>
    )
  }
}

export default CSSModules(Main, styles);

module.exports.Main = Main;