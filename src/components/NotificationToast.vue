<template>
  <div v-if="currencyStore.notification.show" 
       class="toast toast-top toast-end z-50">
    <div :class="[
      'alert shadow-lg max-w-sm',
      alertClass
    ]">
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg v-if="currencyStore.notification.type === 'success'" 
               class="w-6 h-6 text-green-400" 
               fill="currentColor" 
               viewBox="0 0 20 20">
            <path fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clip-rule="evenodd" />
          </svg>
          
          <svg v-else-if="currencyStore.notification.type === 'error'" 
               class="w-6 h-6 text-red-400" 
               fill="currentColor" 
               viewBox="0 0 20 20">
            <path fill-rule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clip-rule="evenodd" />
          </svg>
          
          <svg v-else 
               class="w-6 h-6 text-blue-400" 
               fill="currentColor" 
               viewBox="0 0 20 20">
            <path fill-rule="evenodd" 
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" 
                  clip-rule="evenodd" />
          </svg>
        </div>
        
        <div class="ml-3 flex-1">
          <h3 class="text-sm font-semibold">
            {{ currencyStore.notification.title }}
          </h3>
          <p class="text-sm opacity-90 mt-1">
            {{ currencyStore.notification.message }}
          </p>
        </div>
        
        <div class="flex-shrink-0 ml-4">
          <button @click="currencyStore.hideNotification()" 
                  class="btn btn-ghost btn-sm btn-circle">
            <svg class="w-4 h-4" 
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
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCurrencyStore } from '../stores/currency'

const currencyStore = useCurrencyStore()

const alertClass = computed(() => {
  switch (currencyStore.notification.type) {
    case 'success':
      return 'alert-success text-green-800 bg-green-50 border-green-200'
    case 'error':
      return 'alert-error text-red-800 bg-red-50 border-red-200'
    case 'info':
    default:
      return 'alert-info text-blue-800 bg-blue-50 border-blue-200'
  }
})
</script>

<style scoped>
.toast {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.toast.fade-out {
  animation: slideOut 0.3s ease-in;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>