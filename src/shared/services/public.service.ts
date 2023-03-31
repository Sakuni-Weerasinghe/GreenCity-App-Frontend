import axios from "axios";
import { apiEndpoint } from "../api-end-points/api-end-points";
import { CollectionCenterDetailsResponse, CollectionCenterListResponse } from "../models/publicModals";

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

/**
 * This function is used to get collection center settings from backend
 * @param request : ProfileRequest
 * @returns : collection center settings
 */
const getCollectionCenterDetails = async (collectionCenterUsername: string) => {
    const url = `${apiEndpoint.getCollectionCenterDetails}/${collectionCenterUsername}`;
    const collectionCenterDetailsResponse: CollectionCenterDetailsResponse = await axios.get(url, { headers: { 'Content-Type': 'application/json' } })
        .then(response => response.data);

    if (collectionCenterDetailsResponse) {
        return collectionCenterDetailsResponse;
    }
    return null;
}

export const PublicService = { getCollectionCenterSummaryList, getCollectionCenterDetails };