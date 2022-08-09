import axios from "axios";
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8800",
  timeout: 10000,
  headers: {
    "content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // console.log("intercept");
    if (config.TYPE.params) {
      // console.log("pa");
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      // console.log("qu");
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => {
    // Stop global loader here
    return processResponse(response);
  },
  (error) => {
    // Stop global loader here
    return Promise.reject(processError(error));
  }
);

///////////////////////////////////
// If success => return {isSuccess : true, data: object}
// If fail => return {isFailure : true, status:"string", msg:string, code: int}
function processResponse(response) {
  if (response?.status === 200) {
    return { isSuccess: true, data: response?.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
}

///////////////////////////////////
// If success => return {isSuccess : true, data: object}
// If fail => return {isFailure : true, status:"string", msg:string, code: int}
function processError(error) {
  if (error.response) {
    // Request made and server responded with a status other that falls out of range of 2.x.x
    console.log("Error in response");
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.responseFailure,
      code: error.response?.status,
    };
  } else if (error.request) {
    // Request made but no response was receive
    console.log("Error in request");
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.requestFailure,
      code: "",
    };
  } else {
    // something happend in setting up request that triggers an error
    console.log("Error in network");
    return {
      isError: true,
      msg: API_NOTIFICATION_MESSAGES.networkError,
      code: "",
    };
  }
}

export const API = {};

for (const [key, value] of Object.entries(SERVICE_URLS)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) => {
    // console.log(body);

    return axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
  };
}

// import axios from "axios";

// const api = axios.create({ baseURL: "http://localhost:8800" });

// export const userSignUp = (formData) => api.post("/auth/signup", formData);
