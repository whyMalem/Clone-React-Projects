import * as userApi from "../api/userRequests";

export const updateUser = (id, formData) => async (dispatch) => {
  dispatch({ type: "UPLOADING_START" });

  try {
    const { data } = await userApi.updateUser(id, formData);
    dispatch({ type: "UPLOADING_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOADING_FAIL" });
  }
};

export const followUser = (id, data) => async (dispatch) => {
  dispatch({ type: "FOLLOW_USER" });
  userApi.followUser(id, data);
};

export const unfollowUser = (id, data) => async (dispatch) => {
  dispatch({ type: "UNFOLLOW_USER" });
  userApi.unfollowUser(id, data);
};
