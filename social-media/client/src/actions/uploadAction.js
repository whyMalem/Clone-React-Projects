import * as uploadApi from "../api/uploadRequests";

export const uploadImage = (data) => async (dispatch) => {
  try {
    await uploadApi.uploadImage(data);
  } catch (error) {
    console.log(error);
  }
};

export const uploadPost = (postData) => async (dispatch) => {
  dispatch({ type: "UPLOAD_START" });

  try {
    const { data } = await uploadApi.uploadPost(postData);
    dispatch({ type: "UPLOAD_SUCCESS", payload: data });
  } catch (error) {
    console.log(error);
    dispatch({ type: "UPLOAD_FAIL" });
  }
};
