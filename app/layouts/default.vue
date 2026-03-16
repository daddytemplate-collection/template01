<template>
    <NuxtLoadingIndicator :duration="1000" :throttle="0" :height="5"></NuxtLoadingIndicator>
   <HeaderNavbar/>
    <div>
        <slot />
    </div>
    <!-- 页脚 -->
    <footer class="bg-slate-950 text-slate-500 py-8 border-t border-white/5">
        <div class="max-w-7xl flex justify-center items-center gap-10 mx-auto px-4 text-center">
            <p>© 2026 云南省外出务工嘉兴就业服务站 - 公益项目 · 非营利</p>
            <img src="/img/gongyi.svg" alt="公益项目" class="w-10">
        </div>
    </footer>
    <!-- 弹窗遮罩层 -->
    <Teleport to="body">
        <div v-if="isModalOpen" class="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <!-- 遮罩层 (点击关闭) -->
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-md" @click="isModalOpen = false"></div>

            <!-- 对话框主体 -->
            <div
                class="relative bg-white w-full max-w-lg rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

                <!-- 头部：包含标题和明显的关闭图标 -->
                <div class="bg-emerald-600 px-6 py-6 flex justify-between items-center text-white">
                    <div class="flex items-center gap-3">
                        <div class="bg-white/20 p-2 rounded-xl">
                            <Heart class="w-6 h-6 fill-white" />
                        </div>
                        <div>
                            <h3 class="text-xl font-bold">老乡互助申请</h3>
                            <p class="text-emerald-100 text-xs mt-0.5">提供免费食宿与就业指导</p>
                        </div>
                    </div>
                    <!-- 明显的关闭按钮 -->
                    <button @click="isModalOpen = false"
                        class="bg-black/10 hover:bg-black/20 text-white w-10 h-10 rounded-full flex items-center justify-center transition-transform hover:rotate-90">
                        <X class="w-6 h-6" />
                    </button>
                </div>

                <!-- 表单 -->
                <form @submit.prevent="handleSubmit" class="p-6 space-y-5 max-h-[75vh] overflow-y-auto">

                    <!-- 姓名 -->
                    <div class="space-y-1.5">
                        <label class="text-sm font-bold text-slate-700 ml-1">您的姓名</label>
                        <input v-model="form.name" required type="text" placeholder="怎么称呼您？"
                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" />
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <!-- 电话 -->
                        <div class="space-y-1.5">
                            <label class="text-sm font-bold text-slate-700 ml-1">手机号码</label>
                            <input v-model="form.phone" required type="tel" placeholder="重要：联系电话"
                                class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all" />
                        </div>
                        <!-- 下拉选择家乡 -->
                        <!-- 下拉选择家乡 - 自定义样式版 -->
                        <div class="space-y-1.5 relative">
                            <label class="text-sm font-bold text-slate-700 ml-1">来自哪里</label>

                            <!-- 自定义选择器触发按钮 -->
                            <div @click="isDropdownOpen = !isDropdownOpen"
                                class="w-full bg-slate-50 border-2 rounded-2xl px-4 py-3.5 flex items-center justify-between cursor-pointer transition-all"
                                :class="isDropdownOpen ? 'border-emerald-500 bg-white ring-4 ring-emerald-500/10' : 'border-slate-100'">
                                <span :class="form.origin ? 'text-slate-900 font-medium' : 'text-slate-400'">
                                    {{ form.origin || '请选择地区' }}
                                </span>
                                <ChevronDown class="w-5 h-5 text-slate-400 transition-transform duration-300"
                                    :class="isDropdownOpen ? 'rotate-180 text-emerald-500' : ''" />
                            </div>

                            <!-- 自定义下拉列表 -->
                            <Transition enter-active-class="transition duration-200 ease-out"
                                enter-from-class="transform scale-95 opacity-0 -translate-y-2"
                                enter-to-class="transform scale-100 opacity-100 translate-y-0"
                                leave-active-class="transition duration-150 ease-in"
                                leave-from-class="transform scale-100 opacity-100 translate-y-0"
                                leave-to-class="transform scale-95 opacity-0 -translate-y-2">
                                <div v-if="isDropdownOpen"
                                    class="absolute z-[110] left-0 right-0 mt-2 bg-white border border-slate-100 rounded-2xl shadow-2xl py-2 max-h-60 overflow-y-auto custom-scrollbar">
                                    <div v-for="city in yunnanCities" :key="city" @click="selectCity(city)"
                                        class="px-4 py-3 hover:bg-emerald-50 flex items-center justify-between cursor-pointer group transition-colors">
                                        <span class="text-slate-700 group-hover:text-emerald-700"
                                            :class="form.origin === city ? 'text-emerald-600 font-bold' : ''">
                                            {{ city }}
                                        </span>
                                        <Check v-if="form.origin === city" class="w-4 h-4 text-emerald-600" />
                                    </div>
                                </div>
                            </Transition>

                            <!-- 点击外部关闭的透明遮罩（仅在下拉打开时存在） -->
                            <div v-if="isDropdownOpen" @click="isDropdownOpen = false" class="fixed inset-0 z-[105]">
                            </div>
                        </div>
                    </div>

                    <!-- 需求选择 -->
                    <div class="space-y-2.5">
                        <label class="text-sm font-bold text-slate-700 ml-1">您需要的帮助</label>
                        <div class="grid grid-cols-2 gap-3">
                            <label v-for="opt in ['免费住宿', '免费餐食', '寻找工作', '法律援助']" :key="opt"
                                class="relative flex items-center justify-center p-3.5 border-2 rounded-2xl cursor-pointer transition-all active:scale-95"
                                :class="form.needs.includes(opt) ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 bg-slate-50 text-slate-500'">
                                <input type="checkbox" :value="opt" v-model="form.needs" class="hidden" />
                                <span class="text-sm font-bold">{{ opt }}</span>
                            </label>
                        </div>
                    </div>

                    <!-- 说明 -->
                    <div class="space-y-1.5">
                        <label class="text-sm font-bold text-slate-700 ml-1">其他情况说明 (选填)</label>
                        <textarea v-model="form.message" rows="2" placeholder="例如：我刚下火车，随身带了两个孩子..."
                            class="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3.5 focus:bg-white focus:border-emerald-500 outline-none transition-all"></textarea>
                    </div>
                    <!-- 验证码 -->
                    <div class="space-y-1.5">
                        <label class="text-sm font-bold text-slate-700 ml-1">验证码</label>
                        <div class="flex gap-3">
                            <input v-model="captchaInput" required type="text" placeholder="请输入图中文字"
                                class="flex-1 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-3 focus:border-emerald-500 outline-none" />
                            <div @click="fetchCaptcha"
                                class="bg-slate-100 rounded-2xl cursor-pointer overflow-hidden flex items-center justify-center min-w-[120px]"
                                v-html="captchaSvg">
                            </div>
                        </div>
                        <p class="text-[10px] text-slate-400 ml-1">看不清？点击图片刷新</p>
                    </div>
                    <!-- 提交按钮 -->
                    <button :disabled="isSubmitting" type="submit"
                        class="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-xl hover:bg-emerald-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 active:scale-[0.98] shadow-lg shadow-emerald-200">
                        <template v-if="isSubmitting">
                            <Loader2 class="w-6 h-6 animate-spin" />
                            <span>正在发送请求...</span>
                        </template>
                        <template v-else>
                            提交申请
                        </template>
                        <div v-if="isSubmitting" class="absolute inset-0 bg-white/10 animate-pulse"></div>
                    </button>

                    <div class="flex items-center justify-center gap-2 text-slate-400">
                        <MapPin class="w-4 h-4" />
                        <span class="text-xs italic">云南省外出务工嘉兴就业服务站</span>
                    </div>
                </form>
            </div>
        </div>
    </Teleport>
