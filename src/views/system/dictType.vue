<script lang="ts" setup>
import { ref } from 'vue'
// 接口文件
import {
  dictTypePageListApi,
  dictTypeCreateApi,
  dictTypeModifyApi,
  dictTypeDetailApi,
  dictTypeDelApi,
  dictDataPageListApi,
  dictDataCreateApi,
  dictDataModifyApi,
  dictDataDelApi,
  dictDetailApi
} from '@/apis/system/dictType'
// 类型文件
import type {
  IDictType,
  IDictTypeParams,
  IDictData,
  IDictDataParams
} from '@/apis/system/dictType/types.ts'

import { CrudInstance, ICrudOption } from "m-eleplus-crud";
import { deepClone } from "@/utils/util.ts";
import { ElMessage } from "element-plus";
import { validatePositiveInteger } from '@/constants/validator';

// crud ref
const crudRef = ref<CrudInstance>()
// 查询条件
const query = ref<IDictTypeParams>({
  page: 1,
  limit: 10
})
// 表单数据
const modelForm = ref<Partial<IDictType>>({})
// 列表数据
const tableData = ref<IDictType[]>([])
// 列表总条数
const tableTotal = ref(0)
// 列表加载状态
const tableLoading = ref(false)

// crud配置
const crudOption: ICrudOption = {
  height: "auto",
  formLabelWidth: '100px',
  column: [
    {
      label: "ID",
      prop: "id",
      align: "center",
      editHide: true,
      addHide: true,
    },
    {
      label: "字典名",
      prop: "dictName",
      align: "center",
      search: true,
      maxlength: 20,
      formRules: [
        { required: true, message: "字典名不能为空", trigger: "blur" }
      ],
    },
    {
      label: "字典编号",
      prop: "dictType",
      align: "center",
      search: true,
      maxlength: 20,
      formRules: [
        { required: true, message: "字典编号不能为空", trigger: "blur" }
      ],
    },
    {
      label: "排序",
      prop: "sort",
      align: "center",
      formRules: [
        { required: true, message: "排序不能为空", trigger: "blur" },
        { validator: validatePositiveInteger, trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (parseInt(value) > 99) {
              callback(new Error("排序不能大于99"))
            } else {
              callback()
            }
          },
          trigger: "blur"
        }
      ],
    },
    {
      label: "字典备注",
      prop: "remark",
      type: "textarea",
      align: "center",
      maxlength: 100,
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      addHide: true,
      search: true,
      type: "select",
      dicData: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 2 }
      ]
    },
  ]
}

// 字典值弹窗
const dictDataDialog = ref(false)
// dictData crud ref
const dictDataCrudRef = ref<CrudInstance>()
// 查询条件
const dictDataQuery = ref<IDictDataParams>({
  page: 1,
  limit: 10,
  dictTypeId: ""
})
// 表单数据
const dictDataModelForm = ref<Partial<IDictData>>({})
// 列表数据
const dictDataTableData = ref<IDictData[]>([])
// 列表总条数
const dictDataTableTotal = ref(0)
// 列表加载状态
const dictDataTableLoading = ref(false)

// crud配置
const dictDataCrudOption: ICrudOption = {
  formLabelWidth: '100px',
  column: [
    {
      label: "ID",
      prop: "id",
      align: "center",
      editHide: true,
      addHide: true,
      width: 180
    },
    {
      label: "字典标签",
      prop: "dictLabel",
      align: "center",
      search: true,
      maxlength: 10,
      formRules: [
        { required: true, message: "字典标签不能为空", trigger: "blur" }
      ],
    },
    {
      label: "字典值",
      prop: "dictValue",
      align: "center",
      search: true,
      maxlength: 200,
      formRules: [
        { required: true, message: "字典值不能为空", trigger: "blur" }
      ],
    },
    {
      label: "排序",
      prop: "sort",
      align: "center",
      formRules: [
        { required: true, message: "排序不能为空", trigger: "blur" },
        { validator: validatePositiveInteger, trigger: "blur" },
        {
          validator: (rule, value, callback) => {
            if (parseInt(value) > 99) {
              callback(new Error("排序不能大于99"))
            } else {
              callback()
            }
          },
          trigger: "blur"
        }
      ],
    },
    {
      label: "字典备注",
      prop: "remark",
      align: "center",
    }
  ]
}

