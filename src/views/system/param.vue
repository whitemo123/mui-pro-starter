<script lang="ts" setup>
import { ref } from 'vue'
// 接口文件
import {
  paramPageListApi,
  paramCreateApi,
  paramModifyApi,
  paramDetailApi,
  paramDelApi,
  paramExportApi
} from '@/apis/system/param'
// 类型文件
import type {
  IParam,
  IParamParams
} from '@/apis/system/param/types.ts'

import { CrudInstance, ICrudOption } from "m-eleplus-crud";
import { deepClone } from "@/utils/util.ts";
import { ElMessage } from "element-plus";

// crud ref
const crudRef = ref<CrudInstance>()
// 查询条件
const query = ref<IParamParams>({
  page: 1,
  limit: 10
})
// 表单数据
const modelForm = ref<Partial<IParam>>({})
// 列表数据
const tableData = ref<IParam[]>([])
// 列表总条数
const tableTotal = ref(0)
// 列表加载状态
const tableLoading = ref(false)

// crud配置
const crudOption: ICrudOption = {
  height: "auto",
  column: [
    {
      label: "ID",
      prop: "id",
      align: "left",
      editHide: true,
      addHide: true,
    },
    {
      label: "参数名",
      prop: "paramName",
      align: "center",
      formRules: [
        { required: true, message: "参数名不能为空", trigger: "blur" }
      ],
      search: true,
    },
    {
      label: "参数键",
      prop: "paramKey",
      align: "center",
      formRules: [
        { required: true, message: "参数键不能为空", trigger: "blur" }
      ],
      editHide: true,
      search: true,
    },
    {
      label: "参数值",
      prop: "paramValue",
      align: "center",
      formRules: [
        { required: true, message: "参数值不能为空", trigger: "blur" }
      ],
    },
    {
      label: "备注",
      prop: "remark",
      align: "center",
      overHidden: true,
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      search: true,
      type: "select",
      width: 100,
      addHide: true,
      dicData: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 2 }
      ],
    },
    {
      label: "创建人",
      prop: "createUser",
      align: "center",
      hide: true,
      editHide: true,
      addHide: true,
    },
    {
      label: "创建时间",
      prop: "createTime",
      align: "center",
      hide: true,
      editHide: true,
      addHide: true,
    },
    {
      label: "修改人",
      prop: "updateUser",
      align: "center",
      hide: true,
      editHide: true,
      addHide: true,
    },
    {
      label: "修改时间",
      prop: "updateTime",
      align: "center",
      hide: true,
      editHide: true,
      addHide: true,
    },
  ]
}

// 查询列表
const getList = () => {
  tableLoading.value = true

  const params: IParamParams = deepClone(query.value)

  paramPageListApi(params).then(e => {
    if (e && e.data) {
      tableTotal.value = e.data.total
      tableData.value = e.data.list
      tableLoading.value = false
    }
  })
}

// 保存
const rowSave = (form: IParam, done: () => void, loading: () => void) => {
  paramCreateApi(form).then(e => {
    if (e && e.data) {
      ElMessage.success("操作成功!")
      getList()
      done()
    }
  }).finally(() => {
    setTimeout(() => {
      loading()
    }, 500)
  })
}

// 打开编辑
const openEdit = (row: IParam, index: number) => {
  paramDetailApi(row.id).then(e => {
    if (e && e.data) {
      crudRef.value?.rowEdit(e.data, index)
    }
  })
}

// 编辑
const rowEdit = (form: IParam, done: () => void, loading: () => void) => {
  paramModifyApi(form).then(e => {
    if (e && e.data) {
      ElMessage.success("操作成功!")
      getList()
      done()
    }
  }).finally(() => {
    setTimeout(() => {
      loading()
    }, 500)
  })
}

// 删除
const rowDel = (row: IParam) => {
  paramDelApi(row.id).then(e => {
    if (e) {
      ElMessage.success("操作成功!")
      getList()
    }
  })
}

getList()
</script>

<template>
  <page>
    <m-crud
        ref="crudRef"
        v-model="modelForm"
        v-model:search="query"
        :option="crudOption"
        :data="tableData"
        :total="tableTotal"
        :loading="tableLoading"
        @row-save="rowSave"
        @row-edit="rowEdit"
        @row-del="rowDel"
        @search="getList"
        @reset="getList"
    >
      <template #editBtn="{row, $index}">
        <el-link
            class="m-control-btns"
            type="primary"
            :underline="false"
            icon="Edit"
            @click="openEdit(row, $index)"
        >
          编辑
        </el-link>
      </template>
    </m-crud>
  </page>
</template>
