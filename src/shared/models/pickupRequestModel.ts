export interface PickupRequestRequest {
    quantity: string;
    customerContactNumber: string;
    customerAddressLine1: string;
    customerAddressLine2: string;
    customerAddressLine3: string;
    customerLocation: string;
    note: string;
    totalPayment: number;
    customerUsername: string;
    collectionCenterUsername: string;
}

export interface PickupRequestResponse {
    response: string | PickupRequestSummaryListResponse[] | PickupRequestDetailsResponse | PickupRequestStatusUpdateRequest;
    status: boolean;
}

export interface PickupRequestSummaryListRequest {
    username: string;
    userRole: string;
    listType: string;
}

export interface PickupRequestSummaryListResponse {
    requestId: string;
    customerName: string;
    collectionCenterName: string;
    wasteType: string;
    createdDate: string;
}

export interface PickupRequestDetailsResponse {
    requestId: string;
    status: string;
    note: string;
    collectionCenterName: string;
    customerName: string;
    createdDate: string;
    acceptedDate: string;
    completedDate: string;
    canceledDate: string;

    wasteType: string;
    workingDays: string[];
    quantity: number;
    totalPayment: string;
    location: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
}

export interface PickupRequestStatusUpdateRequest {
    username: string;
    userRole: string;
    updatedStatus: string;
    requestId: string;
}

