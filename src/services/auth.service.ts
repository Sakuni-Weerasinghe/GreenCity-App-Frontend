import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";
let loginStatus: boolean = false;

export const ccentersignup = (
  centerName: string,
  contactNumber: string,
  email: string,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  username: string,
  password: string,
  confirmPassword: string
) => {
  return axios.post(API_URL + "collectionCenterRegister", {
    username,
    centerName,
    password,
    confirmPassword,
    contactNumber,
    email,
    addressLine1,
    addressLine2,
    addressLine3
  });
};

export const usersignup = (
  firstName: string,
  lastName: string,
  contactNumber: string,
  email: string,
  addressLine1: string,
  addressLine2: string,
  addressLine3: string,
  username: string,
  password: string,
  confirmPassword: string
) => {
  return axios.post(API_URL + "userRegister", {
    username,
    firstName,
    lastName,
    password,
    confirmPassword,
    contactNumber,
    email,
    addressLine1,
    addressLine2,
    addressLine3,
  });
};

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response) {
        const userData = JSON.stringify(response);
        localStorage.setItem("userData", userData);
        loginStatus = true;
      }
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem("userData");
  loginStatus = false;
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("userData");
  if (userStr) return JSON.parse(userStr);

  return null;
};

export const getLoginStatus = () => {
  return loginStatus;
}
