import { USER_SET_VALUE } from "./constants";

const setUser = (value) => ({
  type: USER_SET_VALUE,
  payload: value,
});

export { setUser };
