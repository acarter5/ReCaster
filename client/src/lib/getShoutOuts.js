import store from '../store/store.js'
import axios from 'axios'
import shoutOutsList from '../actions/shoutOutsList.js'
import source from '../actions/source.js'

const getData = function() {
    const id = window.location.pathname.replace(/\//g, '')

    return new Promise((resolve, reject) => {
        axios
            .get(`http://localhost:3000/episodes/${id}`)
            .then(res => {
                const data = res.data.pop()
                const shoutOuts = data.shoutouts
                    ? JSON.parse(data.shoutouts)
                    : []
                console.log(shoutOuts)
                const src = data.src

                store.dispatch(shoutOutsList(shoutOuts))
                store.dispatch(source(src))
            })
            .then(resolve)
            .catch(err => {
                throw err
            })
    })
}

export default getData
