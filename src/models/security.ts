import {fromJson, fromJsonList} from "models/parser";

export class Security {
    static fromJson = (json: Record<string, any>) => fromJson<iSecurity>(json);
    static fromJsonList = (jsonList: Record<string, any>[]) =>
        fromJsonList<iSecurity>(jsonList);
}

export interface iSecurity {
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
    type?: string,
    volume?: number;
    yearHigh?: number;
    yearLow?: number;
}
