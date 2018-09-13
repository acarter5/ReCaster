import Redux from 'redux';

var currentShoutOut = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_PLAY':
      return !state;
    default:
      return state;
  }
};

export default currentShoutOut;