import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ExchangeRateService } from '../services/exchangeRate'
import { formatCurrency, formatExchangeRate, isValidAmount } from '../utils/currency'
import type { ExchangeRates, CurrencyOperation } from '../types/currency'

export const useCurrencyStore = defineStore('currency', () => {
  const purchasePrice = ref(0)
  const salePrice = ref(0)
  const isLoading = ref(true)
  const error = ref('')

  const activeRate = ref<'purchase' | 'sale'>('purchase')

  const notification = ref<{
    show: boolean
    type: 'success' | 'error' | 'info'
    title: string
    message: string
  }>({
    show: false,
    type: 'info',
    title: '',
    message: ''
  })

  const sendCurrency = ref('Dólares')
  const receiveCurrency = ref('Soles')
  const sendSymbol = ref('$')
  const receiveSymbol = ref('S/')

  const sendAmount = ref(0)
  const receiveAmount = ref(0)

  const isSwapping = ref(false)

  let unsubscribe: (() => void) | null = null

  const formattedPurchasePrice = computed(() => formatExchangeRate(purchasePrice.value))
  const formattedSalePrice = computed(() => formatExchangeRate(salePrice.value))
  const formattedSendAmount = computed(() => formatCurrency(sendAmount.value))
  const formattedReceiveAmount = computed(() => formatCurrency(receiveAmount.value))

  // Actions
  const onSendAmountChange = () => {
    if (!isValidAmount(sendAmount.value)) {
      receiveAmount.value = 0
      return
    }

    const currentRate = activeRate.value === 'purchase' ? purchasePrice.value : salePrice.value

    if (sendCurrency.value === 'Dólares') {
      receiveAmount.value = ExchangeRateService.convertDollarsToSoles(sendAmount.value, currentRate)
    } else {
      receiveAmount.value = ExchangeRateService.convertSolesToDollars(sendAmount.value, currentRate)
    }
  }

  const onReceiveAmountChange = () => {
    if (!isValidAmount(receiveAmount.value)) {
      sendAmount.value = 0
      return
    }

    const currentRate = activeRate.value === 'purchase' ? purchasePrice.value : salePrice.value

    if (receiveCurrency.value === 'Soles') {
      sendAmount.value = receiveAmount.value / currentRate
    } else {
      sendAmount.value = receiveAmount.value * currentRate
    }
  }

  const swapCurrencies = () => {
    isSwapping.value = true
    
    const tempCurrency = sendCurrency.value
    sendCurrency.value = receiveCurrency.value
    receiveCurrency.value = tempCurrency
    
    const tempSymbol = sendSymbol.value
    sendSymbol.value = receiveSymbol.value
    receiveSymbol.value = tempSymbol
    
    const tempAmount = sendAmount.value
    sendAmount.value = receiveAmount.value
    receiveAmount.value = tempAmount
    
    setTimeout(() => {
      isSwapping.value = false
    }, 300)
  }

  const switchRate = (rateType: 'purchase' | 'sale') => {
    activeRate.value = rateType
    
    if (sendAmount.value > 0) {
      onSendAmountChange()
    } else if (receiveAmount.value > 0) {
      onReceiveAmountChange()
    }
  }

  const showNotification = (type: 'success' | 'error' | 'info', title: string, message: string) => {
    notification.value = {
      show: true,
      type,
      title,
      message
    }
    
    // Auto-ocultar después de 4 segundos
    setTimeout(() => {
      hideNotification()
    }, 4000)
  }

  const hideNotification = () => {
    notification.value.show = false
  }

  const initiateOperation = (): CurrencyOperation | null => {
    if (!isValidAmount(sendAmount.value) || !isValidAmount(receiveAmount.value)) {
      error.value = 'Por favor ingresa un monto válido'
      return null
    }
    
    // Usar la tasa activa (compra o venta)
    const currentRate = activeRate.value === 'purchase' ? purchasePrice.value : salePrice.value
    
    const operation: CurrencyOperation = {
      from: sendCurrency.value,
      to: receiveCurrency.value,
      sendAmount: sendAmount.value,
      receiveAmount: receiveAmount.value,
      rate: currentRate,
      timestamp: new Date()
    }
    
    error.value = '' // Limpiar error si la operación es válida
    return operation
  }

  const initializeRatesListener = () => {
    unsubscribe = ExchangeRateService.listenToRates((rates: ExchangeRates | null) => {
      isLoading.value = false
      
      if (rates) {
        purchasePrice.value = rates.purchase_price
        salePrice.value = rates.sale_price
        error.value = ''
        
        // Recalcular conversión si hay montos
        if (sendAmount.value > 0) {
          onSendAmountChange()
        }
      } else {
        error.value = 'Error al cargar las tasas de cambio'
      }
    })
  }

  const cleanup = () => {
    if (unsubscribe) {
      unsubscribe()
      unsubscribe = null
    }
  }

  const resetAmounts = () => {
    sendAmount.value = 0
    receiveAmount.value = 0
    error.value = ''
  }

  const setSendAmount = (amount: number) => {
    sendAmount.value = amount
    onSendAmountChange()
  }

  const setReceiveAmount = (amount: number) => {
    receiveAmount.value = amount
    onReceiveAmountChange()
  }

  return {
    // State
    purchasePrice,
    salePrice,
    isLoading,
    error,
    activeRate,
    notification,
    sendCurrency,
    receiveCurrency,
    sendSymbol,
    receiveSymbol,
    sendAmount,
    receiveAmount,
    isSwapping,
    
    // Getters (computed)
    formattedPurchasePrice,
    formattedSalePrice,
    formattedSendAmount,
    formattedReceiveAmount,
    
    // Actions
    onSendAmountChange,
    onReceiveAmountChange,
    swapCurrencies,
    switchRate,
    showNotification,
    hideNotification,
    initiateOperation,
    initializeRatesListener,
    cleanup,
    resetAmounts,
    setSendAmount,
    setReceiveAmount
  }
})