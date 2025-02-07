import { fromJson, fromJsonList } from 'models/parser';

export class Sector {
  static fromJson = (json: Record<string, any>) => fromJson<ISector>(json);
  static fromJsonList = (jsonList: Record<string, any>[]) =>
    fromJsonList<ISector>(jsonList);
}

export interface ISector {
  title: string;
  description?: string;
  totalGainLoss?: number;
  securities: string[];
  id: string;
}
