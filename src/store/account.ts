import { writable, get } from 'svelte/store';
import type { IAccount } from 'models/account';
import { getAccounts } from '@/api/api_account';
import type { IHolding } from 'models/holding';
import { getHoldings } from '@/api/api_holding';

let holdingsCall: Promise<void> | undefined;

export const accountStore = writable<IAccount | undefined>();

export const fetchAccounts = async () => {
  return getAccounts().then((accounts) => {
    if (accounts.response?.at(0)) {
      accountStore.set(accounts.response.at(0)!);
    }
  });
};

export const holdingsStore = writable<IHolding[] | undefined>();

export const fetchHoldings = async (id?: string, force?: boolean) => {
  let holdings = get(holdingsStore)?.length;
  if (!id || (!force && holdings !== undefined && holdings > 0)) {
    return;
  }

  if (holdingsCall !== undefined) {
    return holdingsCall;
  }

  holdingsCall = getHoldings(id)
    .then((holdings) => {
      holdingsStore.set(holdings.response);
    })
    .finally(() => {
      holdingsCall = undefined;
    });

  return holdingsCall;
};
