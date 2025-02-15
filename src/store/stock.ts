import { writable, type Writable } from 'svelte/store';
import { type ISector } from 'models/sector';

import { getSectors } from '@/api/api_security';

export const sectorStore: Writable<ISector[]> = writable<ISector[]>([]);

export const fetchSectors = async () => {
  let sectors = await getSectors();
  sectorStore.set(sectors.response ?? []);
};
