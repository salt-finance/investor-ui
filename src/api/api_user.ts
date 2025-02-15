import { get, post } from 'utils/http_client';
import type { IUser } from 'models/user';

export const createUser = (payload: IUser) => {
  return post<any>('/user', payload);
};

export const continueRegister = (token: string) => {
  localStorage.setItem('token', token);
  return get<IUser>('/get-started');
};

export const getUser = () => {
  return get<IUser>('/user');
};
