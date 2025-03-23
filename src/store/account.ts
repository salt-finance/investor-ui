import { writable, get } from 'svelte/store';
import type { IAccount } from 'models/account';
import { getAccounts } from '@/api/api_account';
import type { IHolding } from 'models/holding';
import { getHoldings } from '@/api/api_holding';
import type { IApiResponse } from 'utils/http_client';
import type { Result } from 'models/trycatch';

let holdingsCall: Promise<Result<IApiResponse<IHolding[]>>> | undefined;

export const accountStore = writable<IAccount>();

// Does not return accounts, simply updates the store, does not emit errors.
export const fetchAccounts = async () => {
  const result = await getAccounts();

  if (result.data !== null && result.data.response?.at(0)) {
    accountStore.set(result.data.response.at(0)!);
    return;
  }
};

export const holdingsStore = writable<IHolding[] | undefined>();

// Does not return the holdings, simply updates the store, does not emit errors.
export const fetchHoldings = async (id?: string, force?: boolean) => {
  let holdings = get(holdingsStore)?.length;

  if (!id || (!force && holdings !== undefined && holdings > 0)) {
    return;
  }

  if (holdingsCall === undefined) {
    holdingsCall = getHoldings(id);
  }

  const result = await holdingsCall;
  // Clear holdings call after result.
  holdingsCall = undefined;

  if (result!.data !== null) {
    holdingsStore.set(result!.data.response);
    return;
  }
};
