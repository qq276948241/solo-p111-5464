export interface ProductSpec {
  id: number
  productId: number
  name: string
  price: number
  memberPrice: number
  stock: number
  unit: string
}

export interface Product {
  id: number
  name: string
  image: string
  category: 'vegetable' | 'fruit' | 'meat'
  specs: ProductSpec[]
  isSpecial: boolean
}

export interface OrderItem {
  id: number
  orderId: number
  productName: string
  specName: string
  quantity: number
  unitPrice: number
}

export interface Order {
  id: number
  phone: string
  pickupTime: string
  status: 'pending' | 'completed' | 'cancelled'
  createdAt: string
  items: OrderItem[]
}

export interface CartItem {
  id: number
  productId: number
  specId: number
  productName: string
  specName: string
  quantity: number
  unitPrice: number
  image: string
}
