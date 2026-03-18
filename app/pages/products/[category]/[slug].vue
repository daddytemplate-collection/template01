<template>
  <div class="bg-white min-h-screen pb-20">
    <!-- 顶部面包屑与背景 (深蓝色系) -->
    <div class="bg-[#001151] pt-32 pb-20 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <img src="https://the7.io/fse-corporate/wp-content/uploads/sites/142/2025/08/co-b-l.svg"
          class="w-full h-full object-cover">
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <nav class="flex items-center gap-2 text-sm font-medium text-blue-200/60 mb-6">
          <NuxtLink to="/" class="hover:text-white transition-colors">Home</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <NuxtLink :to="`/products/${categoryName}`" class="hover:text-white transition-colors capitalize">{{
            categoryName }}</NuxtLink>
          <ChevronRight class="w-4 h-4" />
          <span class="text-white line-clamp-1">{{ product?.title || 'Loading...' }}</span>
        </nav>
        <h1 class="text-3xl md:text-5xl font-bold text-white tracking-tight">
          {{ product?.title || 'Loading...' }}
        </h1>
      </div>
    </div>

    <!-- 内容区：使用 v-if 确保数据加载后再渲染，防止报错 -->
    <div v-if="product" class="container mx-auto px-4 mt-10  z-20">
      <!-- 上方：产品图片画廊 -->
      <div class="grid grid-cols-2 gap-8  mx-auto container px-4">

        <!-- ProductGallery 区域 -->
        <div class="col-span-1">
          <ProductGallery :images="product?.meta?.firstImage || []" class="w-full" />
        </div>

        <!-- 右侧区域 -->
        <div class="flex flex-col space-y-8">
      
      <!-- 1. 信任标签与标题 -->
      <div class="space-y-4">
        <div class="flex items-center gap-2 text-sm">
          <div class="flex text-yellow-400">★★★★★</div>
          <span class="font-bold">4.4</span>
          <a href="#" class="underline hover:text-blue-600">based on 4k+ Reviews</a>
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold text-[#001151] leading-tight">
          {{ product.title }}
        </h1>
        <ul class="space-y-3 pt-2">
          <li v-for="item in product.benefits" :key="item" class="flex items-center gap-3">
            <CheckCircle class="w-5 h-5 text-emerald-600" />
            <span class="text-slate-700">{{ item }}</span>
          </li>
        </ul>
      </div>

      <!-- 2. 决策转化区 (CTA) -->
      <div class="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
        <div class="flex items-start gap-3 text-sm text-slate-600">
          <Info class="w-5 h-5 flex-shrink-0" />
          <p>This treatment requires an assessment of your medical history by a professional provider.</p>
        </div>
        <button class="w-full bg-[#001151] hover:bg-blue-900 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]">
          Enroll Now — {{ product.price }}
        </button>
        <button class="w-full bg-white border-2 border-[#001151] text-[#001151] hover:bg-slate-50 font-bold py-4 rounded-xl transition-all">
          See if You are Eligible
        </button>
        <a href="#" class="block text-center text-sm underline text-slate-500 hover:text-slate-900">Important safety information</a>
      </div>

      <!-- 3. 信息折叠区 (Accordion) -->
      <div class="divide-y divide-slate-200 border-t border-slate-200">
        <AccordionItem v-for="item in product.details" :key="item.title" :title="item.title" :content="item.content" />
      </div>

      <!-- 4. 快速跳转标签 (Jump to) -->
      <div class="pt-4">
        <p class="text-sm font-bold text-slate-900 mb-3">Jump to:</p>
        <div class="flex flex-wrap gap-2">
          <button v-for="tag in product.tags" :key="tag" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-full text-sm font-medium transition-colors">
            {{ tag }}
          </button>
        </div>
      </div>
    </div>
      </div>



      <!-- 下方：Markdown 正文详情 -->
      <div class="max-w-4xl mx-auto mt-20">


        <div class="prose prose-slate max-w-none 
          prose-headings:text-[#001151] 
          prose-a:text-gray-900 
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
  @apply text-gray-900 font-semibold no-underline hover:border-blue-600 transition-all;
  border-bottom: none !important;
}

/* 标题美化：增加层次感和蓝色基调 */
.prose h1 {
  @apply text-gray-900 font-extrabold text-5xl mt-12 mb-12;


}

.prose h2 {
  @apply text-gray-900 font-extrabold text-3xl mt-12 mb-6;


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
  @apply bg-slate-50/50;
  /* 隔行换色（斑马纹） */
}

/* 引用美化：优雅的背景色和侧边条 */
.prose blockquote {
  @apply border-l-4 border-blue-500 bg-blue-50/50 px-8 py-6 rounded-r-2xl italic text-slate-700 my-10 not-italic;
}

/* 列表美化 */
/* 1. 针对所有列表的基础重置 (清理默认间距) */
.prose ul,
.prose ol {
  @apply space-y-3 my-6 pl-0;
}

/* 2. 针对无序列表 (ul) 的样式 */
.prose ul {
  @apply list-none;
}

.prose ul li {
  @apply relative pl-6;
}

.prose ul li::before {
  content: '';
  @apply absolute left-0 top-2.5 w-1.5 h-1.5 rounded-full bg-gray-800;
}

/* 3. 针对有序列表 (ol) 的样式 (必须开启 list-decimal) */
.prose ol {
  @apply list-decimal pl-6;
  /* 恢复数字显示，并保留左侧间距 */
}

.prose ol li {
  @apply pl-2;
  /* 给数字和文字之间留出一点点空隙 */
}

/* 图片及其描述美化 */
.prose img {
  @apply rounded-xl border-slate-100 my-10 mx-auto;
}

.prose em {
  /* 针对图片下方的文字说明 (Caption) */
  @apply block text-center text-xs text-slate-400 mt-[-2rem] mb-10 not-italic font-medium;
}

/* 水平分割线 */
.prose hr {
  @apply my-16 border-slate-100;
}

/* 链接美化 */
.prose a {
  @apply text-gray-900 font-semibold no-underline border-b border-blue-200 hover:border-blue-600 transition-all;
}
</style>