<script setup>
import { 
  CheckCircle, 
  AlertCircle, 
  Users, 
  CalendarCheck, 
  Info, 
  ArrowLeft,
  ShieldCheck,
  Timer,
  FileText,
   Compass, 
  PhoneCall, 
  ClipboardCheck, 
  MapPinned, 
  IdCard, 
  Briefcase,
  CheckCircle2
} from 'lucide-vue-next';



// 核心政策数据
const policies = [
  {
    title: '服务对象',
    icon: Users,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
    items: [
      '持有云南省有效身份证件',
      '跨省前往浙江省嘉兴市务工人员',
      '处于求职空窗期或刚抵达尚未入职阶段'
    ]
  },
  {
    title: '免费项目',
    icon: ShieldCheck,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    items: [
      '标准化宿舍床位（含床上用品）',
      '定时供应营养餐食（符合云南口味）',
      '公共浴室、热水、WIFI等基础生活设施',
      '专业岗位推荐与就业指导'
    ]
  },
  {
    title: '入驻须知',
    icon: Info,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    items: [
      '实行“先到先得”原则，铺位满员即止',
      '单次入驻时间原则上不超过 3天（根据就业进度调整）',
      '严禁携带违禁品，遵守集体宿舍管理规定',
      '爱护公物，保持环境卫生'
    ]
  }
];

useSeoMeta({
  title: '免费入住条件与防骗须知 - 官方政策 | 云南省外出务工嘉兴就业服务站',
  
  description: '在嘉兴服务站免费吃住需要什么条件？能免费住几天？这里为您详细解答入住政策。官方公益，绝不向工友收费，教你识别劳务黑中介套路，保障老乡合法权益。',
  
  keywords: '免费入住条件,嘉兴找工作防骗,劳务黑中介套路,嘉兴打工政策,免费住几天,云南工友维权,嘉兴临时住宿',

  ogTitle: '必看！嘉兴服务站免费入住条件与防骗指南',
  
  ogDescription: '出门在外防人之心不可无。看看站里的免费政策和防骗提醒，认准官方公益站点，千万别被黑中介坑了钱！',
  
  ogImage: '/img/media.png', 
  ogLocale: 'zh_CN',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
});
</script>

<template>
  <div class="min-h-screen bg-slate-50 pb-20">
  

    <!-- 顶部 Banner -->

     <header class="bg-emerald-700 pt-20 pb-24 px-6 text-center text-white">
      <div class="max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 bg-emerald-800/50 text-emerald-100 px-5 py-2 rounded-full text-sm font-bold mb-8 border border-emerald-600">
          <Compass class="w-4 h-4" /> 官方入驻政策
        </div>
      <h1 class="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">公开、透明、公益</h1>
        <p class="text-emerald-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          云南省外出务工嘉兴就业服务站致力于保障云南籍工友在嘉兴的“第一站”，<br class="hidden md:block" />
          让每一份努力都能被温暖对待。
        </p>
      </div>
    </header>

    <main class="max-w-4xl mx-auto px-4 -mt-8">
      <!-- 重要提醒 (Alert) -->
      <div class="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-2xl shadow-lg mb-8">
        <div class="flex gap-4">
          <AlertCircle class="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <h3 class="font-bold text-amber-800 text-lg">重要提醒：请务必提前预约</h3>
            <p class="text-amber-700 mt-1 leading-relaxed text-sm">
              因站点床位资源有限，为避免您长途跋涉抵达后出现“满员”无法入驻的情况，请务必在出发前或抵达前通过本站电话进行预约，确认有空位后再行前往。
            </p>
          </div>
        </div>
      </div>

      <!-- 政策详情列表 -->
      <div class="space-y-6">
        <section v-for="policy in policies" :key="policy.title" 
          class="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
          <div class="flex items-center gap-4 mb-6">
            <div :class="[policy.bg, policy.color, 'p-3 rounded-2xl']">
              <component :is="policy.icon" class="w-6 h-6" />
            </div>
            <h2 class="text-2xl font-bold text-slate-800">{{ policy.title }}</h2>
          </div>
          <ul class="space-y-4">
            <li v-for="item in policy.items" :key="item" class="flex items-start gap-3">
              <CheckCircle class="w-5 h-5 text-emerald-500 mt-1 shrink-0" />
              <span class="text-slate-600 text-lg leading-relaxed">{{ item }}</span>
            </li>
          </ul>
        </section>

        <!-- 特别说明补充 (基于你的要求) -->
        <section class="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
          <div class="relative z-10">
            <div class="flex items-center gap-4 mb-6">
              <div class="bg-white/10 p-3 rounded-2xl">
                <FileText class="w-6 h-6 text-yellow-400" />
              </div>
              <h2 class="text-2xl font-bold">特别补充说明</h2>
            </div>
            <div class="grid md:grid-cols-2 gap-6 text-slate-300">
              <div class="space-y-2">
                <p class="font-bold text-white flex items-center gap-2">
                  <Timer class="w-4 h-4 text-emerald-400" /> 申请时效
                </p>
                <p class="text-sm">审核通过后，预约名额仅保留 24 小时，逾期未抵达需重新申请。</p>
              </div>
              <div class="space-y-2">
                <p class="font-bold text-white flex items-center gap-2">
                  <ShieldCheck class="w-4 h-4 text-emerald-400" /> 身份核验
                </p>
                <p class="text-sm">入驻时需配合出示本人二代身份证件，并登记实名信息。</p>
              </div>
            </div>
          </div>
          <!-- 装饰图标 -->
          <ShieldCheck class="absolute -right-8 -bottom-8 w-48 h-48 opacity-5 rotate-12" />
        </section>
      </div>

      <!-- 底部操作区 -->
      <div class="mt-12 text-center">
        <p class="text-slate-500 mb-6">对此政策有任何疑问？</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="tel:13656617631" 
            class="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-xl shadow-xl hover:bg-emerald-500 transition-all">
            拨号详细咨询
          </a>
          <NuxtLink to="/apply" 
            class="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-bold text-xl hover:bg-slate-50 transition-all">
            看流程
          </NuxtLink>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* 针对政策列表的平滑进场效果 */
section {
  transition: all 0.3s ease;
}
section:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
}
</style>