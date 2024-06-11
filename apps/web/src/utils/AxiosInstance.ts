import axios from "axios";
import { getCookie } from "./Cookies";

export const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL
})

axiosInstance.interceptors.request.use(
    async (request) => {
        const cookie = await getCookie();
        if (cookie) {
            request.headers['accesstoken'] = cookie.value;
        }

        return request;
    },
    (error) => {
        console.log(error);
    },
);