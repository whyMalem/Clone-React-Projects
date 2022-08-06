// let initialState = {
//   posts: [],
//   loading: false,
//   error: false,
//   uploading: false,
// };
const uploadReducer = (
  state = {
    posts: [],
    loading: false,
    error: false,
    uploading: false,
  },
  action
) => {
  switch (action.type) {
    case "UPLOAD_START":
      return { ...state, uploading: true };
    case "UPLOAD_SUCCESS":
      //   localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      //   console.log(...state.posts);
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        uploading: false,
      };
    case "UPLOAD_FAIL":
      return { ...state, loading: false, error: true, uploading: false };

    default:
      return state;
  }
};

export default uploadReducer;
