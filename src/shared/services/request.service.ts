import axios from "axios";
import { apiEndpoint } from "../api-end-points/api-end-points";
import { PickupRequestRequest, PickupRequestResponse } from "../models/pickupRequestModel";
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

export const RequestService = { createNewPickupRequest };