</template>

<script setup>
const toast = useToast();
import { X, Heart, Loader2, MapPin, ChevronDown, Check, ChevronRight } from 'lucide-vue-next';

const isModalOpen = ref(false);
const isSubmitting = ref(false);
const isDropdownOpen = ref(false);
const yunnanCities = [
    "昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市",
    "普洱市", "临沧市", "楚雄州", "红河州", "文山州", "西双版纳州",
    "大理州", "德宏州", "怒江州", "迪庆州"
];

const form = reactive({
    name: '',
    phone: '',
    origin: '',
    needs: [],
    message: ''
});

const selectCity = (city) => {
    form.origin = city;
    isDropdownOpen.value = false;
};

const captchaSvg = ref('');
const captchaInput = ref('');

// --- 函数 1：仅负责获取验证码 ---
const fetchCaptcha = async () => {
    try {
        const data = await $fetch('/api/captcha');
        if (data && data.svg) {
            captchaSvg.value = data.svg;
        }
    } catch (err) {
        console.error('获取验证码失败:', err);
        // 如果获取验证码失败，只给个轻提示，不要刷新自己（防止死循环）
        toast.error('验证码加载失败，请检查网络');
    }
};

// 页面加载时只获取验证码，不提示成功
onMounted(() => fetchCaptcha());

// --- 函数 2：负责提交表单 ---
const handleSubmit = async () => {
    if (isSubmitting.value) return;

    // 校验前端必填项
    if (!form.name || !form.phone || !form.origin) {
        toast.error('请填写完整信息');
        return;
    }

    isSubmitting.value = true;
    try {
        const res = await $fetch('/api/submit', {
            method: 'POST',
            body: { ...form, captcha: captchaInput.value }
        });

        // 【核心修改】：成功提示应该在这里！！
        toast.success('申请提交成功！请保持手机畅通。');
        isModalOpen.value = false; // 关闭弹窗

        // 重置表单
        Object.assign(form, { name: '', phone: '', origin: '', needs: [], message: '' });
        captchaInput.value = '';

    } catch (err) {
        // 如果报错，弹出后端传回的错误信息（比如：验证码错误）
        const errorMsg = err.data?.statusMessage || '提交失败，请稍后再试';
        toast.error(errorMsg);

        // 失败了才需要刷新验证码
        fetchCaptcha();
        captchaInput.value = '';
    } finally {
        isSubmitting.value = false;
    }
};

const isMobileMenuOpen = ref(false); // 控制手机端菜单显示


// 切换手机菜单
const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

// 点击链接后自动关闭菜单
const closeMobileMenu = () => {
    isMobileMenuOpen.value = false;
};
</script>

<style scoped>
/* 美化下拉框滚动条 */
.custom-scrollbar::-webkit-scrollbar {
    width: 6px;
}

.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
    background: #e2e8f0;
    /* slate-200 */
    border-radius: 10px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #cbd5e1;
    /* slate-300 */
}

/* 确保动画更丝滑 */
.animate-in {
    animation: modal-in 0.3s ease-out forwards;
}

@keyframes modal-in {
    from {
        opacity: 0;
        transform: scale(0.9) translateY(20px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}
</style>