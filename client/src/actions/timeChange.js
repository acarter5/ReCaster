import changeshoutOutsToRender from './shoutOutsToRender.js';
import changeCurrentShoutOut from './currentShoutOut.js';
import changeCurrentTime from './currentTime.js';




var handleTimeChange = (time, totalShoutOuts, listRef, prevShoutOuts) => {

  const shoutOutsToRender = totalShoutOuts.filter(function(shoutOut) {
    return shoutOut.timespot <= time;
  })

  return (dispatch) => {
    dispatch(changeCurrentTime(time));
    dispatch(changeshoutOutsToRender(shoutOutsToRender));
    dispatch(changeCurrentShoutOut(shoutOutsToRender[shoutOutsToRender.length - 1]));
      if (shoutOutsToRender.length > prevShoutOuts.length ) {
        setTimeout(function() {
          listRef.scrollTop = listRef.scrollHeight;
        }, 100);
      }
  }
};

export default handleTimeChange