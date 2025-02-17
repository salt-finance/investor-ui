import { writable } from 'svelte/store';
import type { IAccount } from 'models/account';
import { getAccounts } from '@/api/api_account';
import type { IHolding } from 'models/holding';
import { getHoldings } from '@/api/api_holding';

// export const user = writable<Record<string, any>>();
export const accountStore = writable<IAccount | undefined>();

export const fetchAccounts = async () => {
  return getAccounts().then((accounts) => {
    if (accounts.response?.at(0)) {
      accountStore.set(accounts.response.at(0)!);
    }
  });
};

export const holdingsStore = writable<IHolding[] | undefined>();

export const fetchHoldings = async (id: string) => {
  return getHoldings(id).then((holdings) => {
    if (holdings.response?.at(0)) {
      holdingsStore.set(holdings.response);
    }
  });
};
