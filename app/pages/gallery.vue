<template>
  <div class="min-h-screen bg-slate-50 font-sans pb-20">

    <!-- 1. 英雄区：情感共鸣 (Hero Section) -->
    <header class="relative bg-emerald-700 py-20 md:py-28 overflow-hidden">
      <!-- 温暖的光晕背景 -->
      <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-400/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
      <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-400/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4"></div>

      <div class="relative max-w-7xl mx-auto px-4 text-center z-10">
        <span class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-emerald-50 text-sm font-bold px-5 py-2 rounded-full mb-6 border border-white/20">
          <Camera class="w-4 h-4" /> 真实记录 · 传递温暖
        </span>
        <h1 class="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight tracking-tight">
          工友足迹 <span class="text-yellow-400 font-light mx-2">|</span> 嘉兴日记
        </h1>
        <p class="text-emerald-50 text-lg md:text-xl max-w-2xl mx-auto opacity-90 leading-relaxed">
          从背着蛇皮袋风尘仆仆地下火车，到穿上工装在流水线上露出安稳的笑容。
          这里记录着每一位云南老乡在嘉兴扎根的真实瞬间。
        </p>
      </div>
    </header>

 

    <!-- 3. 头条纪实故事 (Featured Story - 重点突出) -->
    <section class="max-w-7xl mx-auto mt-20 px-4 mb-16">
      <div class="bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-slate-100 flex flex-col lg:flex-row group">
        <!-- 左侧大图 (建议放一张极具感染力的照片) -->
        <div class="lg:w-3/5 relative overflow-hidden bg-slate-200 min-h-[300px] lg:min-h-[450px]">
          <!-- 替换 src 为真实图片 -->
          <img src="/img/li.png" 
               alt="车间工作照片" 
               class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          
          <!-- 渐变遮罩与标签 -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8">
            
          </div>
        </div>

        <!-- 右侧深度故事 -->
        <div class="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center relative">
          <!-- 装饰引号 -->
          <Quote class="absolute top-8 right-8 w-16 h-16 text-slate-50 opacity-50" />
          
          <div class="flex items-center gap-3 mb-4 text-sm text-slate-500">
            <span class="flex items-center gap-1"><MapPin class="w-4 h-4 text-emerald-500" /> 嘉兴市秀洲区某建筑工地</span>
            <span class="flex items-center gap-1"><Calendar class="w-4 h-4 text-emerald-500" /> 2024年11月</span>
          </div>
          
          <h2 class="text-3xl font-bold text-slate-800 mb-6 leading-tight">
            “拿到第一份工资，想让老婆也过来。”
          </h2>
          
          <p class="text-slate-600 leading-relaxed mb-8">
            来自云南昭通的李大哥，刚下火车时背着两个沉甸甸的蛇皮口袋，满脸疲惫与迷茫。在关爱站免费住了1天后，站长帮他对接了这家包吃住的建筑队。照片是李大哥发第一个月工资（6200元）那天，工友帮他拍的。他笑得很开心，眼睛里有了希望。
          </p>
          
          <div class="flex items-center gap-4 mt-auto">
            <div class="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
              李
            </div>
            <div>
              <p class="font-bold text-slate-800">李大哥 (45岁)</p>
              <p class="text-slate-500 text-sm">云南省昭通市威信县</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. 瀑布流故事卡片 (Gallery Grid) -->
    <section class="max-w-7xl mx-auto px-4">
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <!-- 循环渲染故事卡片 -->
        <div v-for="(moment, index) in moments" :key="index" 
             class="bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col">
          
          <!-- 图片区域 -->
          <div class="relative h-64 overflow-hidden bg-slate-100">
            <!-- 替换此处 src -->
            <img :src="moment.image" :alt="moment.title" 
                 class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            
            <!-- 顶部家乡标签 -->
            <div class="absolute top-4 left-4 bg-black/50 backdrop-blur-md text-white text-xs px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1">
              <MapPin class="w-3 h-3" /> {{ moment.hometown }}
            </div>

            <!-- 底部状态徽章 (根据 type 变色) -->
           
          </div>

          <!-- 内容区域 -->
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="font-bold text-xl text-slate-800 mb-3 line-clamp-2">
              {{ moment.title }}
            </h3>
            
            <p class="text-slate-500 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
              {{ moment.content }}
            </p>

            <!-- 互动与元数据 -->
            <div class="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
              <div class="flex items-center gap-2 text-xs text-slate-400">
                <Calendar class="w-4 h-4" /> {{ moment.date }}
              </div>
              
              <!-- 模拟点赞 -->
              <button class="flex items-center gap-1 text-slate-400 hover:text-red-500 transition-colors group/btn">
                <Heart class="w-5 h-5 group-hover/btn:fill-red-500 transition-colors" /> 
                <span class="text-sm font-medium">{{ moment.likes }}</span>
              </button>
            </div>
          </div>
        </div>

      </div>

      <!-- 加载更多按钮 -->
      <div class="text-center mt-12">
        <button class="bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold py-3 px-8 rounded-full transition-colors inline-flex items-center gap-2">
          加载更多老乡故事 <ArrowDown class="w-4 h-4" />
        </button>
      </div>
    </section>

    <!-- 5. 底部感召区块 (Call to Action) -->
    <section class="max-w-4xl mx-auto px-4 mt-24">
      <div class="bg-emerald-50 border-2 border-emerald-100 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
        <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-200 rounded-full opacity-20 -mr-10 -mt-10"></div>
        <div class="absolute bottom-0 left-0 w-24 h-24 bg-yellow-300 rounded-full opacity-20 -ml-5 -mb-5"></div>
        
        <Camera class="w-12 h-12 text-emerald-600 mx-auto mb-4" />
        <h3 class="text-2xl font-bold text-slate-800 mb-4">下一个笑脸，也许就是你</h3>
        <p class="text-slate-600 mb-8 max-w-lg mx-auto">
          只要勇敢迈出第一步，剩下的交给我们。从车站到食堂，从宿舍到车间，关爱站一路陪你。
        </p>
        <NuxtLink to="/" class="inline-flex items-center gap-2 bg-emerald-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all">
          查看乘车路线，来站里坐坐 <ArrowRight class="w-5 h-5" />
        </NuxtLink>
      </div>
    </section>

  </div>
