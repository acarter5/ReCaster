import Redux from 'redux';

var currentShoutOut = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_SHOUTOUT':
      if (action.shoutOut) {
        return action.shoutOut;
      }
      return state;
    default:
      return state;
  }
};

export default currentShoutOut;