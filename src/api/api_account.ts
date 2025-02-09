import { get } from 'utils/http_client';
import type { IAccount } from 'models/account';

export const getAccounts = async () => {
  return get<IAccount[]>('/accounts');
};
