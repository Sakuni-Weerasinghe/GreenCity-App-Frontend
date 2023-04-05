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
    response: string | PickupRequestSummaryListResponse[];
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