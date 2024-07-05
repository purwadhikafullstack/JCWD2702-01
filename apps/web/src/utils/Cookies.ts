'use server';
import { cookies } from 'next/headers';

export const setCookie = (accesstoken: any) => {
  cookies().set('acctkn', accesstoken);
};

export const setUpdateEmailCookie = (accesstoken: any) => {
  cookies().set('updcookie', accesstoken);
};

export const getCookie = () => {
  return cookies().get('acctkn');
};

export const getUpdateEmailCookie = () => {
  return cookies().get('updcookie');
};

export const deleteCookie = () => {
  cookies().delete('acctkn');
};

export const deleteUpdateCookie = () => {
  cookies().delete('updcookie');
};
