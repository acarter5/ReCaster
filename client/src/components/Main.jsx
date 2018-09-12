import React from 'react';
import CSSModules from 'react-css-modules';
import axios from 'axios';
import styles from './main.css';
import AudioContainer from '../containers/AudioContainer.jsx';
import List from './List.jsx';
import store from '../store/store.js';
import shoutOutsList from '../actions/shoutOutsList.js';
import source from '../actions/source.js';
import ListContainer from '../containers/ListContainer.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.getData = this.getData.bind(this);
    this.listElement = null;
  }

  componentWillMount() {
    this.getData();
  }

  getListReference(ref) {
    this.listElement = ref;
  }

  getData() {
    axios.get(`http://localhost:3000/episodes/${this.props.id}`)
      .then((res) => {
        const data = res.data.pop();
        const shoutOuts = JSON.parse(data.shoutouts);
        const src = data.src;

        store.dispatch(shoutOutsList(shoutOuts));
        store.dispatch(source(src));
      })
      .catch((err) => {
        throw(err);
      })
  }

  render() {
    return (
      <div styleName='main-container'>
        <ListContainer />
        <AudioContainer />
      </div>
    )
  }
}

export default CSSModules(Main, styles);

module.exports.Main = Main;