import axios from "axios";
import { apiEndpoint } from "../api-end-points/api-end-points";
import { PickupRequestRequest, PickupRequestResponse, PickupRequestSummaryListRequest, PickupRequestSummaryListResponse } from "../models/pickupRequestModel";
import { getRequestHeaders } from "../../config/request-headers";

/**
 * This function is used to create new pickup request
 * @param request : PickupRequestRequest
 * @returns : PickupRequestResponse
 */
const createNewPickupRequest = async (request: PickupRequestRequest) => {
    const pickupRequestResponse: PickupRequestResponse = await axios.post(apiEndpoint.createPickupRequest, request, { headers: getRequestHeaders() })
        .then(response => response.data);

    if (pickupRequestResponse) {
        return pickupRequestResponse;
    }
    return null;
}

/**
 * This function is used to get pickup request summary list according to list type
 * @param request : PickupRequestSummaryListRequest
 * @returns : PickupRequestResponse
 */
const getPickupRequestSummaryList = async (request: PickupRequestSummaryListRequest) => {
    const pickupRequestSummaryListResponse: PickupRequestResponse = await axios.post(apiEndpoint.getSummaryList, request, { headers: getRequestHeaders() })
        .then(response => response.data);

    if (pickupRequestSummaryListResponse) {
        return pickupRequestSummaryListResponse;
    }
    return null;
}

export const RequestService = { createNewPickupRequest, getPickupRequestSummaryList };