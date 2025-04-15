import api from "@/request"
import { IPageRes } from "@/apis/core/types.ts"
import { IDictTypeParams, IDictType, IDictData, IDictDataParams } from "./types"

/**
 * 分页列表
 * @param params 查询参数
 */
export const dictTypePageListApi = (params: IDictTypeParams) => api.get<IPageRes<IDictType>>("/admin/dictType/page", params)

/**
 * 列表
 */
export const dictTypeListApi = () => api.get<IDictType[]>("/admin/dictType/list")

/**
 * 创建
 * @param data 请求数据
 */
export const dictTypeCreateApi = (data: Partial<IDictType>) => api.postJ("/admin/dictType/create", data)

/**
 * 编辑
 * @param data 请求数据
 */
export const dictTypeModifyApi = (data: Partial<IDictType>) => api.postJ("/admin/dictType/modify", data)

/**
 * 详情
 * @param id 主键ID
 */
export const dictTypeDetailApi = (id: string) => api.get<IDictType>("/admin/dictType/detail/" + id)

/**
 * 删除
 * @param id 主键ID
 */
export const dictTypeDelApi = (id: string) => api.get("/admin/dictType/del/" + id)

/**
 * 导出
 * @param params 查询参数
 */
export const dictTypeExportApi = (params: IDictTypeParams) => api.get("/admin/dictType/export", params)

/**
 * 分页列表
 * @param params 查询参数
 */
export const dictDataPageListApi = (params: IDictDataParams) => api.get<IPageRes<IDictData>>("/admin/dictData/page", params)

/**
 * 创建
 * @param data 请求数据 
 * @returns 
 */
export const dictDataCreateApi = (data: Partial<IDictData>) => api.postJ("/admin/dictData/create", data)

/**
 * 修改
 * @param data 请求数据 
 * @returns 
 */
export const dictDataModifyApi = (data: Partial<IDictData>) => api.postJ("/admin/dictData/modify", data)

/**
 * 删除
 * @param id 字典数据ID 
 * @returns 
 */
export const dictDataDelApi = (id: string) => api.get("/admin/dictData/del/" + id)

/**
 * 获取字典详情
 * @param key 字典key
 * @returns 
 */
export const dictDetailApi = (key: string) => api.get("/admin/dictData/detail/" + key) 
