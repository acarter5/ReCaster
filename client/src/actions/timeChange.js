import changeshoutOutsToRender from './shoutOutsToRender.js';
import changeCurrentShoutOut from './currentShoutOut.js';
import changeCurrentTime from './currentTime.js';




var handleTimeChange = (time, totalShoutOuts, listRef) => {

  const shoutOutsToRender = totalShoutOuts.filter(function(shoutOut) {
    return shoutOut.timespot <= time;
  })

  return (dispatch) => {
    dispatch(changeCurrentTime(time));
    dispatch(changeshoutOutsToRender(shoutOutsToRender));
    dispatch(changeCurrentShoutOut(shoutOutsToRender[shoutOutsToRender.length - 1]));
    listRef.scrollTop = listRef.scrollHeight;
  }
};

export default handleTimeChange