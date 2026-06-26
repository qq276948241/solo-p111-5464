import type { Product, Order } from '@/types'

export const products: Product[] = [
  {
    id: 1,
    name: '有机西红柿',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20red%20tomatoes%20on%20vine%20farm%20harvest%20close%20up%20natural%20lighting&image_size=square',
    category: 'vegetable',
    isSpecial: true,
    specs: [
      { id: 101, productId: 1, name: '约1斤', price: 6.5, memberPrice: 5.8, stock: 12, unit: '斤' },
      { id: 102, productId: 1, name: '约2斤', price: 12.0, memberPrice: 10.5, stock: 8, unit: '斤' },
      { id: 103, productId: 1, name: '约5斤', price: 28.0, memberPrice: 25.0, stock: 3, unit: '斤' },
    ],
  },
  {
    id: 2,
    name: '新鲜黄瓜',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20green%20cucumbers%20on%20white%20background%20farm%20vegetable&image_size=square',
    category: 'vegetable',
    isSpecial: false,
    specs: [
      { id: 201, productId: 2, name: '约1斤', price: 4.0, memberPrice: 3.5, stock: 20, unit: '斤' },
      { id: 202, productId: 2, name: '约3斤', price: 10.5, memberPrice: 9.0, stock: 2, unit: '斤' },
    ],
  },
  {
    id: 3,
    name: '紫甘蓝',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=purple%20cabbage%20red%20cabbage%20fresh%20vegetable%20farm&image_size=square',
    category: 'vegetable',
    isSpecial: false,
    specs: [
      { id: 301, productId: 3, name: '约1个', price: 5.0, memberPrice: 4.2, stock: 4, unit: '个' },
      { id: 302, productId: 3, name: '约2个', price: 9.0, memberPrice: 7.8, stock: 6, unit: '个' },
    ],
  },
  {
    id: 4,
    name: '本地土豆',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20potatoes%20on%20burlap%20sack%20farm%20harvest&image_size=square',
    category: 'vegetable',
    isSpecial: true,
    specs: [
      { id: 401, productId: 4, name: '约2斤', price: 5.0, memberPrice: 4.0, stock: 30, unit: '斤' },
      { id: 402, productId: 4, name: '约5斤', price: 11.0, memberPrice: 9.5, stock: 15, unit: '斤' },
    ],
  },
  {
    id: 5,
    name: '水培生菜',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20green%20lettuce%20hydroponic%20vegetable%20clean&image_size=square',
    category: 'vegetable',
    isSpecial: false,
    specs: [
      { id: 501, productId: 5, name: '1棵', price: 3.5, memberPrice: 2.8, stock: 1, unit: '棵' },
      { id: 502, productId: 5, name: '3棵', price: 9.0, memberPrice: 7.5, stock: 3, unit: '棵' },
    ],
  },
  {
    id: 6,
    name: '胡萝卜',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20orange%20carrots%20with%20greens%20farm%20vegetable&image_size=square',
    category: 'vegetable',
    isSpecial: false,
    specs: [
      { id: 601, productId: 6, name: '约1斤', price: 4.5, memberPrice: 3.8, stock: 18, unit: '斤' },
      { id: 602, productId: 6, name: '约3斤', price: 12.0, memberPrice: 10.0, stock: 10, unit: '斤' },
    ],
  },
  {
    id: 7,
    name: '大白菜',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20Chinese%20cabbage%20napa%20cabbage%20vegetable%20market&image_size=square',
    category: 'vegetable',
    isSpecial: false,
    specs: [
      { id: 701, productId: 7, name: '约1棵', price: 4.0, memberPrice: 3.2, stock: 4, unit: '棵' },
      { id: 702, productId: 7, name: '约3棵', price: 10.0, memberPrice: 8.5, stock: 7, unit: '棵' },
    ],
  },
  {
    id: 8,
    name: '嫩豆角',
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20green%20beans%20string%20beans%20farm%20vegetable&image_size=square',
    category: 'vegetable',
    isSpecial: true,
    specs: [
      { id: 801, productId: 8, name: '约1斤', price: 7.0, memberPrice: 5.9, stock: 2, unit: '斤' },
      { id: 802, productId: 8, name: '约2斤', price: 13.0, memberPrice: 11.0, stock: 5, unit: '斤' },
    ],
  },
]

export const orders: Order[] = [
  {
    id: 1001,
    phone: '13800001111',
    pickupTime: '今天 17:00-19:00',
    status: 'pending',
    createdAt: '2026-06-26 10:30',
    items: [
      { id: 1, orderId: 1001, productName: '有机西红柿', specName: '约2斤', quantity: 1, unitPrice: 10.5 },
      { id: 2, orderId: 1001, productName: '新鲜黄瓜', specName: '约1斤', quantity: 2, unitPrice: 3.5 },
    ],
  },
  {
    id: 1002,
    phone: '13800002222',
    pickupTime: '今天 17:00-19:00',
    status: 'pending',
    createdAt: '2026-06-26 11:15',
    items: [
      { id: 3, orderId: 1002, productName: '本地土豆', specName: '约5斤', quantity: 1, unitPrice: 9.5 },
      { id: 4, orderId: 1002, productName: '水培生菜', specName: '3棵', quantity: 1, unitPrice: 7.5 },
      { id: 5, orderId: 1002, productName: '胡萝卜', specName: '约1斤', quantity: 2, unitPrice: 3.8 },
    ],
  },
  {
    id: 1003,
    phone: '13800003333',
    pickupTime: '今天 17:00-19:00',
    status: 'pending',
    createdAt: '2026-06-26 09:45',
    items: [
      { id: 6, orderId: 1003, productName: '嫩豆角', specName: '约1斤', quantity: 1, unitPrice: 5.9 },
    ],
  },
  {
    id: 1004,
    phone: '13800001111',
    pickupTime: '昨天 17:00-19:00',
    status: 'completed',
    createdAt: '2026-06-25 14:20',
    items: [
      { id: 7, orderId: 1004, productName: '有机西红柿', specName: '约1斤', quantity: 2, unitPrice: 5.8 },
      { id: 8, orderId: 1004, productName: '大白菜', specName: '约1棵', quantity: 1, unitPrice: 3.2 },
    ],
  },
  {
    id: 1005,
    phone: '13800002222',
    pickupTime: '昨天 17:00-19:00',
    status: 'completed',
    createdAt: '2026-06-25 16:00',
    items: [
      { id: 9, orderId: 1005, productName: '紫甘蓝', specName: '约1个', quantity: 1, unitPrice: 4.2 },
    ],
  },
  {
    id: 1006,
    phone: '13800004444',
    pickupTime: '前天 17:00-19:00',
    status: 'cancelled',
    createdAt: '2026-06-24 12:30',
    items: [
      { id: 10, orderId: 1006, productName: '新鲜黄瓜', specName: '约3斤', quantity: 1, unitPrice: 9.0 },
    ],
  },
]
