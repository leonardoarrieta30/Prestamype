/**
 * Formatea un número para mostrar como moneda
 * @param amount Monto a formatear
 * @param decimals Número de decimales (default: 2)
 * @returns String formateado
 */
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return amount.toLocaleString('es-PE', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  })
}

/**
 * Formatea un número para mostrar tasas de cambio
 * @param rate Tasa a formatear
 * @returns String formateado con 4 decimales
 */
export const formatExchangeRate = (rate: number): string => {
  return rate.toFixed(4)
}

/**
 * Valida si un número es válido para conversión
 * @param amount Monto a validar
 * @returns true si es válido
 */
export const isValidAmount = (amount: number): boolean => {
  return !isNaN(amount) && amount > 0 && isFinite(amount)
}