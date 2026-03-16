<template>
  <nav class="fixed top-0 left-0 right-0 z-[100] bg-[#001151] shadow-xl">
    <!-- ... (Navbar code remains the same as previous) ... -->
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo Area -->
        <div class="relative z-[110] flex items-center">
          <NuxtLink :to="resolveUrl('/')" class="flex items-center gap-3 py-4 group">
            <div class="flex w-10 h-10 items-center justify-center">
              <img v-if="siteConfig?.logoUrl" :src="siteConfig.logoUrl" alt="Company Logo" class="w-full h-full object-contain">
              <div v-else class="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-xl">L</div>
            </div>
            <span class="text-2xl font-extrabold text-white tracking-tight uppercase">{{ siteConfig?.logoName || 'GLOBAL TRADE' }}</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-1 lg:space-x-4">
          <div v-for="(item, index) in navItems" :key="index" class="relative group">
            <NuxtLink :to="resolveUrl(item.href)" class="text-white/90 hover:text-blue-400 transition-all flex items-center px-4 py-2 rounded-md hover:bg-white/5 font-medium text-sm lg:text-base">
              {{ item.label }}
              <span v-if="item.hasDropdown" class="ml-1 flex items-center group-hover:rotate-180 transition-transform duration-300">
                <ChevronDown class="w-4 h-4 opacity-50" />
              </span>
            </NuxtLink>
            <!-- Dropdown code... -->
          </div>
        </div>

        <!-- Desktop CTA Button -->
        <div class="hidden md:flex items-center">
          <button @click="isModalOpen = true"
            class="group/btn relative bg-white text-[#001151] px-7 py-3 rounded-full font-bold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.15)] flex items-center gap-2 overflow-hidden">
            <span class="absolute inset-0 bg-blue-50 opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
            <span class="relative z-10 text-sm uppercase tracking-wider">Inquiry Now</span>
            <ArrowRight class="relative z-10 w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-300" />
          </button>
        </div>

        <!-- Mobile Menu Toggle Button (code...) -->
      </div>
    </div>

    <!-- Inquiry Modal -->
    <Teleport to="body">
      <div v-if="isModalOpen" class="fixed inset-0 z-[200] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="isModalOpen = false"></div>

        <!-- Modal Content -->
        <div class="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-modal-in">
          
          <!-- Header -->
          <div class="bg-[#001151] px-8 py-8 text-white relative">
            <button @click="isModalOpen = false" class="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
              <X class="w-6 h-6" />
            </button>
            <div class="flex items-center gap-4">
              <div class="bg-blue-500 p-3 rounded-2xl shadow-lg shadow-blue-900/20">
                <Mail class="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 class="text-2xl font-bold tracking-tight">Send Inquiry</h3>
                <p class="text-blue-200 text-sm mt-1">Get a quote within 24 hours</p>
              </div>
            </div>
          </div>

          <!-- Form Body -->
          <form @submit.prevent="handleSubmit" class="p-8 space-y-5">
            <!-- Name -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
              <input v-model="form.name" required type="text" placeholder="Your name"
                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:bg-white focus:border-blue-600 outline-none transition-all" />
            </div>

            <!-- Email -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <input v-model="form.email" required type="email" placeholder="example@company.com"
                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:bg-white focus:border-blue-600 outline-none transition-all" />
            </div>

            <!-- Message -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Message</label>
              <textarea v-model="form.message" required rows="3" placeholder="Tell us about your requirements..."
                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3.5 focus:bg-white focus:border-blue-600 outline-none transition-all resize-none"></textarea>
            </div>

            <!-- Captcha -->
            <div class="space-y-1.5">
              <label class="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Security Code</label>
              <div class="flex gap-3">
                <input v-model="captchaInput" required type="text" placeholder="Enter code"
                  class="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-3 focus:border-blue-600 outline-none" />
                <div @click="refreshCaptcha" class="bg-slate-100 rounded-2xl cursor-pointer hover:bg-slate-200 transition-colors flex items-center justify-center min-w-[100px] border-2 border-slate-100 overflow-hidden px-2 py-1">
                  <!-- Placeholder for Captcha Image -->
                  <span class="text-blue-900 font-mono font-bold tracking-tighter select-none">{{ currentCaptcha }}</span>
                </div>
              </div>
            </div>

            <!-- Submit Button -->
            <button :disabled="isSubmitting" type="submit"
              class="w-full bg-[#001151] text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] shadow-xl shadow-blue-100 mt-2 group">
              <template v-if="isSubmitting">
                <Loader2 class="w-5 h-5 animate-spin" />
                <span>Sending...</span>
              </template>
              <template v-else>
                <span>Submit Inquiry</span>
                <Send class="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </template>
            </button>
          </form>
        </div>
      </div>
    </Teleport>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { 
  X, Mail, Send, Loader2, ChevronDown, 
  ChevronRight, ArrowRight, Home 
} from 'lucide-vue-next'

