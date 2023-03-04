import { environment } from "../../environments/environment";

const BASE_URL = environment.apiEndpointUrl;

export const apiEndpoint = {
    registerCollectionCenter: `${BASE_URL}/auth/collectionCenterRegister`,
    registerUser: `${BASE_URL}/auth/userRegister`,
    login: `${BASE_URL}/auth/login`,
    userSettings: `${BASE_URL}/profile/userSettings`,
    collectionCenterSettings: `${BASE_URL}/profile/collectionCenterSettings`,
    CollectionCenterDetails: `${BASE_URL}/profile/collectionCenterDetails`,
};