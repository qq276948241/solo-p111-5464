import { reactive, computed } from 'vue'
import type { CartItem, Product, ProductSpec } from '@/types'

interface CartState {
  items: CartItem[]
}

const state = reactive<CartState>({
  items: [],
})

let nextCartItemId = 1

export function useCart() {
  const totalCount = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    state.items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  )

  function addItem(product: Product, spec: ProductSpec, quantity: number) {
    const existing = state.items.find(
      (item) => item.productId === product.id && item.specId === spec.id
    )
    if (existing) {
      existing.quantity += quantity
    } else {
      state.items.push({
        productId: product.id,
        specId: spec.id,
        productName: product.name,
        specName: spec.name,
        quantity,
        unitPrice: spec.memberPrice,
        image: product.image,
        id: nextCartItemId++,
      })
    }
  }

  function removeItem(productId: number, specId: number) {
    const idx = state.items.findIndex(
      (item) => item.productId === productId && item.specId === specId
    )
    if (idx !== -1) {
      state.items.splice(idx, 1)
    }
  }

  function updateQuantity(productId: number, specId: number, quantity: number) {
    const item = state.items.find(
      (item) => item.productId === productId && item.specId === specId
    )
    if (item) {
      if (quantity <= 0) {
        removeItem(productId, specId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function clearCart() {
    state.items.splice(0, state.items.length)
  }

  return {
    items: computed(() => state.items),
    totalCount,
    totalPrice,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
  }
}
