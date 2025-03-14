import {IPage} from "@/apis/core/types.ts";

export interface ISysRoleParams extends IPage {
    role?: string
    createTime?: string[]
    createTimeStart?: string
    createTimeEnd?: string
}

export interface ISysRole {
	id: string;
	tenantId: string;
	status: number;
	createUser: string;
	updateUser: string;
	createTime: string;
	updateTime: string;
	roleName: string;
	menuIdList?: string[]
}