export interface ProfileRequest {
    username: string;
    role: string;
}

export interface CollectionCenterSettingsResponse {
    username: string;
    centerName: string;
    contactNumber: number;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    location: string;
    active: boolean;
}

export interface UserSettingsResponse {
    username: string
    firstName: string
    lastName: string
    contactNumber: number
    email: string
    addressLine1: string
    addressLine2: string
    addressLine3: string
}

export interface CollectionCenterDetailsResponse {
    username: string;
    centerName: string;
    contactNumber: number;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    location: string;
    description: string;
    wasteType: string;
    payment: number;
    active: boolean;
    accountStatus: boolean;
    workingDays: string[];
}