import axios from 'axios';
import { getCookie, getUpdateEmailCookie } from './Cookies';

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
});

axiosInstance.interceptors.request.use(
  async (request) => {
    const cookie = await getCookie();
    const updCookie = await getUpdateEmailCookie()
    if (cookie) {
      request.headers['accesstoken'] = cookie.value;
    }

    return request;
  },
  (error) => {
    console.log(error);
  },
);
