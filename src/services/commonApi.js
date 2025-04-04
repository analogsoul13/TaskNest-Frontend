import axios from "axios";

const commonApi = async (reqUrl, reqMethod, reqHeader, reqBody) => {

    const isFormData = reqBody instanceof FormData

    const config = {
        url: reqUrl,
        method: reqMethod,
        headers: reqHeader ? reqHeader : isFormData ? {} : { 'Content-type':'application/json'},
        data: reqBody,
        withCredentials: true
    }

    return await axios(config).then(res => res).catch(err => err)
}

export default commonApi