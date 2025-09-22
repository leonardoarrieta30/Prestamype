<template>
  <Transition name="notification">
    <div v-if="currencyStore.notification.show" 
         class="fixed top-4 right-4 z-50 max-w-sm w-full">
      <div :class="[
        'bg-white rounded-lg shadow-2xl border-l-4 p-4 transform transition-all duration-300 ease-out',
        getNotificationStyles()
      ]">
        <div class="flex items-start">
          <div class="flex-shrink-0">
            <svg v-if="currencyStore.notification.type === 'success'" 
                 class="w-6 h-6 text-green-500" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <svg v-else-if="currencyStore.notification.type === 'error'" 
                 class="w-6 h-6 text-red-500" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            
            <svg v-else 
                 class="w-6 h-6 text-blue-500" 
                 fill="none" 
                 viewBox="0 0 24 24" 
                 stroke="currentColor">
              <path stroke-linecap="round" 
                    stroke-linejoin="round" 
                    stroke-width="2" 
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <div class="ml-3 flex-1">
            <h3 class="text-sm font-semibold text-gray-900">
              {{ currencyStore.notification.title }}
            </h3>
            <p class="text-sm text-gray-600 mt-1">
              {{ currencyStore.notification.message }}
            </p>
          </div>
          
          <div class="flex-shrink-0 ml-4">
            <button @click="currencyStore.hideNotification()" 
                    class="text-gray-400 hover:text-gray-600 transition-colors duration-200">
              <svg class="w-5 h-5" 
                   fill="none" 
                   stroke="currentColor" 
                   viewBox="0 0 24 24">
                <path stroke-linecap="round" 
                      stroke-linejoin="round" 
                      stroke-width="2" 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useCurrencyStore } from '../stores/currency'

const currencyStore = useCurrencyStore()

const getNotificationStyles = () => {
  switch (currencyStore.notification.type) {
    case 'success':
      return 'border-green-500 bg-green-50'
    case 'error':
      return 'border-red-500 bg-red-50'
    case 'info':
    default:
      return 'border-blue-500 bg-blue-50'
  }
}
</script>

<style scoped>
@keyframes slideIn {
  from {
    transform: translateX(100%) scale(0.95);
    opacity: 0;
  }
  to {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0) scale(1);
    opacity: 1;
  }
  to {
    transform: translateX(100%) scale(0.95);
    opacity: 0;
  }
}

.notification-enter-active {
  animation: slideIn 0.4s ease-out;
}

.notification-leave-active {
  animation: slideOut 0.3s ease-in;
}
</style>