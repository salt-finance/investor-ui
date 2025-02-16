export interface IHolding {
  id: string;
  securityId: string;
  securityName: string;
  securityLogoUrl: string;
  symbol: string;
  averageCostBasis: number;
  averageROI: number;
  marketValue: number;
  openPrice: number;
  quantity: number;
  totalGainLoss: number;
  totalCost: number;
}
