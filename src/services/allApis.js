import commonApi from "./commonApi";
import BASE_URL from "./baseUrl";

export const getJobsApi = async () => {
    return await commonApi(`${BASE_URL}/jobs`, "GET")
}

export const applyForJobApi = async (jobId, header) => {
    return await commonApi(`${BASE_URL}/jobs/apply`, "POST", header, { jobId })
}

export const getApplicationsApi = async (header) => {
    return await commonApi(`${BASE_URL}/applications`, "GET", header, null)
}