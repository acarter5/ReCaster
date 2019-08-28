import axios from 'axios'

const createShoutOutWikipedia = function(params) {
    return new Promise((resolve, reject) => {
        const id = window.location.pathname.replace(/\//g, '')
        axios
            .put(`/api/shoutouts/wikipedia/${id}`, params)
            .then(res => {
                if (res.status === 200) {
                    resolve(id)
                }
            })
            .catch(err => {
                console.log(err)
                if (err.response.data === 'given timespot already allocated') {
                    alert(
                        "Looks like there is already a shoutout at that spot in the episode. If you feel that a better/more accurate shoutout should go there, please click the 'report' link on the existing shoutout"
                    )
                }
            })
    })
}

export default createShoutOutWikipedia
