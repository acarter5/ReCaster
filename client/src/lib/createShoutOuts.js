import axios from 'axios';
import getData from './getShoutOuts.js';

export const createShoutOutWikipedia = function(params) {
  return new Promise((resolve, reject) => {
    var id;
    var url = window.location.href.split('/');
    id = url[url.length - 2];
    axios.put(`/shoutouts/wikipedia/${id}`, params)
    .then((res) => {
      console.log(res);
      if (res.status === 200) {
        getData(id)
        .then(resolve);
      }
    })
    .catch((err) => {
      console.log(err);
      if (err.response.data === 'given timespot already allocated') {
        alert('Looks like there is already a shoutout at that spot in the episode. If you feel that a better/more accurate shoutout should go there, please click the \'report\' link on the existing shoutout');
      }
    });
  });
};