import { fromJson, fromJsonList } from 'models/parser';

export class Sector {
  static fromJson = (json: Record<string, any>) => fromJson<iSector>(json);
  static fromJsonList = (jsonList: Record<string, any>[]) =>
    fromJsonList<iSector>(jsonList);
}

export interface iSector {
  title: string;
  description?: string;
  totalGainLoss?: number;
  securities?: number;
}
