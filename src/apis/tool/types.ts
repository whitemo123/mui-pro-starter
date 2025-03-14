
export interface IDatabaseTable {
    // 数据表名
    tableName: string;
    // 数据表注释
    tableComment: string;
}

export interface IDatabaseTableColumn {
    dataType: string
    columnName: string
    dataTypeLong: string
    columnComment: string
    primaryKey: boolean
    // ====== 拓展字段 ======
    // 默认值
    defaultValue: string
    // 是否必填
    requiredStatus: boolean
    // 列表是否展示
    tableShow: boolean
    // 搜索是否展示
    searchShow: boolean
    // 新增是否展示
    addShow: boolean
    // 编辑是否展示
    editShow: boolean

}
