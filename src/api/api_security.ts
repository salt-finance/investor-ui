import { get } from 'utils/http_client';
import type { ISector } from 'models/sector';
import type { ISecurity } from 'models/security';

export const getSectors = () => {
  return get<ISector[]>('/sectors');
};

export const getSector = (id: String) => {
  return get<ISector>(`/sector/${id}`);
};

export const getSecurity = (id: String) => {
  return get<ISecurity>(`/security/${id}`);
};
