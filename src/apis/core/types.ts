/**
 * 登录表单数据
 */
export interface ILoginData {
  // 账号
  account: string;
  // 密码
  password: string;
  // 验证码
  captcha: string;
  // 验证码ID
  captchaId: string;
}

/**
 * 用户
 */
export interface IUserInfo {
  // 姓名
  name: string;
  // 头像
  avatar: string;
  // 用户id
  id: string;
}
