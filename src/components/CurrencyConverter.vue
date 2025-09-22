<template>
    <div class="bg-white shadow-lg p-6 w-full lg:w-[400px] lg:mx-0 lg:rounded-2xl lg:border-2 lg:border-purple-400">
        <!-- Tabs -->
        <div class="flex justify-center mb-6">
            <div class="flex bg-gray-50 rounded-lg p-1 w-full">
                <button 
                    @click="currencyStore.switchRate('purchase')"
                    :class="[
                        'flex-1 py-3 px-4 text-center transition-all duration-300 rounded-md',
                        currencyStore.activeRate === 'purchase' 
                            ? 'bg-white shadow-sm text-purple-600 font-semibold' 
                            : 'text-gray-600 hover:text-purple-400'
                    ]"
                >
                    <div class="text-sm">Dólar compra</div>
                    <div class="text-2xl font-bold">{{ currencyStore.formattedPurchasePrice }}</div>
                </button>
                <button 
                    @click="currencyStore.switchRate('sale')"
                    :class="[
                        'flex-1 py-3 px-4 text-center transition-all duration-300 rounded-md',
                        currencyStore.activeRate === 'sale' 
                            ? 'bg-white shadow-sm text-purple-600 font-semibold' 
                            : 'text-gray-600 hover:text-purple-400'
                    ]"
                >
                    <div class="text-sm">Dólar venta</div>
                    <div class="text-2xl font-bold">{{ currencyStore.formattedSalePrice }}</div>
                </button>
            </div>
        </div>

        <!-- Exchange inputs -->
        <div class="space-y-3">
            <!-- Campo de envío -->
            <div class="bg-gray-50 border border-purple-200 rounded-xl p-4">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="text-purple-600 font-medium text-lg mb-1">{{ currencyStore.sendCurrency }}</div>
                        <input 
                            type="number" 
                            v-model.number="currencyStore.sendAmount"
                            @input="currencyStore.onSendAmountChange"
                            class="text-3xl font-bold bg-transparent border-none outline-none w-full text-gray-800"
                            placeholder="0"
                            step="any"
                        />
                    </div>
                    <div class="text-right ml-4">
                        <div class="text-gray-500 text-sm mb-1">Envías</div>
                        <div class="text-gray-600 font-medium text-lg">{{ currencyStore.sendSymbol }} {{ currencyStore.formattedSendAmount }}</div>
                    </div>
                </div>
            </div>

            <!-- Botón de intercambio -->
            <div class="flex justify-center -my-2 relative z-10">
                <button 
                    @click="currencyStore.swapCurrencies"
                    class="w-12 h-12 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-all duration-300 shadow-lg flex items-center justify-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300" :class="{ 'rotate-180': currencyStore.isSwapping }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                </button>
            </div>

            <!-- Campo de recepción -->
            <div class="bg-gray-50 border border-purple-200 rounded-xl p-4">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <div class="text-purple-600 font-medium text-lg mb-1">{{ currencyStore.receiveCurrency }}</div>
                        <input 
                            type="number" 
                            v-model.number="currencyStore.receiveAmount"
                            @input="currencyStore.onReceiveAmountChange"
                            class="text-3xl font-bold bg-transparent border-none outline-none w-full text-gray-800"
                            placeholder="0"
                            step="any"
                        />
                    </div>
                    <div class="text-right ml-4">
                        <div class="text-gray-500 text-sm mb-1">Recibes</div>
                        <div class="text-gray-600 font-medium text-lg">{{ currencyStore.receiveSymbol }} {{ currencyStore.formattedReceiveAmount }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Button -->
        <div class="mt-8">
            <button 
                @click="handleInitiateOperation"
                class="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold text-lg py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
                Iniciar operación
            </button>
        </div>

        <!-- Loading/Error states -->
        <div v-if="currencyStore.isLoading" class="text-center text-gray-500 mt-4">
            Cargando tasas de cambio...
        </div>
        <div v-if="currencyStore.error" class="text-center text-red-500 mt-4 text-sm">
            {{ currencyStore.error }}
        </div>
    </div>
    
    <!-- Componente de notificaciones -->
    <NotificationToast />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useCurrencyStore } from '../stores/currency.ts'
import NotificationToast from './NotificationToast.vue'

const currencyStore = useCurrencyStore()

const handleInitiateOperation = () => {
  const operation = currencyStore.initiateOperation()
  
  if (operation) {
    console.log('Operación iniciada:', operation)
    
    currencyStore.showNotification(
      'success',
      '¡Operación Exitosa!',
      `Conversión: ${currencyStore.sendSymbol}${currencyStore.formattedSendAmount} → ${currencyStore.receiveSymbol}${currencyStore.formattedReceiveAmount}`
    )
  } else {
    currencyStore.showNotification(
      'error',
      'Error en la Operación',
      currencyStore.error || 'Por favor verifica los datos ingresados'
    )
  }
}

onMounted(() => {
  currencyStore.initializeRatesListener()
})

onUnmounted(() => {
  currencyStore.cleanup()
})
</script>

<style scoped></style>