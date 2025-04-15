import { IPage } from "@/apis/core/types.ts";

// 查询参数
export interface IParamParams extends IPage {

}

export interface IParam {
  // 参数ID
  id: string;
  // 参数名
  paramName: string;
  // 参数键
  paramKey: string;
  // 参数值
  paramValue: string;
  // 备注
  remark: string;
  // 状态
  status: number;
  // 创建人
  createUser: string;
  // 创建时间
  createTime: string;
  // 修改人
  updateUser: string;
  // 修改时间
  updateTime: string;
}
