<script setup lang="ts">
import { ref } from 'vue'
import { useOrders } from '@/composables/useOrders'
import OrderCard from '@/components/OrderCard.vue'

const orderStore = useOrders()
const activeTab = ref<'pending' | 'history'>('pending')

const pendingList = orderStore.pendingOrders()
const historyList = orderStore.historyOrders()
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F5] pb-20">
    <header class="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-sm">
      <div class="px-4 pt-3 pb-2">
        <h1 class="text-lg font-bold text-gray-800">📋 我的订单</h1>
      </div>
      <div class="flex px-4 border-b border-gray-100">
        <button
          :class="[
            'flex-1 pb-2.5 text-sm font-medium text-center relative transition-colors',
            activeTab === 'pending' ? 'text-green-700' : 'text-gray-400',
          ]"
          @click="activeTab = 'pending'"
        >
          待取货
          <span
            v-if="activeTab === 'pending'"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-green-700 rounded-full"
          ></span>
        </button>
        <button
          :class="[
            'flex-1 pb-2.5 text-sm font-medium text-center relative transition-colors',
            activeTab === 'history' ? 'text-green-700' : 'text-gray-400',
          ]"
          @click="activeTab = 'history'"
        >
          历史订单
          <span
            v-if="activeTab === 'history'"
            class="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-green-700 rounded-full"
          ></span>
        </button>
      </div>
    </header>

    <div class="px-3 pt-3 space-y-2.5">
      <template v-if="activeTab === 'pending'">
        <OrderCard
          v-for="order in pendingList"
          :key="order.id"
          :order="order"
        />
        <div
          v-if="pendingList.length === 0"
          class="text-center py-16 text-gray-400 text-sm"
        >
          暂无待取货订单
        </div>
      </template>
      <template v-else>
        <OrderCard
          v-for="order in historyList"
          :key="order.id"
          :order="order"
        />
        <div
          v-if="historyList.length === 0"
          class="text-center py-16 text-gray-400 text-sm"
        >
          暂无历史订单
        </div>
      </template>
    </div>
  </div>
</template>
