<template>
  <div class="bg-white min-h-screen pb-20">
    <!-- 顶部面包屑与背景 (深蓝色系) -->
    <div class="bg-[#001151] pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <img src="https://the7.io/fse-corporate/wp-content/uploads/sites/142/2025/08/co-b-l.svg" class="w-full h-full object-cover">
      </div>
      
      <div class="container mx-auto px-4 relative z-10">
        <nav class="flex items-center gap-2 text-sm font-medium text-blue-200/60 mb-6">
          <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <NuxtLink :to="`/products/${categoryName}`" class="hover:text-white transition-colors capitalize">{{ categoryName }}</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white line-clamp-1">{{ product?.title || 'Loading...' }}</span>
        </nav>
        <h1 class="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {{ product?.title || 'Loading...' }}
        </h1>
      </div>
    </div>

    <!-- 内容区：使用 v-if 确保数据加载后再渲染，防止报错 -->
    <div v-if="product" class="container mx-auto px-4 -mt-10 relative z-20">
      <div class="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          <!-- 左侧：大图展示 -->
          <div class="lg:col-span-7 bg-slate-50 p-4 md:p-12 flex items-center justify-center">
            <div class="relative group">
              <!-- 注意：这里路径匹配你 md 里的 meta.image -->
              <img 
                :src="product?.meta?.image || '/img/placeholder.jpg'" 
                :alt="product?.title"
                class="w-full max-h-[500px] object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          <!-- 右侧：核心信息与询盘 -->
          <div class="lg:col-span-5 p-8 md:p-12 flex flex-col justify-center border-l border-slate-50">
            <div class="mb-8">
              <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-widest mb-4">
                <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                In Stock & Ready to Ship
              </div>
              <p class="text-slate-500 leading-relaxed text-lg mb-6">
                {{ product?.description }}
              </p>
            </div>

            <!-- 快捷参数列表 -->
            <div v-if="product?.features" class="space-y-4 mb-10">
              <div v-for="(feature, index) in product.features" :key="index" class="flex items-start gap-3">
                <CheckCircle2 class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span class="text-slate-700 font-medium">{{ feature }}</span>
              </div>
            </div>

            <!-- 询盘按钮 -->
            <NuxtLink 
              :to="{ path: '/contact', query: { subject: `Inquiry about ${product?.title}` } }"
              class="group flex items-center justify-center gap-3 w-full bg-[#001151] text-white py-5 rounded-2xl font-bold text-lg hover:bg-blue-900 transition-all shadow-lg"
            >
              <Send class="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Send Inquiry Now
            </NuxtLink>
            
            <p class="text-center text-slate-400 text-xs mt-4">
              Typical response time: <span class="text-slate-600 font-bold">Within 24 hours</span>
            </p>
          </div>
        </div>
      </div>

      <!-- 下方：Markdown 正文详情 -->
      <div class="max-w-4xl mx-auto mt-20">
        <div class="flex items-center gap-4 mb-10">
          <h2 class="text-4xl   text-slate-900">Detailed Specifications</h2>
         
        </div>
        
        <div class="prose prose-slate max-w-none 
          prose-headings:text-[#001151] 
          prose-a:text-blue-600 
          prose-img:rounded-2xl">
          <!-- 🌟 使用 ContentRenderer 渲染正文 -->
          <ContentRenderer :value="product" />
        </div>
      </div>
    </div>

    <!-- 加载状态或 404 提示 -->
    <div v-else-if="!pending" class="container mx-auto px-4 py-20 text-center">
      <h2 class="text-2xl font-bold text-slate-400">Product not found.</h2>
      <NuxtLink to="/" class="text-blue-500 mt-4 inline-block underline">Back to Home</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, CheckCircle2, Send } from 'lucide-vue-next'

const route = useRoute()
const categoryName = route.params.category as string
const slug = route.params.slug as string

// 🌟 核心修复：使用最稳妥的 queryContent 语法
// 不要手动 import queryContent，Nuxt 会自动导入
const { data: product, pending } = await useAsyncData(`product-${route.path}`, () => {
  // 🌟 核心修改：第一个参数是集合名 'products'，然后用 .path() 过滤路径
  return queryCollection('products').path(route.path).first()
})

console.log('查询结果:', product.value)


console.log('categoryName', categoryName)
console.log('product', product.value)
// 调试输出：如果页面还是空白，请在浏览器控制台看这两个打印
console.log('当前路由路径:', route.path)
console.log('查询到的数据:', product.value)
</script>

<style>
@reference "tailwindcss";
.prose {
  @apply text-slate-600 leading-relaxed;
 
}
.prose a {
  @apply text-blue-600 font-semibold no-underline  hover:border-blue-600 transition-all;
   border-bottom: none !important;
}

/* 标题美化：增加层次感和蓝色基调 */
.prose h2 {
  @apply text-[#001151] font-extrabold text-3xl mt-12 mb-6;

 
}


.prose h3 {
  @apply text-[#001151] font-bold text-xl mt-8 mb-4 flex items-center gap-2;
}


/* 表格美化：这是最影响专业感的地方 */
.prose table {
  @apply w-full border-collapse border border-slate-200 rounded-xl overflow-hidden my-8 shadow-sm;
}
.prose thead th {
  @apply bg-slate-50 text-slate-900 font-bold px-4 py-4 text-left border-b border-slate-200 uppercase tracking-wider text-xs;
}
.prose tbody td {
  @apply px-4 py-4 border-b border-slate-100 text-sm;
}
.prose tbody tr:last-child td {
  @apply border-b-0;
}
.prose tbody tr:nth-child(even) {
  @apply bg-slate-50/50; /* 隔行换色（斑马纹） */
}

/* 引用美化：优雅的背景色和侧边条 */
.prose blockquote {
  @apply border-l-4 border-blue-500 bg-blue-50/50 px-8 py-6 rounded-r-2xl italic text-slate-700 my-10 not-italic;
}

/* 列表美化 */
.prose ul {
  @apply space-y-3 my-6 list-none pl-0;
}
.prose ul li {
  @apply relative pl-6;
}
.prose ul li::before {
  content: '';
  @apply absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-blue-500;
}

/* 图片及其描述美化 */
.prose img {
  @apply rounded-2xl shadow-lg border border-slate-100 my-10 mx-auto transition-transform duration-500 hover:scale-[1.02];
}
.prose em { /* 针对图片下方的文字说明 (Caption) */
  @apply block text-center text-xs text-slate-400 mt-[-2rem] mb-10 not-italic font-medium;
}

/* 水平分割线 */
.prose hr {
  @apply my-16 border-slate-100;
}

/* 链接美化 */
.prose a {
  @apply text-blue-600 font-semibold no-underline border-b border-blue-200 hover:border-blue-600 transition-all;
}
</style>