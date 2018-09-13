import Redux from 'redux';

var sourceReducer = (state = '', action) => {
  switch (action.type) {
    case 'GET_SRC':
      return action.src;
    default:
      return state;
  }
};

export default sourceReducer;
