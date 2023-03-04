export interface UserInfo {
    authenticationToken: string;
    userRole: string;
    username: string;

}
export interface UserRegisterRequest {
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    username: string;
    password: string;
    confirmPassword: string
}

export interface CollectionCenterRegisterRequest {
    centerName: string;
    contactNumber: string;
    email: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    location: string;
    username: string;
    password: string;
    confirmPassword: string
}

export interface RegisterResponse {
    response: string;
    status: boolean;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface LoginResponse {
    authenticationToken: string;
    username: string;
    userRole: string;
}