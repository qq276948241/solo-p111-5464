<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'

const cart = useCart()
</script>

<template>
  <div
    v-if="cart.totalCount.value > 0"
    class="fixed bottom-[60px] left-0 right-0 z-40 px-3 pb-2"
  >
    <div
      class="max-w-[430px] mx-auto bg-green-800 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg shadow-green-900/30"
    >
      <div class="flex items-center gap-3">
        <div class="relative">
          <ShoppingCart :size="22" class="text-white" />
          <span
            class="absolute -top-1.5 -right-1.5 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold"
          >
            {{ cart.totalCount.value }}
          </span>
        </div>
        <span class="text-white font-bold text-lg">
          ¥{{ cart.totalPrice.value.toFixed(1) }}
        </span>
      </div>
      <button
        class="bg-white text-green-800 text-sm font-semibold px-5 py-2 rounded-xl active:bg-gray-100 transition-colors"
        @click="$router.push('/orders')"
      >
        去结算
      </button>
    </div>
  </div>
</template>
