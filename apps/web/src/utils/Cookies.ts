'use server';
import { cookies } from 'next/headers';

export const setCookie = (accesstoken: any) => {
    cookies().set('acctkn', accesstoken);
};

export const getCookie = () => {
    return cookies().get('acctkn');
};

export const deleteCookie = () => {
    cookies().delete('acctkn');
};