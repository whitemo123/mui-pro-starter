import api from "@/request";
import type { ILoginData, IUserInfo } from "./types";

/**
 * 登录接口
 * @param data 登录表单
 * @returns
 */
export const loginApi = (data: ILoginData) => api.get<string>('/admin/login', data)

/**
 * 获取用户信息
 * @returns
 */
export const getUserInfoApi = () => api.get<IUserInfo>('/admin/getAccountInfo')

/**
 * 获取菜单列表
 * @returns
 */
export const getMenuApi = () => api.get('/admin/getMenuTree')
