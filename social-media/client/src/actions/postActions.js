import * as postApi from "../api/postRequests";
export const getTimelinePosts = (id) => async (dispatch) => {
  dispatch({ type: "RETREIVING_START" });

  try {
    const { data } = await postApi.getTimelinePosts(id);
    dispatch({ type: "RETREIVING_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "RETREIVING_FAIL" });
  }
};
