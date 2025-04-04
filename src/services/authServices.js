import commonApi from "./commonApi";
import BASE_URL from "./baseUrl";

export const registerApi = async (userData) => {
    return await commonApi(`${BASE_URL}/register`, "POST", null, userData)
}

export const loginApi = async (credentials) => {
    return await commonApi(`${BASE_URL}/login`, "POST", null, credentials)
}