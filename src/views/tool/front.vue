<script lang="ts" setup>
import { ref } from 'vue'
import {
    createFrontCodeApi,
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
const noRequiredColumns = ['id', 'status', 'tenant_id', 'create_user', 'create_time', 'update_user',  'update_time']
// 不需要表单展示的字段
const noFormColumns = ['id', 'tenant_id', 'create_user', 'create_time', 'update_user', 'update_time']

/**
 * 获取表字段
 */
const getTableColumns = () => {
    getDatabaseTableColumnListApi(databaseForm.value.table).then(e => {
        if (e && e.data) {
            tableColumns.value = e.data.map(item => {
                const result: IDatabaseTableColumn = deepClone(item)
                // 将数据列转换为驼峰命名
                result.columnName = snakeToCamel(result.columnName)
                // 默认值空
                result.defaultValue = ''
                // 除了不需要必填的字段，其他都需要必填
                if (!noRequiredColumns.includes(result.columnName)) {
                    result.requiredStatus = true
                }
                // 列表展示
                result.tableShow = true
                // 默认搜索都不展示
                result.searchShow = false
                // 新增/编辑展示
                if (!noFormColumns.includes(result.columnName)) {
                    result.addShow = true
                    result.editShow = true
                }

                return result
            })
        }
    })
}

/**
 * 移动
 * @param mode 模式 1:上移 2:下移
 * @param index 索引 列表索引
 */
const startMove = (index: number, mode: number) => {
    if (mode === 1) {
        [tableColumns.value[index - 1], tableColumns.value[index]] = [tableColumns.value[index], tableColumns.value[index - 1]]
    } else {
        [tableColumns.value[index + 1], tableColumns.value[index]] = [tableColumns.value[index], tableColumns.value[index + 1]]
    }
}

/**
 * 删除数据
 * @param index 
 */
const del = (index: number) => {
    ElMessageBox.confirm('确认删除?', '系统提示', {
    type: 'warning'
  }).then(() => {
    tableColumns.value.splice(index, 1)
  })
}

/**
 * 生成代码
 */
const createCode = () => {
    // const name = snakeToCamel(databaseForm.value.table)
    const name = snakeToCamel(databaseForm.value.table.split('_').slice(1).join('_'))
    // 去掉第一个_前面的
    const fileName = name
    createFrontCodeApi({
        name,
        fName: name[0].toUpperCase() + name.slice(1),
        fileName,
        folder: moduleName.value,
        projectPath: projectPath.value,
        columns: tableColumns.value.map(item => {
            let type = ''
            switch (item.dataType) {
                case 'int':
                    type = 'number'
                    break
                case 'datetime':
                    type = 'datetimerange'
                    break
                default:
                    type = ''
                    break
            }
            return {
                ...item,
                label: item.columnComment,
                prop: item.columnName,
                type,
                required: item.requiredStatus,
                default: item.defaultValue,
                search: item.searchShow,
                table: item.tableShow,
                edit: item.editShow,
                add: item.addShow
            }
        })
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
                模块名：<el-input style="width: 300px; margin-right: 10px;" v-model.trim="moduleName" placeholder="请输入模块名(你可以理解为上级目录)"></el-input>
                项目路径：<el-input style="width: 300px" v-model.trim="projectPath" placeholder="请输入项目路径"></el-input>
            </el-row>
            <el-table style="margin-top: 16px;" :data="tableColumns">
                <el-table-column type="index" width="70" align="center" label="序号"></el-table-column>
                <el-table-column prop="columnName" align="center" label="字段名称">
                    <template #default="{row}">
                        <el-input style="width: 100%;" placeholder="请输入字段名称" v-model.trim="row.columnName" />
                    </template>
                </el-table-column>
                <el-table-column prop="columnComment" align="center" label="中文名">
                    <template #default="{row}">
                        <el-input style="width: 100%;" placeholder="请输入中文名" v-model.trim="row.columnComment" />
                    </template>
                </el-table-column>
                <el-table-column prop="defaultValue" align="center" label="默认值">
                    <template #default="{row}">
                        <el-input style="width: 100%;" placeholder="默认值" v-model.trim="row.defaultValue" />
                    </template>
                </el-table-column>
                <el-table-column width="80" prop="requiredStatus" align="center" label="必填">
                    <template #default="{row}">
                        <el-checkbox v-model="row.requiredStatus"/>
                    </template>
                </el-table-column>
                <el-table-column width="80" prop="searchShow" align="center" label="搜索">
                    <template #default="{row}">
                        <el-checkbox v-model="row.searchShow"/>
                    </template>
                </el-table-column>
                <el-table-column width="80" prop="tableShow" align="center" label="表格">
                    <template #default="{row}">
                        <el-checkbox v-model="row.tableShow"/>
                    </template>
                </el-table-column>
                <el-table-column width="80" prop="addShow" align="center" label="新增">
                    <template #default="{row}">
                        <el-checkbox v-model="row.addShow"/>
                    </template>
                </el-table-column>
                <el-table-column width="80" prop="editShow" align="center" label="编辑">
                    <template #default="{row}">
                        <el-checkbox v-model="row.editShow"/>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200" align="center">
                    <template #default="{$index}">
                        <el-link
                            class="m-control-btns"
                            type="primary"
                            :underline="false"
                            :disabled="$index === 0"
                            icon="Top"
                            @click="startMove($index, 1)"
                        >
                            上移
                        </el-link>
                        <el-link
                            class="m-control-btns"
                            type="primary"
                            :underline="false"
                            :disabled="$index === tableColumns.length - 1"
                            icon="Bottom"
                            @click="startMove($index, 2)"
                        >
                            下移
                        </el-link>
                        <el-link
                            class="m-control-btns"
                            type="primary"
                            :underline="false"
                            icon="Delete"
                            @click="del($index)"
                        >
                            删除
                        </el-link>
                    </template>
                </el-table-column>
            </el-table>
            <el-row style="margin-top: 10px;" justify="end">
                <el-button @click="createCode" :disabled="!moduleName || !tableColumns.length" type="primary">生成代码</el-button>
            </el-row>
        </el-card>
    </page>
</template>

<style lang="scss" scoped></style>
