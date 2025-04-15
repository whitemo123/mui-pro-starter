import api from  '@/request'
import {IPageRes} from "@/apis/core/types.ts";
import {ISysUser, ISysUserParams} from "@/apis/system/user/types.ts";

/**
 * 分页列表
 * @param params
 */
export const sysUserPageListApi = (params: ISysUserParams) => api.get<IPageRes<ISysUser>>("/admin/user/page", params)
/**
 * 创建
 * @param data
 */
export const sysUserCreateApi = (data: Partial<ISysUser>) => api.postJ("/admin/user/create", data)
/**
 * 修改
 * @param data
 */
export const sysUserModifyApi = (data: Partial<ISysUser>) => api.postJ("/admin/user/modify", data)
/**
 * 详情
 * @param id
 */
export const sysUserDetailApi = (id: string) => api.get<ISysUser>("/admin/user/detail/" + id)

/**
 * 重置密码
 * @param id 用户id
 * @returns
 */
export const sysUserResetPwdApi = (id: string) => api.get("/admin/user/reset/" + id)
