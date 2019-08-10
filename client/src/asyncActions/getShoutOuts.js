import axios from "axios";
import shoutOutsList from "../actions/shoutOutsList.js";
import source from "../actions/source.js";
var id;
var url = window.location.href.split("/");
id = url[url.length - 2];

const getData = function() {
  return (dispatch, getState) => {
    // console.log('in get data');
    return axios
      .get(`http://localhost:3000/episodes/${id}`)
      .then(res => {
        const data = res.data.pop();
        const shoutOuts = data.shoutouts ? JSON.parse(data.shoutouts) : [];
        // console.log(shoutOuts);
        const src = data.src;

        dispatch(shoutOutsList(shoutOuts));
        dispatch(source(src));
      })
      .catch(err => {
        // throw(err);
        console.log(err);
      });
  };
};

export default getData;
