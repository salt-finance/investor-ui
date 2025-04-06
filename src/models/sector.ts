import { fromJson } from 'models/parser';
import type { ISecurity } from 'models/security';

export class Sector {
  static fromJson = (json: Record<string, any>) => fromJson<ISector>(json);
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
