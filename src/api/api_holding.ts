import { get, put } from 'utils/http_client';
import type { IHolding } from 'models/holding';

export const getHoldings = (accountId: String) => {
  return get<IHolding[]>(`/${accountId}/holdings`);
};

export const buySecurity = (
  accountId: String,
  securityId: String,
  quantity: number
) => {
  // buy/:accountId/:securityId/:quantity
  return put<any>(`/buy/${accountId}/${securityId}/${quantity}`);
};