// 查询列表
const getList = () => {
  tableLoading.value = true

  const params: IDictTypeParams = deepClone(query.value)

  dictTypePageListApi(params).then(e => {
    if (e && e.data) {
      tableTotal.value = e.data.total
      tableData.value = e.data.list
      tableLoading.value = false
    }
  })
}

// 保存
const rowSave = (form: IDictType, done: () => void, loading: () => void) => {
  const data: IDictType = deepClone(form)
  data.sort = parseInt(String(data.sort) || '')
  dictTypeCreateApi(data).then(e => {
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
const openEdit = (row: IDictType, index: number) => {
  dictTypeDetailApi(row.id).then(e => {
    if (e && e.data) {
      crudRef.value?.rowEdit(e.data, index)
    }
  })
}

// 编辑
const rowEdit = (form: IDictType, done: () => void, loading: () => void) => {
  const data: IDictType = deepClone(form)
  data.sort = parseInt(String(data.sort) || '')
  dictTypeModifyApi(data).then(e => {
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
const rowDel = (row: IDictType) => {
  dictTypeDelApi(row.id).then(e => {
    if (e) {
      ElMessage.success("操作成功!")
      getList()
    }
  })
}

/**
 * 获取字典数据列表
 */
const getDictDataList = () => {
  return new Promise(resolve => {
    dictDataTableLoading.value = true

    dictDataPageListApi(dictDataQuery.value).then(e => {
      if (e && e.data) {
        dictDataTableTotal.value = e.data.total
        dictDataTableData.value = e.data.list
        dictDataTableLoading.value = false
        resolve(e.data.list)
      }
    }).catch(() => {
      resolve([])
    })
  })
}

/**
 * 打开字典数据弹窗
 * @param row 字典类型数据
 */
const openDictDataDialog = (row: IDictType) => {
  dictDataQuery.value = {
    page: 1,
    limit: 10,
    dictTypeId: row.id
  }
  getDictDataList()
  dictDataDialog.value = true
}

/**
 * 字典数据确认
 * @param done
 * @param loading
 */
const dictDataSave = (form: IDictData, done: () => void, loading: () => void) => {
  form.dictTypeId = dictDataQuery.value.dictTypeId
  form.sort = Number(form.sort)
  dictDataCreateApi(form).then(e => {
    if (e && e.data) {
      ElMessage.success("操作成功!")
      getDictDataList()
      done()
    }
  }).finally(() => {
    setTimeout(() => {
      loading()
    }, 500)
  })
}

/**
 * 字典数据修改
 * @param done
 * @param loading
 */
const dictDataModify = (form: IDictData, done: () => void, loading: () => void) => {
  form.dictTypeId = dictDataQuery.value.dictTypeId
  form.sort = Number(form.sort)
  dictDataModifyApi(form).then(e => {
    if (e && e.data) {
      ElMessage.success("操作成功!")
      getDictDataList()
      done()
    }
  }).finally(() => {
    setTimeout(() => {
      loading()
    }, 500)
  })
}

/**
 * 删除字典数据
 * @param row 字典数据
 */
const dictDataDel = (row: IDictData) => {
  dictDataDelApi(row.id).then(e => {
    if (e && e.data) {
      ElMessage.success("操作成功!")
      getDictDataList()
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
      <template #dictType="{row}">
        <el-link
            type="primary"
            :underline="false"
            @click="openDictDataDialog(row)"
        >
          {{ row.dictType }}
        </el-link>
      </template>
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
    <m-dialog
      v-model="dictDataDialog"
      title="字典数据"
      width="1200px"
      :saveBtn="false"
      :cancelBtn="false"
    >
      <m-crud
        ref="dictDataCrudRef"
        v-model="dictDataModelForm"
        v-model:search="dictDataQuery"
        :option="dictDataCrudOption"
        :data="dictDataTableData"
        :total="dictDataTableTotal"
        :loading="dictDataTableLoading"
        @row-save="dictDataSave"
        @row-edit="dictDataModify"
        @row-del="dictDataDel"
        @search="getDictDataList"
        @reset="getDictDataList"
      >
      </m-crud>
    </m-dialog>
  </page>
</template>
