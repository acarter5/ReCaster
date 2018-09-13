import Redux from 'redux';

var durationChangeReducer = (state = 0, action) => {
  switch (action.type) {
    case 'DURATION_CHANGE':
      return action.duration;
    default:
      return state;
  }
};

export default durationChangeReducer;
