import { get } from 'utils/http_client';

export const logout = () => {
  sessionStorage.removeItem('token');
  return get<any>('/auth/logout').then((resp) => {
    console.log(resp.response);
    window.location.replace('/');
  });
};

export const tokenTest = async () => {
  let response = await get<any>('/token-test');
  let token = response.response['token'];
  sessionStorage.setItem('token', token);
};
