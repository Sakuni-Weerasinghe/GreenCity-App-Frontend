export interface CollectionCenterSummary {
    username: string;
    centerName: string;
    wasteType: string;
    location: string;
}

export interface CollectionCenterListResponse {
    status: boolean;
    response: CollectionCenterSummary[];
}

export interface CollectionCenterDetailsResponse {
    username: string;
    centerName: string;
    contactNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    location: string;
    description: string;
    wasteType: string;
    payment: number;
    workingDays: string[];
}