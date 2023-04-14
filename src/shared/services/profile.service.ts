import axios from "axios";
import {
    CollectionCenterDetailsResponse,
    CollectionCenterDetailsUpdateRequest,
    CollectionCenterSettingsResponse,
    CollectionCenterSettingsUpdateRequest, ProfileRequest,
    ProfileResponse, UserSettingsResponse, UserSettingsUpdateRequest
} from "../models/profileModel";
import { apiEndpoint } from "../api-end-points/api-end-points";
import { getRequestHeaders } from "../../config/request-headers";

/**
 * This function is used to get collection center settings from backend
 * @param request : ProfileRequest
 * @returns : collection center settings
 */
const getCollectionCenterSettings = async (request: ProfileRequest) => {
    const collectionCenterSettingsResponse: CollectionCenterSettingsResponse = await axios
        .post(apiEndpoint.collectionCenterSettings, request, { headers: getRequestHeaders() }).then(response => response.data);

    if (collectionCenterSettingsResponse) {
        return collectionCenterSettingsResponse;
    }
    return null;
}

/**
 * This function is used to get user settings from backend
 * @param request : ProfileRequest
 * @returns : user settings
 */
const getUserSettings = async (request: ProfileRequest) => {
    const userSettingsResponse: UserSettingsResponse = await axios
        .post(apiEndpoint.userSettings, request, { headers: getRequestHeaders() }).then(response => response.data);

    if (userSettingsResponse) {
        return userSettingsResponse;
    }
    return null;
}

/**
 * This function is used to get collection center details from backend
 * @param request : ProfileRequest
 * @returns : collection center details
 */
const getCollectionCenterDetails = async (request: ProfileRequest) => {
    const collectionCenterDetailsResponse: CollectionCenterDetailsResponse = await axios
        .post(apiEndpoint.CollectionCenterDetails, request, { headers: getRequestHeaders() }).then(response => response.data);

    if (collectionCenterDetailsResponse) {
        return collectionCenterDetailsResponse;
    }
    return null;
}

/**
 * This function is used to update collection center settings from backend
 * @param request : CollectionCenterSettingsUpdateRequest
 * @returns : collection center settings
 */
const updateCollectionCenterSettings = async (request: CollectionCenterSettingsUpdateRequest) => {
    const collectionCenterSettingsUpdateResponse: ProfileResponse = await axios
        .put(apiEndpoint.collectionCenterSettings, request, { headers: getRequestHeaders() }).then(response => response.data);

    if (collectionCenterSettingsUpdateResponse) {
        return collectionCenterSettingsUpdateResponse;
    }
    return null;
}

/**
 * This function is used to get collection center settings from backend
 * @param request : ProfileRequest
 * @returns : collection center settings
 */
const updateCollectionCenterDetails = async (request: CollectionCenterDetailsUpdateRequest) => {
    const collectionCenterDetailsUpdateResponse: ProfileResponse = await axios
        .put(apiEndpoint.CollectionCenterDetails, request, { headers: getRequestHeaders() }).then(response => response.data);

    if (collectionCenterDetailsUpdateResponse) {
        return collectionCenterDetailsUpdateResponse;
    }
    return null;
}

const API_URL = "http://localhost:8080/api/profile/";


export const userProfileDetails = (username: string, role: string) => {
    return axios
        .post(API_URL + "user", {
            username,
            role,
        }, { headers: getRequestHeaders() })
        .then((response) => {
            if (response) {
                const userProfile = JSON.stringify(response.data);
                localStorage.setItem("userProfile", userProfile);
            }
            return response;
        });
};

export const collectionCenterProfileDetails = (username: string, role: string) => {
    return axios
        .post(API_URL + "collectionCenter", {
            username,
            role,
        }, { headers: getRequestHeaders() })
        .then((response) => {
            if (response) {
                const centerProfile = JSON.stringify(response.data);
                localStorage.setItem("centerProfile", centerProfile);
            }
            return response;
        });
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("userData");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const getCurrentUserProfileDetails = () => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) return JSON.parse(userProfile);
    return null;
}

