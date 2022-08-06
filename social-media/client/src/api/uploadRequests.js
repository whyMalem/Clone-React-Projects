import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

export const uploadImage = (data) => api.post("/upload", data);
export const uploadPost = (data) => api.post("/posts", data);
