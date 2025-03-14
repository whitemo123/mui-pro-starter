import api from '@/request'
import {ISysRole, ISysRoleParams} from "@/apis/system/role/types.ts";
import {IPageRes} from "@/apis/core/types.ts";

/**
 * 分页列表
 * @param params
 */
export const sysRolePageListApi = (params: ISysRoleParams) => api.get<IPageRes<ISysRole>>("/admin/role/page", params)

/**
 * 创建
 * @param data
 */
export const sysRoleCreateApi = (data: Partial<ISysRole>) => api.postJ("/admin/role/create", data)

/**
 * 编辑
 * @param data
 */
export const sysRoleModifyApi = (data: Partial<ISysRole>) => api.postJ("/admin/role/modify", data)

/**
 * 详情
 * @param id
 */
export const sysRoleDetailApi = (id: string) => api.get<ISysRole>("/admin/role/detail/" + id)
