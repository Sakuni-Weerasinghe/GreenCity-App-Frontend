import axios from "axios";
import authHeader from "../config/auth-headers";

const API_URL = "http://localhost:8080/api/test/";

// export const getPublicContent = () => {
//    return axios.get(API_URL + "all");
// };

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

export const getCenterBoard = () => {
  return axios.get(API_URL + "center", { headers: authHeader() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};