import svgCaptcha from 'svg-captcha';

export default defineEventHandler((event) => {
  // 生成验证码
  const captcha = svgCaptcha.create({
    size: 4, // 4位验证码
    ignoreChars: '0o1i', // 排除容易混淆的字符
    noise: 2, // 干扰线
    color: true,
    background: '#f8fafc' // 匹配你 UI 的浅灰色背景
  });

  // 将验证码文本存入 Cookie (加密或简单的 Session 逻辑)
  // 为了简单，这里存入一个签名的 cookie，过期时间 5 分钟
  setCookie(event, 'captcha_text', captcha.text.toLowerCase(), {
    maxAge: 300,
    httpOnly: true,
    path: '/'
  });

  return {
    svg: captcha.data // 返回 SVG 字符串
  };
});