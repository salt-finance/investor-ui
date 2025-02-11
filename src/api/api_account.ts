import { get, post } from 'utils/http_client';
import type { IAccount, IFundingMethod } from 'models/account';

export const getAccounts = async () => {
  return get<IAccount[]>('/accounts');
};

export const getAvailableFundingMethods = async () => {
  return get<IFundingMethod[]>('/funding-methods');
};

export const linkFundingMethod = async (
  account: IAccount,
  fundingMethod: IFundingMethod
) => {
  return post<any>(`/link-funding/${account.id}/${fundingMethod.id}`, {});
};
