import Redux from 'redux';

var toggleFlippedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_FLIPPED':
      return !state;
    default:
      return state;
  }
};

export default toggleFlippedReducer;