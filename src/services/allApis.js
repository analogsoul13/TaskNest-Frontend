import commonApi from "./commonApi";
import BASE_URL from "./baseUrl";

export const getUserProfileApi = async (header) => {
    return await commonApi(`${BASE_URL}/profile`, "GET", header)
}

export const updateUserProfileApi = async (header, data) => {
    return await commonApi(`${BASE_URL}/profile`, "PUT", header, data)
}

export const getJobsApi = async () => {
    return await commonApi(`${BASE_URL}/jobs`, "GET")
}

export const getMyJobsApi = async (header) => {
    return await commonApi(`${BASE_URL}/myjobs`, "GET", header)
}

export const applyForJobApi = async (jobId, header) => {
    return await commonApi(`${BASE_URL}/jobs/apply`, "POST", header, { jobId })
}

export const getApplicationsApi = async (header) => {
    return await commonApi(`${BASE_URL}/applications`, "GET", header, null)
}

export const createJobApi = async (header, jobData) => {
    return await commonApi(`${BASE_URL}/jobs`, "POST", header, jobData)
}

export const deleteJobApi = async (jobId, header) => {
    return await commonApi(`${BASE_URL}/jobs/${jobId}`, "DELETE", header, jobId)
}

export const updateApplicationStatusApi = async (applicationId, status, header) => {
    return await commonApi(`${BASE_URL}/applications/status/${applicationId}`, "PUT", header, { status })
}