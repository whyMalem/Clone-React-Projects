const initialState = {
  authData: null,
  loading: false,
  error: false,
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "START":
      return { authData: null, loading: true, error: false };
    case "SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return { authData: action.payload, loading: false, error: false };
    case "FAIL":
      return { authData: null, loading: false, error: true };
    case "UPLOADING_START":
      return { ...state, loading: true, error: false };
    case "UPLOADING_SUCCESS":
      localStorage.setItem("profile", JSON.stringify({ ...action?.payload }));
      return {
        ...state,
        authData: action.payload,
        loading: false,
        error: false,
      };
    case "UPLOADING_FAIL":
      return { ...state, loading: false, error: true };

    case "FOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [...state.authData.user.following, action.payload],
          },
        },
      };

    case "UNFOLLOW_USER":
      return {
        ...state,
        authData: {
          ...state.authData,
          user: {
            ...state.authData.user,
            following: [
              ...state.authData.user.following.filter(
                (personId) => personId !== action.payload
              ),
            ],
          },
        },
      };

    case "LOG_OUT":
      localStorage.clear();
      return { authData: null, loading: false, error: false };

    default:
      return state;
  }
};

export default authReducer;
