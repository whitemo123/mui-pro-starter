<script lang="ts" setup>
import { ref } from 'vue'
// 接口文件
import {
  wxUserPageListApi,
  wxUserCreateApi,
  wxUserModifyApi,
  wxUserDetailApi,
  wxUserDelApi,
  wxUserExportApi
} from '@/apis/user/wxUser'
// 类型文件
import type {
  IWxUser,
  IWxUserParams
} from '@/apis/user/wxUser/types.ts'

import { CrudInstance, ICrudOption } from "m-eleplus-crud";
import { deepClone } from "@/utils/util.ts";
import { ElMessage } from "element-plus";

// crud ref
const crudRef = ref<CrudInstance>()
// 查询条件
const query = ref<IWxUserParams>({
  page: 1,
  limit: 10
})
// 表单数据
const modelForm = ref<Partial<IWxUser>>({})
// 列表数据
const tableData = ref<IWxUser[]>([])
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
      align: "center",
      editHide: true,
      addHide: true,
    },
    {
      label: "微信昵称",
      prop: "nickname",
      align: "center",
      formRules: [
        { required: true, message: "微信昵称不能为空", trigger: "blur" }
      ],
    },
    {
      label: "微信头像",
      prop: "avatar",
      align: "center",
      formRules: [
        { required: true, message: "微信头像不能为空", trigger: "blur" }
      ],
    },
    {
      label: "性别：1=男 2=女",
      prop: "gender",
      align: "center",
      formRules: [
        { required: true, message: "性别：1=男 2=女不能为空", trigger: "blur" }
      ],
    },
    {
      label: "市",
      prop: "city",
      align: "center",
      formRules: [
        { required: true, message: "市不能为空", trigger: "blur" }
      ],
    },
    {
      label: "省",
      prop: "province",
      align: "center",
      formRules: [
        { required: true, message: "省不能为空", trigger: "blur" }
      ],
    },
    {
      label: "国家",
      prop: "country",
      align: "center",
      formRules: [
        { required: true, message: "国家不能为空", trigger: "blur" }
      ],
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
    },
  ]
}

// 查询列表
const getList = () => {
  tableLoading.value = true

  const params: IWxUserParams = deepClone(query.value)
 
  wxUserPageListApi(params).then(e => {
    if (e && e.data) {
      tableTotal.value = e.data.total
      tableData.value = e.data.list
      tableLoading.value = false
    }
  })
}

// 保存
const rowSave = (form: IWxUser, done: () => void, loading: () => void) => {
  wxUserCreateApi(form).then(e => {
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
const openEdit = (row: IWxUser, index: number) => {
  wxUserDetailApi(row.id).then(e => {
    if (e && e.data) {
      crudRef.value?.rowEdit(e.data, index)
    }
  })
}

// 编辑
const rowEdit = (form: IWxUser, done: () => void, loading: () => void) => {
  wxUserModifyApi(form).then(e => {
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
const rowDel = (row: IWxUser) => {
  wxUserDelApi(row.id).then(e => {
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
