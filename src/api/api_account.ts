import { get, post } from 'utils/http_client'
import type { IAccount, IFundingMethod } from 'models/account'

export const getAccounts = async () => {
  return get<IAccount[]>('/accounts')
}

export const getAvailableFundingMethods = async () => {
  return get<IFundingMethod[]>('/funding-methods')
}

export const linkFundingMethod = async (
  account: IAccount,
  fundingMethodId: string,
) => {
  return post<any>(`/link-funding/${account.id}/${fundingMethodId}`, {})
}

export const withdrawFunds = async (account: IAccount, amount: number) => {
  return post<any>(`/withdraw/${account.id}`, {
    amount: parseFloat(amount.toString()),
  })
}

export const depositFunds = async (account: IAccount, amount: number) => {
  return post<any>(`/deposit/${account.id}`, {
    amount: parseFloat(amount.toString()),
  })
}
