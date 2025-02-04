import { get } from 'utils/http_client';

export const logout = () => {
  sessionStorage.removeItem('token');
  return get<any>('/auth/logout').finally(() => {
    window.location.replace(window.location.origin + window.location.pathname);
  });
};

export const tokenTest = async () => {
  let response = await get<any>('/token-test');
  let token = response.response['token'];
  sessionStorage.setItem('token', token);
};
