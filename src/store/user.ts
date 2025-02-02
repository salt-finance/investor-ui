import { writable } from 'svelte/store';
import type { IUser } from 'models/user';

// export const user = writable<Record<string, any>>();
export const userStore = writable<IUser>();
