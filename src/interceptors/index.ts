import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://arxatec-service-production.up.railway.app",
});

export default axiosInstance;
