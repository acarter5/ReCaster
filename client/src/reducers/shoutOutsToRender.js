import Redux from 'redux';

var shoutOutsListReducer = (state = [], action) => {
  switch (action.type) {
    case 'CHANGE_SHOUTOUTSTORENDER':
      return action.shoutOuts;
    default:
      return state;
  }
};

export default shoutOutsListReducer;
