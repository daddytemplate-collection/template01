import nodemailer from 'nodemailer';

export default defineEventHandler(async (event) => {
  if (event.method !== 'POST') {
    throw createError({ statusCode: 405, message: '不支持此方法' });
  }

  const config = useRuntimeConfig();
  const body = await readBody(event);
  const { name, phone, origin, needs, message, captcha } = body;

  // 1. 验证码校验
  const savedCaptcha = getCookie(event, 'captcha_text');
  if (!captcha || captcha.toLowerCase() !== savedCaptcha) {
    throw createError({ statusCode: 400, statusMessage: '验证码错误或已过期' });
  }
  // 校验成功后立即清除 Cookie，防止重复使用
  deleteCookie(event, 'captcha_text');

  // 2. 基础校验
  if (!name || !phone ) {
    throw createError({ statusCode: 400, statusMessage: '请填写完整信息' });
  }
  console.log('--- 环境变量调试 ---');
  console.log('User exists:', !!config.emailUser);
  console.log('Pass exists:', !!config.emailPass);

  // 3. 配置邮件
  const transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true,
    auth: {
      user: config.emailUser, // .env 中的 QQ 邮箱
      pass: config.emailPass  // .env 中的授权码
    },
  });

  const mailOptions = {
    from: `"滇籍劳务求助" <${config.emailUser}>`,
    to: "zxm@hidaddy.com.cn", 
    subject: `【新求助申请】来自${origin}的${name}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 15px;">
        <h2 style="color: #059669;">收到新的劳务工友求助申请</h2>
        <p><strong>姓名：</strong> ${name}</p>
        <p><strong>电话：</strong> <a href="tel:${phone}">${phone}</a></p>
        <p><strong>家乡：</strong> ${origin}</p>
        <p><strong>需求：</strong> ${Array.isArray(needs) ? needs.join('、') : needs}</p>
        <p><strong>具体情况：</strong> ${message || '无'}</p>
        <hr style="border: none; border-top: 1px solid #eee;" />
        <p style="font-size: 12px; color: #999;">此邮件由“滇籍劳务关爱站”系统自动发送</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('SMTP Error:', error);
    throw createError({ statusCode: 500, statusMessage: '邮件发送失败' });
  }
});