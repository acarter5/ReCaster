import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Main from './components/Main.jsx';
import Nav from './components/Nav.jsx';
import store from './store/store.js'

ReactDOM.render(
  <Provider store={store}>
    <Main id={location.pathname.split('/')[1]}/>
  </Provider>
  , document.getElementById('main')
);

ReactDOM.render(<Nav />, document.getElementById('nav'));


window.Main = Main;
window.Nav = Nav;
export default Main;