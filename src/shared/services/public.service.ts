import axios from "axios";
import { getRequestHeaders } from "../../config/request-headers";
import { apiEndpoint } from "../api-end-points/api-end-points";
import { CollectionCenterListResponse } from "../models/homeModals";

/**
 * This function is used to get collection center settings from backend
 * @param request : ProfileRequest
 * @returns : collection center settings
 */
const getCollectionCenterSummaryList = async (pageNumber: number, count: number) => {
    const url = `${apiEndpoint.getCollectionCenterSummaryList}/${pageNumber}/${count}`;
    const collectionCenterSummaryListResponse: CollectionCenterListResponse = await axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => response.data);

    if (collectionCenterSummaryListResponse) {
        return collectionCenterSummaryListResponse;
    }
    return null;
}

const API_URL = "http://localhost:8080/api/public/";

export const collectionCenterProfileDetailsPublic = (username: string, role: string) => {
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

export const PublicService = { getCollectionCenterSummaryList };