import api from "@/request"
import {ISysMenu} from "@/apis/system/menu/types.ts";

/**
 * 树形菜单
 */
export const menuTreeApi = () => api.get<ISysMenu[]>("/admin/menu/tree")

/**
 * 角色菜单树形
 */
export const roleMenuTreeApi = () => api.get<ISysMenu[]>("/admin/menu/roleMenuTree")

/**
 * 创建菜单
 * @param data 
 * @returns 
 */
export const menuCreateApi = (data: Partial<ISysMenu>) => api.postJ("/admin/menu/create", data)

/**
 * 编辑菜单
 * @param data 
 * @returns 
 */
export const menuModifyApi = (data: Partial<ISysMenu>) => api.postJ("/admin/menu/modify", data)

/**
 * 菜单详情
 * @param id 菜单id
 * @returns 
 */
export const menuDetailApi = (id: string) => api.get<ISysMenu>(`/admin/menu/detail/${id}`)

/**
 * 删除菜单
 * @param id 菜单id
 * @returns 
 */
export const menuDelApi = (id: string) => api.get(`/admin/menu/del/${id}`)
