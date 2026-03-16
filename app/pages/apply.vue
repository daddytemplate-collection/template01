<template>
  <!-- 外层只管底色，不加任何限制布局的类 -->
  <div class="min-h-screen bg-slate-50 pb-12 font-sans">
    
    <!-- 1. 顶部导语区 (纯粹的色块填充，最稳定) -->
    <header class="bg-emerald-700 pt-20 pb-24 px-6 text-center text-white">
      <div class="max-w-3xl mx-auto">
        <div class="inline-flex items-center gap-2 bg-emerald-800/50 text-emerald-100 px-5 py-2 rounded-full text-sm font-bold mb-8 border border-emerald-600">
          <Compass class="w-4 h-4" /> 官方入驻指南
        </div>
        <h1 class="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">从家乡到嘉兴</h1>
        <p class="text-emerald-100 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          我们为您整理了最清晰的五步流程。<br class="hidden md:block">
          只需按步骤准备，我们将为您提供温暖的食宿保障。
        </p>
      </div>
    </header>

    <!-- 2. 核心步骤区 (层叠卡片设计，零绝对定位，绝对不会乱) -->
    <main class="max-w-4xl  mx-auto px-4 -mt-10 relative z-10 space-y-6">
      
      <div v-for="(step, index) in stepsData" :key="index" 
        class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start hover:border-emerald-300 transition-colors">
        
        <!-- 左侧：醒目的步骤序号块 -->
        <div class="shrink-0 w-16 h-16 bg-emerald-50 text-emerald-600 rounded-2xl flex flex-col items-center justify-center border border-emerald-100">
          <span class="text-[10px] font-black uppercase tracking-widest opacity-60 mb-0.5">Step</span>
          <span class="text-2xl font-black leading-none">0{{ index + 1 }}</span>
        </div>

        <!-- 右侧：文字内容 -->
        <div class="flex-1">
          <h3 class="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
            <component :is="step.icon" class="w-5 h-5 text-emerald-500" />
            {{ step.title }}
          </h3>
          <p class="text-slate-600 mb-5 leading-relaxed">
            {{ step.desc }}
          </p>
          
          <!-- 提示语 (使用琥珀色警告框结构，更醒目) -->
          <div class="bg-amber-50 text-amber-800 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle class="w-5 h-5 shrink-0 text-amber-500 mt-0.5" />
            <p class="text-sm font-medium leading-relaxed">{{ step.tip }}</p>
          </div>
        </div>
      </div>

    </main>

    <!-- 3. 行前准备清单 (深色模块分割视觉) -->
    <section class="max-w-3xl mx-auto px-4 mt-12">
      <div class="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
        <div class="text-center mb-10">
          <div class="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Briefcase class="w-8 h-8 text-yellow-400" />
          </div>
          <h2 class="text-3xl font-bold mb-3">行前必备清单</h2>
          <p class="text-slate-400">请核对以下物品，缺少将影响入驻办理</p>
        </div>

        <!-- 简单的网格排列 -->
        <div class="grid sm:grid-cols-2 gap-4">
          <div v-for="item in checklist" :key="item" 
            class="flex items-center gap-4 bg-slate-800/50 p-4 rounded-2xl border border-slate-700">
            <CheckCircle2 class="w-6 h-6 text-emerald-400 shrink-0" />
            <span class="font-medium text-slate-200">{{ item }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 底部求助行动区 (纯粹的大字报风格) -->
    <section class="max-w-3xl mx-auto px-4 mt-12">
      <div class="bg-emerald-50 rounded-3xl p-8 md:p-12 text-center border border-emerald-100">
        <h2 class="text-2xl md:text-3xl font-bold text-slate-900 mb-4">流程看不懂？直接打电话！</h2>
        <p class="text-slate-600 mb-8 max-w-lg mx-auto">
          我们深知出门在外有很多疑虑，不用担心，直接拨打服务站电话，家乡人为您耐心解答。
        </p>
        
        <!-- 超大拨号按钮 -->
        <a href="tel:13656617631" 
          class="inline-flex items-center justify-center gap-3 bg-emerald-600 text-white px-8 py-5 rounded-full font-bold text-xl md:text-2xl hover:bg-emerald-500 transition-all shadow-lg shadow-emerald-600/30 active:scale-95 w-full sm:w-auto">
          <PhoneCall class="w-6 h-6" /> 
          <span>136-5661-7631</span>
        </a>
        <p class="text-emerald-600/60 text-sm mt-4 font-medium">24小时免费热线 · 随时接听</p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { 
  Compass, 
  PhoneCall, 
  ClipboardCheck, 
  MapPinned, 
  IdCard, 
  Briefcase,
  AlertCircle,
  CheckCircle2
} from 'lucide-vue-next';



// 将数据重命名，避免与你全局可能存在的变量冲突
const stepsData = [
  {
    title: '第一步：电话或在线咨询',
    desc: '在出发前，请务必先拨打服务热线或在网站留言。',
    tip: '这一步非常重要！我们需要初步核实您的云南籍身份，并确认嘉兴站点当前是否有剩余空位，以免您白跑一趟。',
    icon: PhoneCall
  },
  {
    title: '第二步：预约床位登记',
    desc: '确认有位后，工作人员会为您登记预计抵达时间、联系电话及求职意向。',
    tip: '请如实说明您的身体健康状况，以便我们为您安排合适的宿舍床位。',
    icon: ClipboardCheck
  },
  {
    title: '第三步：启程而来',
    desc: '携带好必需的证件，乘坐火车、高铁或飞机或汽车前往嘉兴。',
    tip: '路上请注意保管好个人财物。建议选择抵达【嘉兴站】或【嘉兴南站】。',
    icon: MapPinned
  },
  {
    title: '第四步：到站核验身份',
    desc: '抵达嘉兴秀洲区服务站后，向工作人员出示身份证原件进行实名登记。',
    tip: '现场办理完成后，工作人员会为您安排床位，并告知每日的用餐时间。',
    icon: IdCard
  },
  {
    title: '第五步：岗位对接与面试',
    desc: '在关爱站免费食宿期间，我们将为您推荐本地优质企业的岗位并安排面试。',
    tip: '面试成功并正式办理企业入职后，您需迁出关爱站宿舍，搬往企业宿舍开始全新的工作生活。',
    icon: Briefcase
  }
];

const checklist = [
  '本人二代身份证原件（必需）',
  '简单的个人换洗衣物',
  '求职空窗期或尚未入职证明',
  "一颗积极的心态,勤劳的双手"
];

useSeoMeta({
  title: '怎么申请免费吃住？- 入站流程指引 | 云南省外出务工嘉兴就业服务站',
  
  description: '云南老乡来嘉兴，只需简单几步即可申请免费食宿！带上身份证，按指引路线到达服务站，不填复杂表格，马上就能安排热饭和床铺。点此查看详细流程与乘车路线。',
  
  keywords: '怎么申请免费住宿,嘉兴服务站怎么走,云南人嘉兴找工作流程,进厂需要带什么,免住宿费条件',

  ogTitle: '老乡看过来：嘉兴免费吃住申请流程！(超简单)',
  
  ogDescription: '刚下火车不知道怎么走？点开这篇流程，带好身份证，教你一步步免费入住关爱站，踏实找工作！',
  
  ogImage: '/img/media.png', 
  ogLocale: 'zh_CN',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
});
</script>