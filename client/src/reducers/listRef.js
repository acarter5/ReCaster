import Redux from 'redux';

var listRefReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LIST_REF':
      return action.ref;
    default:
      return state;
  }
};

export default listRefReducer;
