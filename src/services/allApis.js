import commonApi from "./commonApi";
import BASE_URL from "./baseUrl";

export const getJobsApi = async () => {
    return await commonApi(`${BASE_URL}/jobs`, "GET")
}