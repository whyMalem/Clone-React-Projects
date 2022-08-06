import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

export const getTimelinePosts = (id) => api.get(`/posts/${id}/timeline`);
export const likePost = (id, userId) =>
  api.put(`/posts/${id}/like`, { userId });
