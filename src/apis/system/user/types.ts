import {IPage} from "@/apis/core/types.ts";

export interface ISysUserParams extends IPage {
	user?: string
	createTime?: string[]
	createTimeStart?: string
	createTimeEnd?: string
}

export interface ISysUser {
	account: string;
	password: string;
	name: string;
	avatar: string;
	id: string;
	tenantId: string;
	status: number;
	createUser: string;
	updateUser: string;
	createTime: string;
	updateTime: string;
}