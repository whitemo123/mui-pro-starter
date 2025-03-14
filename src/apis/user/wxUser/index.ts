import api from "@/request"
import { IPageRes } from "@/apis/core/types.ts"
import { IWxUserParams, IWxUser } from "./types"

/**
 * 分页列表
 * @param params 查询参数
 */
export const wxUserPageListApi = (params: IWxUserParams) => api.get<IPageRes<IWxUser>>("/admin/wxUser/page", params)

/**
 * 列表
 */
export const wxUserListApi = () => api.get<IWxUser[]>("/admin/wxUser/list")

/**
 * 创建
 * @param data 请求数据
 */
export const wxUserCreateApi = (data: Partial<IWxUser>) => api.postJ("/admin/wxUser/create", data)

/**
 * 编辑
 * @param data 请求数据
 */
export const wxUserModifyApi = (data: Partial<IWxUser>) => api.postJ("/admin/wxUser/modify", data)

/**
 * 详情
 * @param id 主键ID
 */
export const wxUserDetailApi = (id: string) => api.get<IWxUser>("/admin/wxUser/detail/" + id)

/**
 * 删除
 * @param id 主键ID
 */
export const wxUserDelApi = (id: string) => api.get("/admin/wxUser/del/" + id)

/**
 * 导出
 * @param params 查询参数
 */
export const wxUserExportApi = (params: IWxUserParams) => api.get("/admin/wxUser/export", params)
