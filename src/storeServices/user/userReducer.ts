import { USER_SET_VALUE } from "./constants";

const initialState = {
  user: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_SET_VALUE:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

const selectUser = (state) => state.user.user;

export { selectUser };

export default userReducer;
