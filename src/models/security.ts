import { fromJson, fromJsonList } from 'models/parser';

export class Security {
  static fromJson = (json: Record<string, any>) => fromJson<ISecurity>(json);
  static fromJsonList = (jsonList: Record<string, any>[]) =>
    fromJsonList<ISecurity>(jsonList);
}

export interface ISecurity {
  closePrice?: number;
  dayChange?: number;
  dayChangePercent?: number;
  dayHigh?: number;
  dayLow?: number;
  description?: string;
  earningsPerShare?: number;
  exchange?: string;
  id?: string;
  owned: boolean;
  logoUrl?: string;
  marketCap?: number;
  name?: string;
  openPrice?: number;
  price?: number;
  priceToEarningsPerShare?: number;
  sector?: string;
  symbol?: string;
  type?: string;
  volume?: number;
  yearHigh?: number;
  yearLow?: number;
}
