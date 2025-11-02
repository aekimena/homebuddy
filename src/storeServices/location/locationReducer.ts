const initialState = {
  location: { state: "Kaduna", country: "Nigeria" },
};

const locationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "setLocation":
      return { ...state, location: action.payload };
    default:
      return state;
  }
};

export const selectLocation = (state) => state.location.location;

export default locationReducer;
