import type { CurrencyInfo } from '../types/currency'

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: {
    name: 'Dólares',
    symbol: '$',
    code: 'USD'
  },
  PEN: {
    name: 'Soles',
    symbol: 'S/',
    code: 'PEN'
  }
}

export const FIREBASE_COLLECTIONS = {
  RATES: 'rates'
} as const

export const FIREBASE_DOCUMENTS = {
  EXCHANGE_RATES: 'TDmXIypgLKKfNggHHSnw'
} as const