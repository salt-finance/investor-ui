export class Security {


    constructor(public name?: string,
                public symbol?: string,
                public id?: string,
                public description?: string,
                public sector?: string,
                public exchange?: string,
                public yearHigh?: number,
                public yearLow?: number,
                public dayHigh?: number,
                public dayLow?: number,
                public dayChange?: number,
                public dayChangePercent?: number,
                public openPrice?: number,
                public closePrice?: number,
                public price?: number,
                public volume?: number,
                public marketCap?: number,
                public earningsPerShare?: number,
                public priceToEarningsPerShare?: number,
                public logoUrl?: string) {
    }
}
