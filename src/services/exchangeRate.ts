import { db } from './firebase'
import { doc, onSnapshot } from 'firebase/firestore'
import type { DocumentData } from 'firebase/firestore'
import type { ExchangeRates } from '../types/currency'
import { FIREBASE_COLLECTIONS, FIREBASE_DOCUMENTS } from '../constants'

export class ExchangeRateService {
  /**
   * Escucha cambios en tiempo real de las tasas de cambio
   * @param callback Función que se ejecuta cuando cambian las tasas
   * @returns Función para desuscribirse del listener
   */
  static listenToRates(callback: (rates: ExchangeRates | null) => void): () => void {
    const docRef = doc(db, FIREBASE_COLLECTIONS.RATES, FIREBASE_DOCUMENTS.EXCHANGE_RATES)
    
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data() as DocumentData
        const rates: ExchangeRates = {
          purchase_price: data.purchase_price || 0,
          sale_price: data.sale_price || 0
        }
        callback(rates)
      } else {
        console.error('No se encontró el documento de tasas de cambio')
        callback(null)
      }
    }, (error) => {
      console.error('Error al escuchar cambios en las tasas:', error)
      callback(null)
    })
  }

  /**
   * Convierte de soles a dólares
   * Fórmula: (monto en soles / sale_price = monto en dólares)
   */
  static convertSolesToDollars(amountInSoles: number, salePrice: number): number {
    if (salePrice === 0) return 0
    return amountInSoles / salePrice
  }

  /**
   * Convierte de dólares a soles
   * Fórmula: (monto en dólares * purchase_price = monto en soles)
   */
  static convertDollarsToSoles(amountInDollars: number, purchasePrice: number): number {
    return amountInDollars * purchasePrice
  }
}