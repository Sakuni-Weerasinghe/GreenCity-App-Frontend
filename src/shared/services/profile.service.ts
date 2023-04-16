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
    getCollectionCenterSettings,
    getUserSettings,
    getCollectionCenterDetails,
    updateCollectionCenterSettings,
    updateCollectionCenterDetails,
    updateUserSettings
};