<script setup lang="ts">
import type { Order } from '@/types'
import { ref } from 'vue'
import { ChevronDown, ChevronUp } from 'lucide-vue-next'

const props = defineProps<{
  order: Order
  showVerify?: boolean
}>()

const emit = defineEmits<{
  verify: [orderId: number]
}>()

const expanded = ref(false)

function statusText(status: Order['status']): string {
  if (status === 'pending') return '待取货'
  if (status === 'completed') return '已取货'
  return '已取消'
}

function statusClass(status: Order['status']): string {
  if (status === 'pending') return 'bg-green-50 text-green-700'
  if (status === 'completed') return 'bg-gray-100 text-gray-500'
  return 'bg-red-50 text-red-500'
}

function totalPrice(order: Order): string {
  return order.items
    .reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    .toFixed(1)
}
</script>

<template>
  <div class="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
    <div class="flex items-center justify-between mb-2">
      <span class="text-xs text-gray-400">订单 #{{ order.id }}</span>
      <span
        :class="[
          'text-[11px] px-2 py-0.5 rounded-full font-medium',
          statusClass(order.status),
        ]"
      >
        {{ statusText(order.status) }}
      </span>
    </div>

    <div class="flex items-center gap-2 text-sm text-gray-600 mb-2">
      <span class="text-xs text-gray-400">取货</span>
      <span class="font-medium">{{ order.pickupTime }}</span>
    </div>

    <button
      class="flex items-center gap-1 text-xs text-gray-500 mb-2"
      @click="expanded = !expanded"
    >
      <span>菜品 ({{ order.items.length }})</span>
      <ChevronDown v-if="!expanded" :size="14" />
      <ChevronUp v-else :size="14" />
    </button>

    <div v-if="expanded" class="mb-2 space-y-1.5">
      <div
        v-for="item in order.items"
        :key="item.id"
        class="flex items-center justify-between text-sm"
      >
        <span class="text-gray-700">{{ item.productName }} · {{ item.specName }}</span>
        <span class="text-gray-500">
          x{{ item.quantity }}
          <span class="text-gray-400 ml-1">¥{{ (item.unitPrice * item.quantity).toFixed(1) }}</span>
        </span>
      </div>
    </div>

    <div class="flex items-center justify-between pt-2 border-t border-gray-50">
      <span class="text-sm text-gray-500">
        合计 <span class="text-green-700 font-bold text-base">¥{{ totalPrice(order) }}</span>
      </span>
      <button
        v-if="showVerify && order.status === 'pending'"
        class="px-4 py-1.5 bg-green-700 text-white text-xs font-semibold rounded-lg active:bg-green-800 transition-colors"
        @click="emit('verify', order.id)"
      >
        核销
      </button>
    </div>
  </div>
</template>
