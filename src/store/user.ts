import { writable } from 'svelte/store';
import type { IUser } from 'models/user';
import { getUser } from '@/api/api_user';

// export const user = writable<Record<string, any>>();
export const userStore = writable<IUser | undefined>();

export const fetchUser = async () => {
  const result = await getUser();

  if (result.data !== null) {
    userStore.set(result.data.response);
    return;
  }
};