</template>

<script setup>
import { 
  Camera, MapPin, Calendar, Heart, Quote, ArrowRight, ArrowDown
} from 'lucide-vue-next'

// 模拟的图文故事数据 (您可以根据实际情况替换内容和图片URL)
const moments = [
  {
    type: 'arrival', // arrival, food, work
    image: 'https://images.unsplash.com/photo-1517677129300-07b130802f46?auto=format&fit=crop&q=80&w=800', 
    title: '跨越2200公里的跋涉，终于到了可以歇脚的地方',
    content: '凌晨2点的高铁站有点冷。老王背着陪伴了他五年的编织袋，坐上了站长安排的面包车。到了站里，看到干净的上下铺，他放下了沉重的行李，长长地舒了一口气：“终于不用睡候车室了。”',
    hometown: '普洱市墨江县',
    date: '2024-12-05',
   
  },
  {
    type: 'food',
    image: 'https://images.unsplash.com/photo-1627308595171-d1b5d67129c4?auto=format&fit=crop&q=80&w=800', 
    title: '一碗热腾腾的米线，吃出了老家的味道',
    content: '站里的食堂今天特意做了云南口味的米线。刚来嘉兴两天的小张妹子连吃了两大碗。她说：“出门在外，最怕吃饭吃不习惯，没想到在这里一分钱不花，还能吃得这么对胃口。”',
    hometown: '红河州弥勒市',
    date: '2023-12-02',
    likes: 289
  },
  {
    type: 'work',
    image: 'https://images.unsplash.com/photo-1606836591695-4d58a73eba1e?auto=format&fit=crop&q=80&w=800', 
    title: '穿上新工装，踏实！',
    content: '经过站里的企业对接和防骗培训，这批15名老乡今天集体入职了嘉兴某汽车配件厂。包吃包住，交五险一金。换上蓝色工装的那一刻，大家在工厂大门前留下了这张合影。',
    hometown: '曲靖市宣威市',
    date: '2023-11-28',
    likes: 512
  },
  {
    type: 'arrival',
    image: 'https://images.unsplash.com/photo-1541512416146-368bb159070a?auto=format&fit=crop&q=80&w=800', 
    title: '带着全家的希望出门，幸好遇到了“娘家人”',
    content: '老李夫妻俩第一次来浙江打工，在车站被黑车司机忽悠，差点迷路。拨打我们的求助热线后，工作人员半小时内赶到接走了他们。照片是他们在前台登记入住时，老李擦拭额头汗水的一幕。',
    hometown: '文山州广南县',
    date: '2023-11-20',
    likes: 198
  },
  {
    type: 'work',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', 
    title: '不仅找到了工作，还当上了线长',
    content: '半年前通过服务站入职的赵大姐，因为做事麻利、踏实肯干，今天被提拔为包装车间的线长了！站长回访时抓拍了这张照片，赵大姐特意叮嘱我们：“照片一定要发给我，我要发给老家的丫头看！”',
    hometown: '大理州剑川县',
    date: '2023-11-15',
    likes: 426
  },
  {
    type: 'food',
    image: 'https://images.unsplash.com/photo-1511993226957-cd166aba52d8?auto=format&fit=crop&q=80&w=800', 
    title: '冬日里的围炉夜话',
    content: '晚饭后，几个还不认识的老乡在休息区聊了起来。交流着找工作的经验，也聊着老家的变化。在嘉兴的这个冬天，因为有这样一个温暖的站点，大家的心都热乎乎的。',
    hometown: '保山市腾冲市',
    date: '2023-11-10',
    likes: 275
  }
]
</script>