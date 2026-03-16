<template>
  <div class="min-h-screen bg-slate-50 font-sans pb-20">

    <!-- 1. 英雄区：凸显公益与免费初心 (Hero Section) -->
    <header class="relative bg-emerald-700 py-20 md:py-28 overflow-hidden">
      <!-- 装饰背景 -->
      <div class="absolute inset-0 opacity-10">
        <svg class="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white"></path>
        </svg>
      </div>

      <div class="relative max-w-7xl mx-auto px-4 text-center">
        <span class="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 text-sm font-bold px-5 py-2 rounded-full mb-6 border border-yellow-400/30">
          <Heart class="w-4 h-4" fill="currentColor" /> 纯公益 · 零收费 · 献爱心
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          坚守公益初心，<br class="md:hidden" />做工友们的<span class="text-yellow-400">“娘家人”</span>
        </h1>
        <p class="text-emerald-50 text-lg md:text-xl max-w-3xl mx-auto mb-8 opacity-90 leading-relaxed">
          这个是纯公益项目,这里是云南省外出务工嘉兴就业服务站，
          我们存在的唯一目的，就是让每一位从云南来嘉兴打拼的乡亲，遇到困难时在异乡有一个<strong class="text-white">免费吃住、安心落脚</strong>的地方。
        </p>
      </div>
    </header>

    <!-- 核心数据：强化“免费”心智 (Data Section) -->
    <section class="max-w-7xl mx-auto px-4 -mt-12 relative z-10 mb-20">
      <div class="bg-white rounded-[2rem] shadow-xl border border-slate-100 p-8 md:p-12">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-slate-100">
          <div class="text-center px-4">
            <p class="text-slate-500 mb-2 text-sm font-medium">累计提供免费床位</p>
            <div class="text-4xl font-black text-emerald-600">300<span class="text-2xl">+</span></div>
          </div>
          <div class="text-center px-4">
            <p class="text-slate-500 mb-2 text-sm font-medium">供应免费热餐</p>
            <div class="text-4xl font-black text-orange-500">8,50<span class="text-2xl">+</span></div>
          </div>
          <div class="text-center px-4">
            <p class="text-slate-500 mb-2 text-sm font-medium">成功对接工作</p>
            <div class="text-4xl font-black text-blue-500">200<span class="text-2xl">+</span></div>
          </div>
          <div class="text-center px-4 bg-emerald-50 rounded-2xl py-2">
            <p class="text-emerald-700 mb-1 text-sm font-bold">向工友收取费用</p>
            <div class="text-5xl font-black text-emerald-600">0<span class="text-xl">元</span></div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. 特别鸣谢：政府与社会力量背书 (Acknowledgments) -->
    <section class="py-16 max-w-7xl mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-800 mb-4 flex items-center justify-center gap-3">
          <ShieldCheck class="text-emerald-500 w-8 h-8" /> 特别鸣谢
        </h2>
        <p class="text-slate-500 max-w-2xl mx-auto">
          关爱站的平稳运行与全部免费服务的提供，离不开家乡政府的牵挂与社会各界爱心力量的鼎力支持。
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- 鸣谢卡片 -->
        <div v-for="(org, index) in organizations" :key="index" 
             class="bg-white p-6 rounded-2xl shadow-md border border-slate-100 hover:shadow-xl transition-shadow flex items-start gap-4">
          <div class="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
            <Landmark class="text-red-500 w-6 h-6" />
          </div>
          <div>
            <h4 class="font-bold text-slate-800 text-lg mb-1">{{ org.name }}</h4>
            <p class="text-slate-500 text-sm leading-relaxed">{{ org.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. 真实入住案例 (Case Studies) -->
    <section class="py-20 bg-emerald-50">
      <div class="max-w-7xl mx-auto px-4">
        <div class="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 class="text-3xl font-bold text-slate-800 mb-4">改变，在这里发生</h2>
            <p class="text-slate-500">无数老乡从这里踏出了在嘉兴安稳发展的第一步。</p>
          </div>
        </div>

        <div class="grid lg:grid-cols-3 gap-8">
          <div v-for="(story, index) in stories" :key="index" 
               class="bg-white rounded-[2rem] overflow-hidden shadow-lg border border-emerald-100 relative group">
            <!-- 顶部装饰条 -->
            <div class="h-2 w-full bg-gradient-to-r from-emerald-400 to-emerald-600"></div>
            
            <div class="p-8">
              <div class="flex items-center gap-4 mb-6">
                <div class="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-xl">
                  {{ story.name.charAt(0) }}
                </div>
                <div>
                  <h3 class="font-bold text-slate-800 text-lg">{{ story.name }}</h3>
                  <p class="text-emerald-600 text-sm font-medium">{{ story.tag }}</p>
                </div>
              </div>
              
              <div class="space-y-4">
                <div class="bg-slate-50 p-4 rounded-xl">
                  <span class="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-1">来站前情况</span>
                  <p class="text-slate-700 text-sm">{{ story.before }}</p>
                </div>
                <div class="bg-emerald-50 p-4 rounded-xl border border-emerald-100/50">
                  <span class="text-xs font-bold text-emerald-500 uppercase tracking-wider block mb-1">入站后结果</span>
                  <p class="text-slate-700 text-sm">{{ story.after }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 入住好评 (Testimonials) -->
    <section class="py-24 max-w-7xl mx-auto px-4">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-800 mb-4">工友心声</h2>
        <p class="text-slate-500">金杯银杯，不如乡亲们的口碑。大家说好，才是真的好。</p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="(review, index) in reviews" :key="index" 
             class="bg-white p-8 rounded-[2rem] shadow-md border border-slate-100 relative hover:-translate-y-1 transition-transform">
          <!-- 引用图标作为背景装饰 -->
          <Quote class="absolute top-6 right-6 w-12 h-12 text-slate-100" />
          
          <!-- 星星评分 -->
          <div class="flex gap-1 mb-4 relative z-10">
            <Star v-for="i in 5" :key="i" class="w-5 h-5 text-yellow-400 fill-yellow-400" />
          </div>
          
          <h4 class="font-bold text-slate-800 text-lg mb-3 relative z-10">"{{ review.title }}"</h4>
          <p class="text-slate-600 text-sm leading-relaxed mb-6 relative z-10">
            {{ review.content }}
          </p>
          
          <div class="flex items-center gap-3 relative z-10">
            <div class="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <User class="w-5 h-5" />
            </div>
            <div>
              <p class="text-slate-800 font-bold text-sm">{{ review.author }}</p>
              <p class="text-slate-400 text-xs">{{ review.date }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 底部行动号召 (CTA) -->
    <section class="max-w-5xl mx-auto px-4">
      <div class="bg-emerald-700 rounded-[2.5rem] p-10 md:p-16 text-center text-white shadow-2xl relative overflow-hidden">
        <div class="absolute -top-24 -right-24 w-64 h-64 bg-emerald-600 rounded-full opacity-50 blur-3xl"></div>
        <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-yellow-400 rounded-full opacity-20 blur-3xl"></div>
        
        <div class="relative z-10">
          <h2 class="text-3xl md:text-4xl font-bold mb-6">遇到了困难？不要一个人扛</h2>
          <p class="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            只要您是从云南来嘉兴务工的乡亲，这里就是您免费的家。包吃、包住、帮找工作，随时等您来。
          </p>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a href="tel:13656617631" class="bg-yellow-400 text-emerald-900 px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:bg-yellow-300 transition-all flex items-center justify-center gap-2">
              <PhoneCall class="w-6 h-6" /> 立即拨打求助热线
            </a>
            <NuxtLink to="/" class="bg-emerald-800/50 hover:bg-emerald-800 border border-emerald-500/50 px-8 py-4 rounded-xl text-lg font-bold text-white transition-all flex items-center justify-center gap-2">
              查看乘车路线
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { 
  Heart, ShieldCheck, Landmark, Quote, Star, User, PhoneCall 
} from 'lucide-vue-next'

// 感谢单位数据
const organizations = [
  {
    name: "云南省丘北县驻浙江嘉兴秀洲区劳务工作站",
    desc: "感谢上级部门在项目立项、政策指导及资金筹措上给予的支持，为站点赋予公信力。"
  },
  {
    name: "嘉兴市秀洲区人力资源和社会保障局",
    desc: "感谢嘉兴本地人社部门在本地企业用工信息共享方面搭建的绿色通道。"
  },
  {
    name: "嘉兴市云南商会 / 爱心企业",
    desc: "感谢老乡企业家们捐赠的部分床铺物资及日用品，让异乡的工友感受到家乡的温暖。"
  }
]

// 真实案例数据
const stories = [
  {
    name: "王大哥 (42岁)",
    tag: "红河州来嘉务工人员",
    before: "刚下火车时被黑中介骗走了几百块钱介绍费，身上钱所剩无几，晚上只能在火车站广场应付了一宿。",
    after: "通过老乡介绍来到服务站，免费住了1天，吃了2顿热饭。站里还对接了正规汽配厂，现在月薪6500元，已经稳定上班。"
  },
  {
    name: "李大姐夫妻",
    tag: "曲靖市来嘉务工人员",
    before: "夫妻俩一起来嘉兴找工作，住小旅馆每天要花100多，找了三天没合适的，眼看带的钱快花光了，非常焦虑。",
    after: "入驻关爱站后，食宿全免，瞬间没了开销压力。工作人员根据两人要求，对接了包吃住的纺织厂，夫妻俩顺利入职。"
  },
  {
    name: "小赵 (20岁)",
    tag: "昭通应届青年",
    before: "第一次出省打工，人生地不熟，对找什么工作完全没有方向，也不敢轻易去面试。",
    after: "站长不仅安排了免费住宿，还进行了半天的免费求职防骗指导。小赵最终选择了一家电子厂做质检员，工作轻松有保障。"
  }
]

// 好评数据
const reviews = [
  {
    title: "真的是一分钱没花！",
    content: "一开始我还以为是套路，觉得天下哪有免费的午餐。结果到了站里，真的免费入住，饭菜也是热乎乎的云南口味，走的时候真的一分钱没要我的！感谢老乡！",
    author: "老杨 (文山州)",
    date: "2025年10月"
  },
  {
    title: "让我感受到了老乡的温暖",
    content: "出门在外太不容易了，半夜到的嘉兴，打电话给站长，站长二话不说起来给我开门安排床铺。在异乡能听到乡音，能吃口热饭，眼泪都快掉下来了。",
    author: "张师傅 (个旧)",
    date: "2025年9月"
  },
  {
    title: "办事效率特别高",
    content: "本来就是来打工,给我提供了免费吃住,也给我推荐打工的企业，第二天就带着我们去厂里看环境，马上就定下来了。",
    author: "小陈妹子 (红河)",
    date: "2025年12月"
  }
]

useSeoMeta({
  title: '关于我们：坚持纯公益、0收费的“娘家人” | 云南省外出务工嘉兴就业服务站',
  
  description: '我们是谁？在云南、嘉兴两地政府和人社局的支持下，我们坚持做纯公益的劳务服务站。不仅提供免费食宿，更已成功帮助数千名云南老乡在嘉兴安稳落脚、高薪入职。',
  
  keywords: '云南驻嘉兴服务站是干嘛的,纯公益中介,免费找工作平台,人社局合作站点,嘉兴云南老乡互助,真实入职案例',

  ogTitle: '我们是谁？云南工友在嘉兴的“娘家人”',
  
  ogDescription: '坚守公益初心，绝不收工友一分钱！看看我们是如何帮助数千名老乡在异乡吃上热饭、找到好工作的。',
  
  ogImage: '/img/media.png', 
  ogLocale: 'zh_CN',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
});
</script>