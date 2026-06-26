<script setup lang="ts">
import { ref, computed } from 'vue'
import { products } from '@/mock/data'
import { useRouter } from 'vue-router'
import type { Product } from '@/types'
import ProductCard from '@/components/ProductCard.vue'
import SpecModal from '@/components/SpecModal.vue'
import CartBar from '@/components/CartBar.vue'
import { useCart } from '@/composables/useCart'

const router = useRouter()
const cart = useCart()
const showModal = ref(false)
const selectedProduct = ref<Product | null>(null)

const specialProducts = computed(() => products.filter((p) => p.isSpecial))
const allProducts = computed(() => products)
const currentBannerIdx = ref(0)

function openSpec(product: Product) {
  selectedProduct.value = product
  showModal.value = true
}

function closeModal() {
  showModal.value = false
  selectedProduct.value = null
}

function goToOrders() {
  cart.items.value.forEach((item) => {
    // cart will be cleared after order placed
  })
  router.push('/orders')
}

let bannerTimer: ReturnType<typeof setInterval> | null = null
function startBannerAutoPlay() {
  if (bannerTimer) clearInterval(bannerTimer)
  bannerTimer = setInterval(() => {
    if (specialProducts.value.length > 0) {
      currentBannerIdx.value =
        (currentBannerIdx.value + 1) % specialProducts.value.length
    }
  }, 3000)
}
startBannerAutoPlay()
</script>

<template>
  <div class="min-h-screen bg-[#FAF8F5] pb-24">
    <header class="sticky top-0 z-30 bg-[#FAF8F5]/90 backdrop-blur-sm">
      <div class="px-4 pt-3 pb-2">
        <h1 class="text-lg font-bold text-gray-800">🥬 今日菜品</h1>
        <p class="text-xs text-gray-400 mt-0.5">新鲜到站，会员专享价</p>
      </div>
    </header>

    <section
      v-if="specialProducts.length > 0"
      class="px-3 mb-4"
    >
      <div
        class="relative bg-gradient-to-r from-green-700 to-green-600 rounded-2xl overflow-hidden h-[120px] shadow-md shadow-green-800/20"
        @click="openSpec(specialProducts[currentBannerIdx])"
      >
        <div class="absolute inset-0 flex items-center px-5">
          <div class="flex-1">
            <span class="text-green-200 text-[11px] tracking-wider">今日特惠</span>
            <h2 class="text-white text-xl font-bold mt-1">
              {{ specialProducts[currentBannerIdx].name }}
            </h2>
            <p class="text-green-100 text-sm mt-1">
              会员价 ¥{{ Math.min(...specialProducts[currentBannerIdx].specs.map(s => s.memberPrice)).toFixed(1) }} 起
            </p>
          </div>
          <img
            :src="specialProducts[currentBannerIdx].image"
            class="w-24 h-24 object-cover rounded-xl shadow-lg mr-2"
          />
        </div>
        <div class="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
          <span
            v-for="(_, idx) in specialProducts"
            :key="idx"
            :class="[
              'w-1.5 h-1.5 rounded-full transition-colors',
              idx === currentBannerIdx ? 'bg-white' : 'bg-white/40',
            ]"
          ></span>
        </div>
      </div>
    </section>

    <section class="px-3">
      <div class="grid grid-cols-2 gap-2.5">
        <ProductCard
          v-for="product in allProducts"
          :key="product.id"
          :product="product"
          @click="openSpec"
        />
      </div>
    </section>

    <SpecModal
      :visible="showModal"
      :product="selectedProduct"
      @close="closeModal"
    />

    <CartBar />
  </div>
</template>
