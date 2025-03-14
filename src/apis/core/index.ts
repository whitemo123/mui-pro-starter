import api from "@/request";
import type { ILoginData, IUserInfo } from "./types";

/**
 * 登录接口
 * @param data 登录表单
 * @returns
 */
export const loginApi = (data: ILoginData) => api.postJ<{token: string}>('/admin/auth/login', data)

/**
 * 获取验证码
 * @returns 
 */
export const captchaApi = () => api.get('/admin/auth/captcha')

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => api.get<IUserInfo>('/admin/auth/userInfo')

/**
 * 获取菜单列表
 * @returns
 */
export const getMenuApi = () => api.get('/admin/auth/menuTree')

/**
 * 退出登录
 * @returns 
 */
export const logoutApi = () => api.postJ('/admin/auth/logout')
