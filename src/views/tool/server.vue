<script lang="ts" setup>
import { ref } from 'vue'
import {
    createFrontCodeApi,
    createServerCodeApi,
    getDatabaseTableColumnListApi,
    getDatabaseTableListApi
} from '@/apis/tool'
import { IDatabaseTable, IDatabaseTableColumn } from '@/apis/tool/types'
import { deepClone } from '@/utils/util'
import { ElMessage, ElMessageBox } from 'element-plus'
import { snakeToCamel } from '@/utils/string'

// 数据库数据表
const databaseTables = ref<IDatabaseTable[]>([])

// 数据库表单
const databaseForm = ref({
    table: '',
})

// 模块名
const moduleName = ref('')
// 项目路径
const projectPath = ref('')

// 数据库表字段
const tableColumns = ref<IDatabaseTableColumn[]>([])

// 不需要必填的字段
const noFormColumns = ['id', 'status', 'tenant_id', 'create_user', 'create_time', 'update_user',  'update_time']

/**
 * 获取表字段
 */
const getTableColumns = () => {
    getDatabaseTableColumnListApi(databaseForm.value.table).then(e => {
        if (e && e.data) {
            tableColumns.value = e.data.map(item => {
                const result: IDatabaseTableColumn = deepClone(item)
                return result
            })
        }
    })
}


/**
 * 生成代码
 */
const createCode = () => {
    // const name = snakeToCamel(databaseForm.value.table)
    const dealTableName: string = databaseForm.value.table.split('_').slice(1).join('_') // t_wx_user => wx_user
    const name = snakeToCamel(dealTableName)
    const tableName = snakeToCamel(databaseForm.value.table)

    const tableAttrs = []
    for (let i = 0; i < tableColumns.value.length; i++) {
        const item = tableColumns.value[i]
        if (!noFormColumns.includes(item.columnName)) {
            const columnName = snakeToCamel(item.columnName)
            let type = 'string'
            switch (item.dataType) {
                case "varchar":
                    type = "string";
                    break;
                case "bigint":
                    type = "int64";
                    break;
                case "int":
                    type = "int";
                    break;
                case "datetime":
                    type = "LocalTime";
                    break;
            }
            tableAttrs.push({
                sourceColumnName: item.columnName,
                columnName: columnName,
                columnComment: item.columnComment,
                fColumnName: columnName[0].toUpperCase() + columnName.slice(1),
                dataType: type
            })
        }
    }

    createServerCodeApi({
        name,
        tfName: tableName[0].toUpperCase() + tableName.slice(1),
        fName: name[0].toUpperCase() + name.slice(1),
        // @ts-ignore
        folder: dealTableName.replaceAll('_', '-'),
        fileName: dealTableName,
        projectPath: projectPath.value,
        tableAttrs,
    }).then(e => {
        if (e && e.data) {
            ElMessage.success('操作成功!')
        }
    })
}

/**
 * 获取数据库表列表
 */
getDatabaseTableListApi().then(e => {
    if (e && e.data) {
        databaseTables.value = e.data
    }
})
</script>

<template>
    <page>
        <el-card shadow="never">
            <el-row style="margin-bottom: 16px;">数据库配置</el-row>
            <el-form :model="databaseForm" :inline="true" >
                <el-form-item label="数据表" prop="table">
                    <el-select filterable style="width: 300px;" v-model="databaseForm.table" placeholder="请选择数据表">
                        <el-option
                            v-for="(item, index) in databaseTables"
                            :key="index"
                            :label="item.tableComment"
                            :value="item.tableName"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button @click="getTableColumns" :disabled="!databaseForm.table" type="primary">使用此表</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card style="margin-top: 16px;" shadow="never">
            <el-row align="middle">
                项目路径：<el-input style="width: 300px" v-model.trim="projectPath" placeholder="请输入项目路径"></el-input>
            </el-row>
            <el-row style="margin-top: 10px;" justify="end">
                <el-button @click="createCode" :disabled="!projectPath || !tableColumns.length" type="primary">生成代码</el-button>
            </el-row>
        </el-card>
    </page>
</template>

<style lang="scss" scoped></style>
