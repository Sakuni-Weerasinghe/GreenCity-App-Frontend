import axios from "axios";
import authHeader from "../config/auth-headers";

const API_URL = "http://localhost:8080/api/public/";

export const getcollectionCenterList = () => {
    return axios
        .get(API_URL + "collectionCenters/0/10")
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

export const collectionCenterProfileDetailsPublic = (username: string, role: string) => {
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

