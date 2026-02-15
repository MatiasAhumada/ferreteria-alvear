import axios from "axios";

const clientAxios = axios.create({
  baseURL: "/",
  withCredentials: true,
});

export default clientAxios;
