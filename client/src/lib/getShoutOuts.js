import store from '../store/store.js'
import axios from 'axios'
import shoutOutsList from '../actions/shoutOutsList.js'
import source from '../actions/source.js'

export const getData = function() {
    const id = window.location.pathname.replace(/\//g, '')

    return axios.get(`http://localhost:3000/api/episodes/${id}`).catch(err => {
        throw err
    })
}

export const dispatchData = async () => {
    const { data } = await getData()

    let { shoutouts, src } = data[0]
    shoutouts = JSON.parse(shoutouts)

    await store.dispatch(shoutOutsList(shoutouts))
    await store.dispatch(source(src))
}
