<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Leaf, ClipboardList, ShieldCheck } from 'lucide-vue-next'

const route = useRoute()

const tabs = [
  { path: '/', label: '菜品', icon: Leaf },
  { path: '/orders', label: '订单', icon: ClipboardList },
  { path: '/verify', label: '核销', icon: ShieldCheck },
]

const activeTab = computed(() => {
  return tabs.findIndex((t) => t.path === route.path)
})
</script>

<template>
  <div class="min-w-[375px] max-w-[430px] mx-auto relative bg-[#FAF8F5] min-h-screen">
    <router-view />

    <nav class="fixed bottom-0 left-0 right-0 z-50">
      <div class="max-w-[430px] mx-auto bg-white border-t border-gray-100 flex">
        <router-link
          v-for="(tab, idx) in tabs"
          :key="tab.path"
          :to="tab.path"
          :class="[
            'flex-1 flex flex-col items-center justify-center py-2 gap-0.5 transition-colors',
            activeTab === idx
              ? 'text-green-700'
              : 'text-gray-400',
          ]"
        >
          <component :is="tab.icon" :size="20" :stroke-width="activeTab === idx ? 2.2 : 1.5" />
          <span class="text-[11px]">{{ tab.label }}</span>
        </router-link>
      </div>
    </nav>
  </div>
</template>
