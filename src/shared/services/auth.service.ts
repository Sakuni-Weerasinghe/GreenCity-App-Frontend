import axios from "axios";
import { CollectionCenterRegisterRequest, LoginRequest, LoginResponse, RegisterResponse, UserRegisterRequest } from "../models/authModel";
import { apiEndpoint } from "../api-end-points/api-end-points";
import { isExpired } from "react-jwt";


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

/**
 * This function is used to authenticate users using api-end-point
 * @param request : LoginRequest
 * @returns : login response
 */
const login = async (request: LoginRequest) => {
  try {
    const loginResponse: LoginResponse = await axios.post(apiEndpoint.login, request).then(response => response.data);
    return loginResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}

/**
 * This function is used to remove user details from local storage
 */
export const logout = () => {
  localStorage.removeItem("authenticationToken");
  localStorage.removeItem("username");
  localStorage.removeItem("userRole");
  localStorage.removeItem("userProfile");
  localStorage.removeItem("userProfileMore");
  localStorage.removeItem("centerProfile");
};

/**
 * This function is used to check jwt validation
 * @returns : login status
 */
export const getLoginStatus = () => {
  const jwt = localStorage.getItem("authenticationToken");
  if (jwt) {
    return !isExpired(jwt);
  } else {
    return false;
  }
}


export const AuthService = { userSignUp, collectionCenterSignUp, login };