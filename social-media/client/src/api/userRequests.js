import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

api.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const getUser = (id) => api.get(`/user/${id}`);
export const updateUser = (id, data) => api.put(`/user/${id}`, data);
export const getAllUser = () => api.get(`/user`);
export const followUser = (id, data) => api.put(`/user/${id}/follow`, data);
export const unfollowUser = (id, data) => api.put(`/user/${id}/unfollow`, data);