export const getCurrentCollectionCenterProfileDetails = () => {
    const centerProfile = localStorage.getItem("centerProfile");
    if (centerProfile) return JSON.parse(centerProfile);
    return null;
}

export const collectionCenterProfileAddDetails = (
    currentUserName: string,
    wastetype: string,
    payment: number,
    description: string,
) => {
    return axios
        .put(API_URL + "collectionCenter/addDetail", {
            currentUserName,
            wastetype,
            payment,
            description,
        }, { headers: getRequestHeaders() })
        .then((response) => {
            if (response) {
                collectionCenterProfileDetails(currentUserName, "COLLECTION_CENTER")
            }
            return response;
        });
};

export const customerProfileUpdate = (
    currentUserName: string,
    firstName: string,
    lastName: string,
    contactNumber: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    username: string,
    status: string
) => {
    return axios
        .put(API_URL + "user/update", {
            currentUserName,
            firstName,
            lastName,
            contactNumber,
            email,
            addressLine1,
            addressLine2,
            addressLine3,
            username,
            status
        }, { headers: getRequestHeaders() })
        .then((response) => {
            if (response) {
                userProfileDetails(currentUserName, "USER")
                // const updateUserData = userProfileDetails(currentUserName, "USER")
                // localStorage.setItem("userProfile", updateUserData);
            }
            return response;
        });
};

export const fullcollectionCenterProfileUpdate = (
    currentUserName: string,
    username: string,
    centername: string,
    contactnumber: string,
    email: string,
    addressline1: string,
    addressline2: string,
    addressline3: string,
    location: string,
    wastetype: string,
    payment: number,
    description: string,
    status: string
) => {
    return axios
        .put(API_URL + "collectionCenter/updateMore", {
            currentUserName,
            username,
            centername,
            contactnumber,
            email,
            addressline1,
            addressline2,
            addressline3,
            location,
            wastetype,
            payment,
            description,
            status
        }, { headers: getRequestHeaders() })
        .then((response) => {
            if (response) {
                collectionCenterProfileDetails(currentUserName, "COLLECTION_CENTER")
                // const updateUserData = userProfileDetails(currentUserName, "USER")
                // localStorage.setItem("userProfile", updateUserData);
            }
            return response;
        });
};

export const collectionCenterProfileUpdate = (
    currentUserName: string,
    username: string,
    centername: string,
    contactnumber: string,
    email: string,
    addressline1: string,
    addressline2: string,
    addressline3: string,
    location: string,
    status: string
) => {
    return axios
        .put(API_URL + "collectionCenter/update", {
            currentUserName,
            username,
            centername,
            contactnumber,
            email,
            addressline1,
            addressline2,
            addressline3,
            location,
            status
        }, { headers: getRequestHeaders() })
        .then((response) => {
            if (response) {
                collectionCenterProfileDetails(currentUserName, "COLLECTION_CENTER")
                // const updateUserData = userProfileDetails(currentUserName, "USER")
                // localStorage.setItem("userProfile", updateUserData);
            }
            return response;
        });
};

/**
 * This function is used to update user settings of database
 * @param request : UserSettingsUpdateRequest
 * @returns : ProfileResponse
 */
const updateUserSettings = async (request: UserSettingsUpdateRequest) => {
    const userSettingsUpdateResponse: ProfileResponse = await axios
        .put(apiEndpoint.userSettings, request, { headers: getRequestHeaders() }).then(response => response.data);

    if (userSettingsUpdateResponse) {
        return userSettingsUpdateResponse;
    }
    return null;
}

export const ProfileService = {
    fullcollectionCenterProfileUpdate,
    collectionCenterProfileUpdate,
    getCollectionCenterSettings,
    getUserSettings,
    getCollectionCenterDetails,
    updateCollectionCenterSettings,
    updateCollectionCenterDetails,
    updateUserSettings
};