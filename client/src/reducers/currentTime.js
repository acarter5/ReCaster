import Redux from 'redux';

var currentTime = (state = 0, action) => {
  switch (action.type) {
    case 'CHANGE_CURRENT_TIME':
      return action.currentTime;
    default:
      return state;
  }
};

export default currentTime;