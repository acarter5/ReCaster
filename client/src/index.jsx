import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import MainContainer from './containers/MainContainer.jsx'
import Nav from './components/Nav.jsx'
import store from './store/store.js'

ReactDOM.render(
    <Provider store={store}>
        <MainContainer />
    </Provider>,
    document.getElementById('main'),
)

ReactDOM.render(<Nav />, document.getElementById('nav'))
