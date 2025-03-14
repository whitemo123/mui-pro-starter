
export interface ISysMenu {
	id: string;
	parentId: string;
	name: string;
	sort: number;
	type: number;
	icon: string;
	path: string;
	alias: string;
	status: number;
	keep: number;
	children: ISysMenu[];
}