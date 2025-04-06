import { formatCurrencyWithNotation } from 'utils/formatTools'

export type IAccount = {
  id: string
  fundingMethod?: IAccountFundingMethod
  balance?: IAccountBalance
}

interface IAccountFundingMethod {
  balance?: number
  method?: string
}

interface IAccountBalance {
  holdings?: number
  cash?: number
  roi?: number
  total?: number
}

export interface IFundingMethod {
  id?: string
  method?: string
}

export class Activity {
  netAmount: number
  transaction: string
  date: string
  price?: number
  quantity?: number
  securityLogoUrl?: string
  securityId?: string
  securityName?: string
  securitySymbol?: string

  constructor(
    netAmount: number,
    date: string,
    transaction: string,
    price?: number,
    quantity?: number,
    securityLogoUrl?: string,
    securityId?: string,
    securityName?: string,
    securitySymbol?: string,
  ) {
    this.netAmount = netAmount
    this.date = date
    this.price = price
    this.quantity = quantity
    this.securityLogoUrl = securityLogoUrl
    this.securityId = securityId
    this.securityName = securityName
    this.securitySymbol = securitySymbol

    const action = transaction?.toLowerCase().at(0)
    const isBuy = action === 'b'

    this.transaction = [
      [
        `<span class="${isBuy ? 'text-buy-foregorund bg-buy' : 'text-sell-foregorund bg-sell'} rounded-lg p-1 font-extrabold text-sm opacity-70">`,
        action === 'b' ? 'BUY' : action === 's' ? 'SELL' : transaction,
        '</span>',
      ].join(''),

      quantity,
      quantity === 1 ? 'share' : 'shares',
      'of',
      '<strong>',
      securitySymbol,
      '</strong>',
      '@',
      formatCurrencyWithNotation(Math.abs(netAmount)),
    ].join('&nbsp;')
  }

  static fromJson(json: Record<string, any>): Activity {
    return new Activity(
      json.netAmount,
      json.date,
      json.transaction,
      json.price,
      json.quantity,
      json.securityLogoUrl,
      json.securityId,
      json.securityName,
      json.securitySymbol,
    )
  }
}

export interface IActivity {
  netAmount: number
  transaction: string
  date: string

  price?: number
  quantity?: number
  securityLogoUrl?: string
  securityId?: string
  securityName?: string
  securitySymbol?: string
}
