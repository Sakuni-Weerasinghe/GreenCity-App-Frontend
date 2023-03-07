import axios from "axios";
import authHeader from "../../config/auth-headers";

const API_URL = "http://localhost:8080/api/profile/";

// const headers = {
//     'Content-Type': 'application/json',
//     'Authorization': authHeader()
// }

export const userProfileDetails = (username: string, role: string) => {
    return axios
        .post(API_URL + "user", {
            username,
            role,
        }, { headers: authHeader() })
        .then((response) => {
            if (response) {
                const userProfile = JSON.stringify(response.data);
                localStorage.setItem("userProfile", userProfile);
            }
            return response;
        });
};

export const collectionCenterProfileDetails = (username: string, role: string) => {
    return axios
        .post(API_URL + "collectionCenter", {
            username,
            role,
        }, { headers: authHeader() })
        .then((response) => {
            if (response) {
                const centerProfile = JSON.stringify(response.data);
                localStorage.setItem("centerProfile", centerProfile);
            }
            return response;
        });
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem("userData");
    if (userStr) return JSON.parse(userStr);
    return null;
};

export const getCurrentUserProfileDetails = () => {
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) return JSON.parse(userProfile);
    return null;
}

export const getCurrentCollectionCenterProfileDetails = () => {
    const centerProfile = localStorage.getItem("centerProfile");
    if (centerProfile) return JSON.parse(centerProfile);
    return null;
}

export const collectionCenterProfileAddDetails = (
    currentUserName: string,
    wastetype: string,
    payment: number,
    description: string,
) => {
    return axios
        .put(API_URL + "collectionCenter/addDetail", {
            currentUserName,
            wastetype,
            payment,
            description,
        }, { headers: authHeader() })
        .then((response) => {
            if (response) {
                collectionCenterProfileDetails(currentUserName, "COLLECTION_CENTER")
            }
            return response;
        });
};

export const customerProfileUpdate = (
    currentUserName: string,
    firstName: string,
    lastName: string,
    contactNumber: string,
    email: string,
    addressLine1: string,
    addressLine2: string,
    addressLine3: string,
    username: string,
    status: string
) => {
    return axios
        .put(API_URL + "user/update", {
            currentUserName,
            firstName,
            lastName,
            contactNumber,
            email,
            addressLine1,
            addressLine2,
            addressLine3,
            username,
            status
        }, { headers: authHeader() })
        .then((response) => {
            if (response) {
                userProfileDetails(currentUserName, "USER")
                // const updateUserData = userProfileDetails(currentUserName, "USER")
                // localStorage.setItem("userProfile", updateUserData);
            }
            return response;
        });
};

export const fullcollectionCenterProfileUpdate = (
    currentUserName: string,
    username: string,
    centername: string,
    contactnumber: string,
    email: string,
    addressline1: string,
    addressline2: string,
    addressline3: string,
    location: string,
    wastetype: string,
    payment: number,
    description: string,
    status: string
) => {
    return axios
        .put(API_URL + "collectionCenter/updateMore", {
            currentUserName,
            username,
            centername,
            contactnumber,
            email,
            addressline1,
            addressline2,
            addressline3,
            location,
            wastetype,
            payment,
            description,
            status
        }, { headers: authHeader() })
        .then((response) => {
            if (response) {
                collectionCenterProfileDetails(currentUserName, "COLLECTION_CENTER")
                // const updateUserData = userProfileDetails(currentUserName, "USER")
                // localStorage.setItem("userProfile", updateUserData);
            }
            return response;
        });
};

export const collectionCenterProfileUpdate = (
    currentUserName: string,
    username: string,
    centername: string,
    contactnumber: string,
    email: string,
    addressline1: string,
    addressline2: string,
    addressline3: string,
    location: string,
    status: string
) => {
    return axios
        .put(API_URL + "collectionCenter/update", {
            currentUserName,
            username,
            centername,
            contactnumber,
            email,
            addressline1,
            addressline2,
            addressline3,
            location,
            status
        }, { headers: authHeader() })
        .then((response) => {
            if (response) {
                collectionCenterProfileDetails(currentUserName, "COLLECTION_CENTER")
                // const updateUserData = userProfileDetails(currentUserName, "USER")
                // localStorage.setItem("userProfile", updateUserData);
            }
            return response;
        });
};