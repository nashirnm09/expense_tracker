import api from "axios";

const axios = api.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

export default axios;
