import { writable } from 'svelte/store';
import type { IAccount } from 'models/account';

// export const user = writable<Record<string, any>>();
export const accountStore = writable<IAccount>();
