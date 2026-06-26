<script setup lang="ts">
import { ref } from 'vue'
import { Search, CheckCircle } from 'lucide-vue-next'
import { useOrders } from '@/composables/useOrders'
import OrderCard from '@/components/OrderCard.vue'

const orderStore = useOrders()
const phone = ref('')
const searchResults = ref<ReturnType<typeof orderStore.findPendingByPhone>>([])
const searched = ref(false)
const verifySuccess = ref<number | null>(null)

function handleSearch() {
  const trimmed = phone.value.trim()
  if (!trimmed) return
  searchResults.value = orderStore.findPendingByPhone(trimmed)
  searched.value = true
  verifySuccess.value = null
}

function handleVerify(orderId: number) {
  orderStore.verifyOrder(orderId)
  verifySuccess.value = orderId
  searchResults.value = orderStore.findPendingByPhone(phone.value.trim())
  setTimeout(() => {
    verifySuccess.value = null
  }, 2000)
}
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F5] pb-20">
    <header class="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-sm">
      <div class="px-4 pt-3 pb-2">
        <h1 class="text-lg font-bold text-gray-800">✅ 核销订单</h1>
        <p class="text-xs text-gray-400 mt-0.5">输入手机号查询今日待取订单</p>
      </div>
    </header>

    <div class="px-4 pt-4">
      <div class="flex gap-2">
        <input
          v-model="phone"
          type="tel"
          maxlength="11"
          placeholder="请输入手机号"
          class="flex-1 h-11 px-4 bg-white rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600/20 transition-colors"
          @keyup.enter="handleSearch"
        />
        <button
          class="h-11 px-5 bg-green-700 text-white text-sm font-semibold rounded-xl flex items-center gap-1.5 active:bg-green-800 transition-colors"
          @click="handleSearch"
        >
          <Search :size="16" />
          查询
        </button>
      </div>
    </div>

    <div v-if="verifySuccess !== null" class="px-4 pt-3">
      <div class="bg-green-50 border border-green-200 rounded-xl p-3 flex items-center gap-2">
        <CheckCircle :size="18" class="text-green-600" />
        <span class="text-sm text-green-700 font-medium">核销成功！</span>
      </div>
    </div>

    <div class="px-3 pt-4 space-y-2.5">
      <template v-if="searched">
        <OrderCard
          v-for="order in searchResults"
          :key="order.id"
          :order="order"
          :show-verify="true"
          @verify="handleVerify"
        />
        <div
          v-if="searchResults.length === 0"
          class="text-center py-16 text-gray-400 text-sm"
        >
          未找到该手机号的待取订单
        </div>
      </template>
      <div
        v-else
        class="text-center py-16 text-gray-400 text-sm"
      >
        输入手机号查询今日待取订单
      </div>
    </div>
  </div>
</template>
