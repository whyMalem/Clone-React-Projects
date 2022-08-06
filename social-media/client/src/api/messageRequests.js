import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8000" });

export const getMessages = (id) => api.get(`/message/${id}`);
export const addMessage = (data) => api.post(`/message`, data);
