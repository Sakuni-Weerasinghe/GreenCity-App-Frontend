import axios from "axios";
import { CollectionCenterRegisterRequest, RegisterResponse, UserRegisterRequest } from "../models/authModel";
import { apiEndpoint } from "../api-end-points/api-end-points";


const API_URL = "http://localhost:8080/api/auth/";


/**
 * This function is used to register user using api-end-point
 * @param request : UserRegisterRequest
 * @returns : RegisterResponse
 */
const userSignUp = async (request: UserRegisterRequest) => {
  try {
    const registerResponse: RegisterResponse = await axios.post(apiEndpoint.registerUser, request).then(response => response.data);
    return registerResponse;
  } catch (error) {
    return { response: 'user register error', status: false };
  }
}

/**
 * This function is used to register collection center using api-end-point
 * @param request : CollectionCenterRegisterRequest
 * @returns : RegisterResponse
 */
const collectionCenterSignUp = async (request: CollectionCenterRegisterRequest) => {
  try {
    const registerResponse: RegisterResponse = await axios.post(apiEndpoint.registerCollectionCenter, request).then(response => response.data);
    return registerResponse;
  } catch (error) {
    return { response: 'collection center register error', status: false };
  }
}

export const login = (username: string, password: string) => {
  return axios
    .post(API_URL + "login", {
      username,
      password,
    })
    .then((response) => {
      if (response) {
        const userData = JSON.stringify(response.data);
        localStorage.setItem("userData", userData);
      }
      return response;
    });
};

export const logout = () => {
  localStorage.removeItem("userData");
  localStorage.removeItem("userProfile");
  localStorage.removeItem("userProfileMore");
  localStorage.removeItem("centerProfile");
};

export const getLoginStatus = () => {
  if (localStorage.getItem("userData")) {
    return true;
  } else {
    return false;
  }
}


export const AuthService = { userSignUp, collectionCenterSignUp };