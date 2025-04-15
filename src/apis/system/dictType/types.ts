import { IPage } from "@/apis/core/types.ts";

// 查询参数
export interface IDictTypeParams extends IPage {

}

export interface IDictType {
  // 字典ID
  id: string;
  // 字典名
  dictName: string;
  // 字典编号
  dictType: string;
  // 字典备注
  remark: string;
  // 状态
  status: number;
  // 排序
  sort: number;
}


// 查询参数
export interface IDictDataParams extends IPage {
  // 字典类型ID
  dictTypeId: string;
}

export interface IDictData {
  // 字典数据ID
  id: string;
  // 字典名
  dictLabel: string;
  // 字典值
  dictValue: string;
  // 排序
  sort: number;
  // 备注
  remark: string;
  // 字典类型ID
  dictTypeId: string;
}
