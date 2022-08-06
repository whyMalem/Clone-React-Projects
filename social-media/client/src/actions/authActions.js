import * as authApi from "../api/authRequests";

export const logIn = (formData) => async (dispatch) => {
  dispatch({ type: "START" });
  try {
    const { data } = await authApi.logIn(formData);
    dispatch({ type: "SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FAIL" });
  }
};

export const signUp = (formData) => async (dispatch) => {
  dispatch({ type: "START" });
  try {
    const { data } = await authApi.signUp(formData);
    dispatch({ type: "SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "FAIL" });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({ type: "LOG_OUT" });
};
