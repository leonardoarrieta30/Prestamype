export interface ExchangeRates {
  purchase_price: number
  sale_price: number
}

export interface CurrencyOperation {
  from: string
  to: string
  sendAmount: number
  receiveAmount: number
  rate: number
  timestamp?: Date
}

export interface CurrencyInfo {
  name: string
  symbol: string
  code: string
}

export type CurrencyType = 'USD' | 'PEN'