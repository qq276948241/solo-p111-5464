<script setup lang="ts">
import type { Product } from '@/types'

defineProps<{
  product: Product
}>()

const emit = defineEmits<{
  click: [product: Product]
}>()

function minStock(product: Product): number {
  return Math.min(...product.specs.map((s) => s.stock))
}

function minMemberPrice(product: Product): string {
  const prices = product.specs.map((s) => s.memberPrice)
  return Math.min(...prices).toFixed(1)
}
</script>

<template>
  <div
    class="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 active:scale-[0.97] transition-transform cursor-pointer"
    @click="emit('click', product)"
  >
    <div class="relative aspect-square bg-gray-50">
      <img
        :src="product.image"
        :alt="product.name"
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <span
        v-if="product.isSpecial"
        class="absolute top-2 left-2 bg-gradient-to-r from-green-700 to-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium"
      >
        特惠
      </span>
      <span
        v-if="minStock(product) < 5"
        class="absolute top-2 right-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium"
      >
        即将售罄
      </span>
    </div>
    <div class="p-2.5">
      <h3 class="text-sm font-semibold text-gray-800 truncate">{{ product.name }}</h3>
      <p class="text-[11px] text-gray-400 mt-0.5">
        {{ product.specs.map((s) => s.name).join(' / ') }}
      </p>
      <div class="flex items-baseline gap-1 mt-1.5">
        <span class="text-green-700 font-bold text-base">¥{{ minMemberPrice(product) }}</span>
        <span class="text-[10px] text-gray-400">起</span>
      </div>
    </div>
  </div>
</template>
