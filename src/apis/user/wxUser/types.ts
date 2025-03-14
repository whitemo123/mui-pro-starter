import { IPage } from "@/apis/core/types.ts";

// 查询参数
export interface IWxUserParams extends IPage {

}

export interface IWxUser {
  // ID
  id: string;
  // 微信昵称
  nickname: string;
  // 微信头像
  avatar: string;
  // 性别：1=男 2=女
  gender: number;
  // 市
  city: string;
  // 省
  province: string;
  // 国家
  country: string;
  // 状态
  status: number;
}
