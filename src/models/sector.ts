import { fromJson, fromJsonList } from 'models/parser';
import type { ISecurity } from 'models/security';

export class Sector {
  static fromJson = (json: Record<string, any>) => fromJson<ISector>(json);
  static fromJsonList = (jsonList: Record<string, any>[]) =>
    fromJsonList<ISector>(jsonList);
}

export interface ISector {
  title: string;
  description?: string;
  totalGainLoss?: number;
  securities?: {
    data?: ISecurity[];
    count?: number;
  };
  id: string;
}
