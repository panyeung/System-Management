import * as actionTypes from "../actions/imgActions";

const initialState = {
  imgs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_IMG:
      return {
        ...state,
        imgs: action.imgs,
      };
    default:
      return state;
  }
  return state;
};

export default reducer;
