<script setup lang="ts">
import type { Product, ProductSpec } from '@/types'
import { ref, watch } from 'vue'
import { X, Minus, Plus } from 'lucide-vue-next'
import { useCart } from '@/composables/useCart'

const props = defineProps<{
  visible: boolean
  product: Product | null
}>()

const emit = defineEmits<{
  close: []
}>()

const cart = useCart()
const selectedSpec = ref<ProductSpec | null>(null)
const quantity = ref(1)

watch(
  () => props.product,
  (val) => {
    if (val && val.specs.length > 0) {
      selectedSpec.value = val.specs[0]
      quantity.value = 1
    }
  }
)

function selectSpec(spec: ProductSpec) {
  selectedSpec.value = spec
  quantity.value = 1
}

function decrease() {
  if (quantity.value > 1) quantity.value--
}

function increase() {
  if (selectedSpec.value && quantity.value < selectedSpec.value.stock) {
    quantity.value++
  }
}

function confirm() {
  if (!props.product || !selectedSpec.value) return
  cart.addItem(props.product, selectedSpec.value, quantity.value)
  emit('close')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible && product"
        class="fixed inset-0 z-50 flex items-end justify-center"
      >
        <div class="absolute inset-0 bg-black/40" @click="emit('close')"></div>
        <div
          class="relative bg-white rounded-t-2xl w-full max-w-[430px] max-h-[70vh] flex flex-col animate-slide-up"
        >
          <div class="flex items-center justify-between p-4 border-b border-gray-100">
            <h3 class="text-base font-semibold text-gray-800">{{ product.name }}</h3>
            <button
              class="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
              @click="emit('close')"
            >
              <X :size="18" class="text-gray-400" />
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-4">
            <p class="text-xs text-gray-400 mb-2">选择规格</p>
            <div class="flex flex-wrap gap-2 mb-5">
              <button
                v-for="spec in product.specs"
                :key="spec.id"
                :class="[
                  'px-3.5 py-1.5 rounded-full text-sm border transition-colors',
                  selectedSpec?.id === spec.id
                    ? 'bg-green-50 border-green-600 text-green-700 font-medium'
                    : 'bg-gray-50 border-gray-200 text-gray-600',
                ]"
                @click="selectSpec(spec)"
              >
                {{ spec.name }}
              </button>
            </div>

            <div v-if="selectedSpec" class="bg-gray-50 rounded-xl p-3.5">
              <div class="flex items-baseline justify-between mb-3">
                <div>
                  <span class="text-green-700 font-bold text-xl">
                    ¥{{ selectedSpec.memberPrice.toFixed(1) }}
                  </span>
                  <span class="text-xs text-gray-400 ml-1.5 line-through">
                    ¥{{ selectedSpec.price.toFixed(1) }}
                  </span>
                </div>
                <span class="text-xs text-gray-400">
                  库存 {{ selectedSpec.stock }}{{ selectedSpec.unit }}
                </span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-600">数量</span>
                <div class="flex items-center gap-3">
                  <button
                    class="w-7 h-7 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-30"
                    :disabled="quantity <= 1"
                    @click="decrease"
                  >
                    <Minus :size="14" />
                  </button>
                  <span class="text-sm font-medium w-6 text-center">{{ quantity }}</span>
                  <button
                    class="w-7 h-7 rounded-full bg-green-600 text-white flex items-center justify-center disabled:opacity-30"
                    :disabled="!selectedSpec || quantity >= selectedSpec.stock"
                    @click="increase"
                  >
                    <Plus :size="14" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="p-4 border-t border-gray-100">
            <button
              class="w-full py-3 bg-green-700 text-white rounded-xl text-sm font-semibold active:bg-green-800 transition-colors disabled:opacity-40"
              :disabled="!selectedSpec"
              @click="confirm"
            >
              确认加入购物车
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.animate-slide-up {
  animation: slideUp 0.3s ease-out;
}

@keyframes slideUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
