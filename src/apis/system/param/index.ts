import api from "@/request"
import { IPageRes } from "@/apis/core/types.ts"
import { IParamParams, IParam } from "./types"

/**
 * 分页列表
 * @param params 查询参数
 */
export const paramPageListApi = (params: IParamParams) => api.get<IPageRes<IParam>>("/admin/param/page", params)

/**
 * 列表
 */
export const paramListApi = () => api.get<IParam[]>("/admin/param/list")

/**
 * 创建
 * @param data 请求数据
 */
export const paramCreateApi = (data: Partial<IParam>) => api.postJ("/admin/param/create", data)

/**
 * 编辑
 * @param data 请求数据
 */
export const paramModifyApi = (data: Partial<IParam>) => api.postJ("/admin/param/modify", data)

/**
 * 详情
 * @param id 主键ID
 */
export const paramDetailApi = (id: string) => api.get<IParam>("/admin/param/detail/" + id)

/**
 * 删除
 * @param id 主键ID
 */
export const paramDelApi = (id: string) => api.get("/admin/param/del/" + id)

/**
 * 导出
 * @param params 查询参数
 */
export const paramExportApi = (params: IParamParams) => api.get("/admin/param/export", params)
