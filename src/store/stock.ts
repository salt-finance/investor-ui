import { writable, type Writable } from 'svelte/store';
import { type iSector, Sector } from 'models/sector';
import sectorsData from 'data/sectors.json';
import securityData from 'data/securities.json';

import { type iSecurity, Security } from 'models/security';

export const sectors: Writable<iSector[]> = writable<iSector[]>(
  Sector.fromJsonList(sectorsData)
);

export const securities: Writable<iSecurity[]> = writable<iSecurity[]>(
  Security.fromJsonList(securityData)
);
