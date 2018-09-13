import Redux from 'redux';

var shoutOutsListReducer = (state = [], action) => {
  switch (action.type) {
    case 'GET_SHOUTOUTS_LIST':
      return action.shoutOuts;
    default:
      return state;
  }
};

export default shoutOutsListReducer;