// --- 1. 基础状态定义 ---
const isModalOpen = ref(false)
const isSubmitting = ref(false)
const mobileMenuOpen = ref(false)
const mobileDropdowns = ref<Record<number, boolean>>({})
const captchaInput = ref('')
const currentCaptcha = ref('8K2W')

const siteConfig = ref({
  logoName: 'EX-EXPORT',
  logoUrl: '',
  navItems: []
})

const form = reactive({
  name: '',
  email: '',
  message: ''
})

// --- 2. 核心：路径解析函数 (必须定义这个才能修复你的报错) ---
const route = useRoute() // 必须引入 Nuxt 的路由
const props = defineProps({
  navItems: {
    type: Array as any,
    default: () => [
      { label: 'Home', href: '/' },
      { label: 'Products', href: '/products', hasDropdown: true, subItems: [
        { label: 'Industrial', href: '/products/industrial' },
        { label: 'Electronics', href: '/products/electronics' }
      ]},
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' }
    ]
  },
  isTemplateMode: { type: Boolean, default: true }
})

// 这个函数就是报错的主角，请务必包含
const resolveUrl = (href: string) => {
  // 如果是外部链接或锚点，直接返回
  if (!href || href.startsWith('http') || href === '#') return href
  
  // 如果在模板详情页模式下，需要拼接路径
  if (props.isTemplateMode && route.params.detail) {
    const templateSlug = route.params.detail
    const cleanHref = href.startsWith('/') ? href.slice(1) : href
    return `/template/${templateSlug}/${cleanHref}`
  }
  
  return href
}

// --- 3. 其他功能函数 ---
const toggleMobileDropdown = (index: number) => {
  mobileDropdowns.value[index] = !mobileDropdowns.value[index]
}

const refreshCaptcha = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let result = ''
  for (let i = 0; i < 4; i++) result += chars.charAt(Math.floor(Math.random() * chars.length))
  currentCaptcha.value = result
}

const handleSubmit = async () => {
  if (captchaInput.value.toUpperCase() !== currentCaptcha.value) {
    alert("Invalid Captcha!")
    return
  }
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1500))
  isSubmitting.value = false
  isModalOpen.value = false
  alert("Inquiry Sent!")
}

onMounted(async () => {
  try {
    const response = await fetch('/setting.json')
    if (response.ok) {
      const data = await response.json()
      siteConfig.value = { ...siteConfig.value, ...data }
    }
  } catch (e) {
    console.warn("Setting.json not found")
  }
})
</script>

<style scoped>
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.9) translateY(20px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
.animate-modal-in {
  animation: modalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.animate-slide-in {
  animation: slideIn 0.3s ease-out forwards;
}
@keyframes slideIn {
  from { opacity: 0; transform: translateX(-15px); }
  to { opacity: 1; transform: translateX(0); }
}
</style>