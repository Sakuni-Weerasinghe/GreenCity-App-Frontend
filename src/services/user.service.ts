import axios from "axios";
import { getRequestHeaders } from "../config/request-headers";

const API_URL = "http://localhost:8080/api/test/";

// export const getPublicContent = () => {
//    return axios.get(API_URL + "all");
// };

export const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: getRequestHeaders() });
};

export const getCenterBoard = () => {
  return axios.get(API_URL + "center", { headers: getRequestHeaders() });
};

export const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: getRequestHeaders() });
};