import { get } from 'utils/http_client';
import type { ISector } from 'models/sector';

export const getSectors = () => {
  return get<ISector[]>('/sectors');
};

export const getSector = (id: String) => {
  return get<ISector>(`/sector/${id}`);
};
