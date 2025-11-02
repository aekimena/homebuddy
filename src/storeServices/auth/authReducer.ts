const initialState = {
  token: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setToken":
      return { ...state, token: action.payload };
    default:
      return state;
  }
};

export const selectToken = (state) => state.auth.token;

export default authReducer;
