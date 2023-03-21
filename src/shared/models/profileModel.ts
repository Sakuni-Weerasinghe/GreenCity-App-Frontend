export interface ProfileRequest {
    username: string;
    role: string;
}

export interface ProfileResponse {
    response: string;
    status: boolean;
}

export interface CollectionCenterSettingsResponse {
    username: string;
    centerName: string;
    contactNumber: string;
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
    contactNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    location: string;
    description: string;
    wasteType: string;
    payment: string;
    active: string;
    accountStatus: boolean;
    workingDays: string;
}

export interface CollectionCenterSettingsUpdateRequest {
    username: string;
    centerName: string;
    contactNumber: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    location: string;
}

export interface CollectionCenterDetailsUpdateRequest {
    username: string;
    wasteType: string;
    payment: string;
    description: string;
    active: string;
}

export interface UserSettingsUpdateRequest {
    username: string;
    firstName: string;
    lastName: string;
    contactNumber: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
}