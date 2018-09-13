import Redux from 'redux';

var currentShoutOut = (state = {}, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_SHOUTOUT':
      return action.shoutOut;
    default:
      return state;
  }
};

export default currentShoutOut;