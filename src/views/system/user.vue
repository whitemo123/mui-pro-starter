<script lang="ts" setup>
import { ref } from 'vue'

import {
  sysUserCreateApi, sysUserDetailApi, sysUserModifyApi,
  sysUserPageListApi
} from '@/apis/system/user'

import type {
  ISysUser,
  ISysUserParams
} from '@/apis/system/user/types.ts'
import {CrudInstance, ICrudOption} from "m-eleplus-crud";
import {deepClone} from "@/utils/util.ts";
import {ElMessage} from "element-plus";

// crud ref
const crudRef = ref<CrudInstance>()
// 查询条件
const query = ref<ISysUserParams>({
  page: 1,
  limit: 10
})
// 表单数据
const modelForm = ref<Partial<ISysUser>>({})
// 列表数据
const tableData = ref<ISysUser[]>([])
// 列表总条数
const tableTotal = ref(0)
// 列表加载状态
const tableLoading = ref(false)

// crud配置
const crudOption: ICrudOption = {
  height: "auto",
  delBtn: false,
  column: [
    {
      label: "ID",
      prop: "id",
      align: "left",
      width: 180,
      addHide: true,
      editHide: true
    },
    // {
    //   label: "头像",
    //   prop: "avatar",
    //   align: "center"
    // },
    {
      label: "用户",
      prop: "user",
      searchPlaceholder: "ID/用户名/昵称",
      search: true,
      hide: true,
      addHide: true,
      editHide: true
    },
    {
      label: "用户名",
      prop: "account",
      align: "center",
      editHide: true,
      maxlength: 10,
      formRules: [
        { required: true, message: "请输入用户名", trigger: "blur" },
        { min: 4, max: 10, message: "长度在 4 到 20 个字符", trigger: "blur" },
        { pattern: /^[a-zA-Z0-9]+$/, message: "只能输入字母、数字", trigger: "blur" }
      ]
    },
    {
      label: "昵称",
      prop: "name",
      align: "center",
      maxlength: 10,
      formRules: [
        { required: true, message: "请输入昵称", trigger: "blur" }
      ]
    },
    {
      label: "密码",
      prop: "password",
      type: "password",
      hide: true,
      editHide: true,
      formRules: [
        { required: true, message: "请输入密码", trigger: "blur" },
        { min: 6, max: 20, message: "长度在 6 到 20 个字符", trigger: "blur" }
      ]
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      type: "select",
      addHide: true,
      search: true,
      dicData: [
        { label: "正常", value: 1 },
        { label: "禁用", value: 2 }
      ]
    },
    {
      label: "角色",
      prop: "roleIdList",
      hide: true,
      type: "select",
      multiple: true,
      dicUrl: "/admin/role/list?status=1",
      dicFormatter: (res: any) => ({list: res.data, label: '{roleName}', value: 'id'}),
      formRules: [
        { required: true, message: "请选择角色", trigger: "blur" }
      ]
    },
    {
      label: "创建时间",
      prop: "createTime",
      type: "datetimerange",
      align: "center",
      search: true,
      addHide: true,
      editHide: true
    }
  ]
}

// 查询列表
const getList = () => {
  tableLoading.value = true

  const params: ISysUserParams = deepClone(query.value)
  if (params.createTime && params.createTime.length === 2) {
    params.createTimeStart = params.createTime[0]
    params.createTimeEnd = params.createTime[1]
  } else {
    params.createTimeStart = ''
    params.createTimeEnd = ''
  }
  delete params.createTime

  sysUserPageListApi(params).then(e => {
    if (e && e.data) {
      tableTotal.value = e.data.total
      tableData.value = e.data.list
      tableLoading.value = false
    }
  })
}

// 保存
const rowSave = (form: ISysUser, done: () => void, loading: () => void) => {
  sysUserCreateApi(form).then(e => {
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
const openEdit = (row: ISysUser, index: number) => {
  sysUserDetailApi(row.id).then(e => {
    if (e && e.data) {
      crudRef.value?.rowEdit(e.data, index)
    }
  })
}

// 编辑
const rowEdit = (form: ISysUser, done: () => void, loading: () => void) => {
  sysUserModifyApi(form).then(e => {
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
