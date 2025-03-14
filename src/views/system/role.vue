<script setup lang="ts">
import {nextTick, ref} from 'vue'
import {CrudInstance, ICrudOption} from "m-eleplus-crud";
import {sysRoleCreateApi, sysRoleDetailApi, sysRoleModifyApi, sysRolePageListApi} from "@/apis/system/role";
import {ISysRole, ISysRoleParams} from "@/apis/system/role/types.ts";
import {deepClone} from "@/utils/util.ts";
import { roleMenuTreeApi } from '@/apis/system/menu'
import {ISysMenu} from "@/apis/system/menu/types.ts";
import {ElMessage, ElTree} from 'element-plus'

// crud ref
const crudRef = ref<CrudInstance>()
// 菜单树ref
const menuTreeRef = ref<InstanceType<typeof ElTree>>()

// 查询条件
const query = ref<ISysRoleParams>({
  page: 1,
  limit: 10
})
// 表单数据
const modelForm = ref<Partial<ISysRole>>({})
// 列表数据
const tableData = ref<ISysRole[]>([])
// 列表总条数
const tableTotal = ref(0)
// 列表加载状态
const tableLoading = ref(false)

// crud配置
const crudOption: ICrudOption = {
  delBtn: false,
  height: "auto",
  formLabelWidth: "100px",
  dialogWidth: '600px',
  column: [
    {
      label: "ID",
      prop: "id",
      align: "left",
      width: 180,
      addHide: true,
      editHide: true
    },
    {
      label: "角色",
      prop: "role",
      addHide: true,
      editHide: true,
      hide: true,
      search: true,
      searchPlaceholder: "ID/角色名称"
    },
    {
      label: "角色名称",
      prop: "roleName",
      align: "center",
      maxlength: 10,
      formSpan: 24,
      formRules: [
        { required: true, message: "请输入角色名称", trigger: "blur" }
      ]
    },
    {
      label: "菜单",
      prop: "menuIdList",
      hide: true,
      formSpan: 24,
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

// 展开
const expandStatus = ref(false)
// 全选/全不选
const checkedAllStatus = ref(false)
// 父子联动
const syncStatus = ref(true)
// 树形菜单
const menuList = ref<ISysMenu[]>([])

const getList = () => {
  tableLoading.value = true

  const params: ISysRoleParams = deepClone(query.value)
  if (params.createTime && params.createTime.length === 2) {
    params.createTimeStart = params.createTime[0]
    params.createTimeEnd = params.createTime[1]
  } else {
    params.createTimeStart = ''
    params.createTimeEnd = ''
  }
  delete params.createTime

  sysRolePageListApi(params).then(e => {
    if (e && e.data) {
      tableData.value = e.data.list
      tableTotal.value = e.data.total
      tableLoading.value = false
    }
  })
}

const openAdd = () => {
  menuList.value = []
  roleMenuTreeApi().then(e => {
    if (e && e.data) {
      menuList.value = e.data
      crudRef.value?.rowAdd()
    }
  })
}

const openEdit = (row: ISysRole, index: number) => {
  menuList.value = []
  Promise.all([sysRoleDetailApi(row.id), roleMenuTreeApi()]).then(e => {
    if (e) {
      menuList.value = e[1].data
      crudRef.value?.rowEdit(e[0].data, index)
      nextTick(() => {
        const checkedKeys = e[0].data.menuIdList
        if (checkedKeys && checkedKeys.length) {
          for (let i = 0; i < checkedKeys.length; i++) {
            // @ts-ignore
            menuTreeRef.value?.setChecked(checkedKeys[i], true, false)
          }
        }
      })
    }
  })
}

const rowSave = (form: ISysRole, done: Function, loading: Function) => {
  const checkedKeys = getAllCheckedKeys()
  if (!checkedKeys || !checkedKeys.length) {
    loading()
    ElMessage.error("请选择菜单")
    return
  }
  form.menuIdList = checkedKeys
  sysRoleCreateApi(form).then(e => {
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

const rowEdit = (form: ISysRole, done: Function, loading: Function) => {
  const checkedKeys = getAllCheckedKeys()
  if (!checkedKeys || !checkedKeys.length) {
    loading()
    ElMessage.error("请选择菜单")
    return
  }
  form.menuIdList = checkedKeys
  sysRoleModifyApi(form).then(e => {
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

// 折叠/展开
const expandStatusChange = (status: boolean) => {
  for (let i = 0; i < menuList.value.length; i++) {
    // @ts-ignore
    menuTreeRef.value.store.nodesMap[menuList.value[i].id].expanded = status
  }
}

// 全选/全不选
const checkStatusChange = (status: boolean) => {
  if (status) {
    menuTreeRef.value?.setCheckedNodes(menuList.value)
  } else {
    menuTreeRef.value?.setCheckedNodes([])
  }
}

const getAllCheckedKeys = () => {
  const checkedKeys: string[] = menuTreeRef.value.getCheckedKeys()
  const halfCheckedKeys: string[] = menuTreeRef.value.getHalfCheckedKeys();
  checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
  return checkedKeys;
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
      <template #addBtn>
        <el-button @click="openAdd" type="primary" icon="Plus">新 增</el-button>
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
      <template #menuIdListForm>
        <el-row style="width: 100%">
          <el-checkbox @change="expandStatusChange" v-model="expandStatus" label="展开/折叠" />
          <el-checkbox @change="checkStatusChange" v-model="checkedAllStatus" label="全选/全不选" />
          <el-checkbox v-model="syncStatus" label="父子联动" />
        </el-row>
        <el-tree
            ref="menuTreeRef"
            style="width: 100%"
            :data="menuList"
            show-checkbox
            node-key="id"
            :check-strictly="!syncStatus"
            :props="{ children: 'children', label: 'name' }"
        />
      </template>
    </m-crud>
  </page>
</template>

<style scoped lang="scss">

</style>