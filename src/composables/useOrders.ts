import { reactive } from 'vue'
import type { Order } from '@/types'
import { orders as mockOrders } from '@/mock/data'

interface OrderState {
  orders: Order[]
}

const state = reactive<OrderState>({
  orders: [...mockOrders],
})

let nextOrderId = 2000

export function useOrders() {
  const pendingOrders = () =>
    state.orders.filter((o) => o.status === 'pending')

  const historyOrders = () =>
    state.orders.filter((o) => o.status !== 'pending')

  function addOrder(order: Omit<Order, 'id'>) {
    state.orders.unshift({ ...order, id: nextOrderId++ })
  }

  function verifyOrder(orderId: number) {
    const order = state.orders.find((o) => o.id === orderId)
    if (order) {
      order.status = 'completed'
    }
  }

  function findPendingByPhone(phone: string) {
    return state.orders.filter(
      (o) => o.status === 'pending' && o.phone === phone
    )
  }

  return {
    orders: state.orders,
    pendingOrders,
    historyOrders,
    addOrder,
    verifyOrder,
    findPendingByPhone,
  }
}
