<!-- app/components/TheToast.vue -->
<script setup>
import { CheckCircle, AlertCircle, Info, X } from 'lucide-vue-next';
const { toasts } = useToast();
</script>

<template>
  <div class="fixed top-6 left-1/2 -translate-x-1/2 z-[200] flex flex-col gap-3 w-full max-w-md px-4 pointer-events-none">
    <TransitionGroup 
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0 scale-95"
      enter-to-class="transform translate-y-0 opacity-100 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div 
        v-for="toast in toasts" 
        :key="toast.id"
        class="pointer-events-auto flex items-center justify-between gap-3 px-4 py-3.5 rounded-2xl shadow-xl border backdrop-blur-md"
        :class="{
          'bg-emerald-50/90 border-emerald-200 text-emerald-800': toast.type === 'success',
          'bg-red-50/90 border-red-200 text-red-800': toast.type === 'error',
          'bg-blue-50/90 border-blue-200 text-blue-800': toast.type === 'info'
        }"
      >
        <div class="flex items-center gap-3">
          <CheckCircle v-if="toast.type === 'success'" class="w-5 h-5 text-emerald-600" />
          <AlertCircle v-else-if="toast.type === 'error'" class="w-5 h-5 text-red-600" />
          <Info v-else class="w-5 h-5 text-blue-600" />
          
          <span class="text-sm font-bold">{{ toast.message }}</span>
        </div>
        
        <!-- 手动关闭按钮 -->
        <button @click="toasts = toasts.filter(t => t.id !== toast.id)" class="opacity-50 hover:opacity-100">
          <X class="w-4 h-4" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>