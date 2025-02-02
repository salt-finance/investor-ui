import { get, post } from 'utils/http_client';
import type { IUser } from 'models/user';

export const createUser = (payload: IUser) => {
  return post<IUser>('/user', payload);
};

export const continueRegister = (token: string) => {
  sessionStorage.setItem('token', token);
  return get<IUser>('/continue');
};

export const getUser = () => {
  return get<IUser>('/user');
};
