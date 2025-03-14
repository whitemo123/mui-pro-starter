import api from "@/request";
import { IDatabaseTable, IDatabaseTableColumn } from "./types";

/**
 * 获取数据库表列表
 * @returns 
 */
export const getDatabaseTableListApi = () => api.get<IDatabaseTable[]>('/admin/tool/dataBaseTableList')
/**
 * 获取数据库表字段列表
 * @param tableName 表名
 * @returns 
 */
export const getDatabaseTableColumnListApi = (tableName: string) => api.get<IDatabaseTableColumn[]>(`/admin/tool/tableColumnList`, {name: tableName})

/**
 * 生成前端代码
 * @param data 模板数据
 * @returns 
 */
export const createFrontCodeApi = (data: any) => api.postJ("/admin/tool/createFrontBasicCode", data)
