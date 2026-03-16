<template>
  <nav class="fixed  top-0 left-0 right-0 z-50 bg-[#001151]">
    <div class="container mx-auto px-4">
      <div class="flex items-center justify-between h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <a href="#" class="flex items-center gap-2 py-4">
            <div class="flex items-center justify-center">
              <img :src="siteConfig?.logoUrl" alt="logo" class="w-10 h-10">
            </div>
            <span class="text-2xl font-bold text-white">{{ siteConfig?.logoName }}</span>
          </a>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <div v-for="(item, index) in navItems" :key="index" class="relative group">
            <NuxtLink  :to="resolveUrl(item.href)"
              class="text-white hover:text-blue-300 transition-colors flex items-center px-3 py-2 rounded-md hover:bg-blue-900/30">
              {{ item.label }}
              <span class="ml-1 flex items-center group-hover:rotate-180 transition-transform duration-300">
                <UIcon v-if="item.hasDropdown" name="formkit:down" size="8" />
              </span>
            </NuxtLink>

            <!-- Dropdown Menu -->
            <div v-if="item.hasDropdown"
              class="absolute top-full left-0 mt-1 bg-white text-[#0c1a38] rounded-md shadow-lg py-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 border-t-2 border-blue-500">
              <a v-for="(subItem, subIndex) in item.subItems" :key="subIndex" :href="subItem.href"
                class="block px-4 py-3 hover:bg-blue-100 transition-colors duration-200 border-b border-gray-100 last:border-b-0">
                {{ subItem.label }}
              </a>
            </div>
          </div>
        </div>

        <!-- Mobile Menu Button -->
        <div v-if="mobileMenuOpen" class="md:hidden bg-white text-[#001151] absolute top-20 left-0 w-full h-[calc(100vh-80px)] overflow-y-auto z-[99]">
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="text-white p-2 focus:outline-none">
            <UIcon :name="mobileMenuOpen ?  'line-md:menu-to-close-alt-transition':'material-symbols:menu'" size="24" />
          </button>
        </div>

        <!-- CTA Button (Desktop) -->
        <div class="hidden md:flex items-center">
          <button
            class="bg-blue-500 text-white px-5 py-3 rounded-md hover:bg-blue-600 transition-all hover:shadow-lg hover:-translate-y-0.5 duration-300">
            Request a quote
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-if="mobileMenuOpen" class="md:hidden bg-white text-[#0c1a38] shadow-lg absolute top-20 left-0 w-full z-50 h-screen">
      <div class="container mx-auto px-4 py-4">
        <div v-for="(item, index) in navItems" :key="index" class="border-b border-gray-200 last:border-b-0">
          <div class="flex items-center justify-between py-4">
            <NuxtLink  :to="resolveUrl(item.href)" class="text-[#0c1a38] hover:text-blue-500 font-medium">
              {{ item.label }}
            </NuxtLink >
            <button v-if="item.hasDropdown" @click="mobileDropdowns[index] = !mobileDropdowns[index]"
              class="text-gray-500">
              <UIcon :name="mobileDropdowns[index] ? 'formkit:down' : 'formkit:down'" size="10" />
            </button>
          </div>

          <!-- Mobile Dropdown Menu -->
          <div v-if="item.hasDropdown && mobileDropdowns[index]" class="pl-4 pb-4 space-y-2">
            <a v-for="(subItem, subIndex) in item.subItems" :key="subIndex" :href="subItem.href"
              class="block py-2 text-gray-600 hover:text-blue-500 hover:bg-gray-100 px-3 rounded">
              {{ subItem.label }}
            </a>
          </div>
        </div>

        <!-- Mobile CTA Button -->
      
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const siteConfig = ref({
  logoName: '',
  logoUrl: '',
  navItems: []
})

onMounted(async () => {
  try {
    const response = await fetch('/setting.json')
    const data = await response.json()
    siteConfig.value = data // 直接赋值，现在它有默认值，不会报错
  } catch (e) {
    console.error("加载配置文件失败", e)
  }
})

const route = useRoute()

// 这里的 props 增加一个控制开关，决定是否是“模板内部跳转”
const props = defineProps({
  navItems: {
    type: Array as () => Array<{
      label: string
      href: string
      hasDropdown?: boolean
      subItems?: Array<{
        label: string
        href: string
      }>
    }>,
    default: () => [
      { label: 'Home', href: '/home' },
      {
        label: 'About',
        href: '#',
        hasDropdown: true,
        subItems: [
          { label: 'About company', href: '#' },
          { label: 'Our team', href: '#' },
          { label: 'FAQ', href: '#' }
        ]
      },
      {
        label: 'Services',
        href: '#',
        hasDropdown: true,
        subItems: [
          { label: 'Service 1', href: '#' },
          { label: 'Service 2', href: '#' },
          { label: 'Service 3', href: '#' }
        ]
      },
      { label: 'News', href: '#' },
      { label: 'Contact', href: '/contact' },
      { label: 'Blocks', href: '#' },
      {
        label: 'More', href: '#', hasDropdown: true,
        subItems: [
          { label: 'Service 1', href: '#' },
          { label: 'Service 2', href: '#' },
          { label: 'Service 3', href: '#' }
        ]
      }
    ]
  },
  isTemplateMode: {
    type: Boolean,
    default: true
  }
})

// 核心逻辑：路径解析函数
const resolveUrl = (href: string) => {
  // 1. 如果是外部链接 (http)，直接返回
  if (href.startsWith('http')) return href
  
  // 2. 如果当前在模板详情页 (/template/template4)
  // route.params.detail 拿到的是 "template4"
  if (props.isTemplateMode && route.params.detail) {
    const templateSlug = route.params.detail
    
    // 如果 href 是 "contact"，拼成 "/template/template4/contact"
    // 注意处理斜杠，防止出现 //
    const cleanHref = href.startsWith('/') ? href.slice(1) : href
    return `/template/${templateSlug}/${cleanHref}`
  }

  // 3. 普通模式，直接返回 href
  return href
}

// Mobile menu state
const mobileMenuOpen = ref(false)
const mobileDropdowns = ref<Record<number, boolean>>({})
</script>

<style scoped>
/* Additional custom styles can be added here */
</style>