import { writable, type Writable } from 'svelte/store';
import { type ISector, Sector } from 'models/sector';
import sectorsData from 'data/sectors.json';
import securityData from 'data/securities.json';

import { type ISecurity, Security } from 'models/security';

export const sectors: Writable<ISector[]> = writable<ISector[]>(
  Sector.fromJsonList(sectorsData)
);

export const securities: Writable<ISecurity[]> = writable<ISecurity[]>(
  Security.fromJsonList(securityData)
);
