import Redux from "redux";

var togglePlay = (state = false, action) => {
  switch (action.type) {
    case "TOGGLE_PLAY":
      return !state;
    default:
      return state;
  }
};

export default togglePlay;
