import { writable } from 'svelte/store';
import type { IAccount } from 'models/account';
import { getAccounts } from '@/api/api_account';

// export const user = writable<Record<string, any>>();
export const accountStore = writable<IAccount | undefined>();

export const fetchAccounts = async () => {
  return getAccounts().then((accounts) => {
    if (accounts.response?.at(0)) {
      accountStore.set(accounts.response.at(0)!);
    }
  });
};
