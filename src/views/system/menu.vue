<script setup lang="ts">
import {computed, ref, watch} from 'vue'
import {
  menuCreateApi,
  menuDelApi,
  menuDetailApi,
  menuModifyApi,
  menuTreeApi
} from '@/apis/system/menu'
import {CrudInstance, ICrudOption} from "m-eleplus-crud";
import { ElMessage, FormInstance } from "element-plus";
import icons from '@/constants/icon';
import {ISysMenu} from "@/apis/system/menu/types.ts";

// crud ref
const crudRef = ref<CrudInstance>()
// 查询条件
const query = ref({})
// 表单数据
const modelForm = ref<Partial<ISysMenu>>({})
// 列表数据
const tableData = ref<ISysMenu[]>([])
// 列表总条数
const tableTotal = ref(0)
// 列表加载状态
const tableLoading = ref(false)
// crud配置
const crudOption: ICrudOption = {
  formLabelWidth: "100px",
  dialogWidth: '800px',
  column: [
    {
      label: "菜单名称",
      prop: "name",
      align: "left"
    },
    {
      label: "菜单类型",
      prop: "type",
      type: "select",
      dicData: [
        { label: "目录", value: 1 },
        { label: "菜单", value: 2 },
        { label: "按钮", value: 3 }
      ],
    },
    {
      label: "图标",
      prop: "icon",
      align: "center",
      width: 100
    },
    {
      label: "排序",
      prop: "sort",
      align: "center",
      width: 100
    },
    {
      label: "路由名字",
      prop: "alias",
      align: "center",
      width: 150
    },
    {
      label: "路由地址",
      prop: "path",
      align: "center",
      overHidden: true
    },
    {
      label: "是否缓存",
      prop: "keep",
      align: "center",
      type: "select",
      width: 100,
      editHide: true,
      formValue: 2,
      dicData: [
        { label: "是", value: 1 },
        { label: "否", value: 2 }
      ]
    },
    {
      label: "状态",
      prop: "status",
      align: "center",
      type: "select",
      width: 100,
      editHide: true,
      formValue: 1,
      dicData: [
        { label: "正常", value: 1 },
        { label: "禁用", value: 2 }
      ]
    }
  ]
}

// 新增/编辑弹窗
const dialogVisible = ref(false)
// form ref
const dialogForm = ref<FormInstance>()

// 获取列表数据
const getList = () => {
  tableLoading.value = true
  menuTreeApi().then(e => {
    if (e && e.data) {
      tableData.value = e.data
      tableLoading.value = false
    }
  })
}

/**
 * 打开新增
 */
const openAdd = () => {
  dialogVisible.value = true
}

/**
 * 打开编辑
 * @param row 菜单
 */
const openEdit = (row: ISysMenu) => {
  menuDetailApi(row.id).then(e => {
    if (e && e.data) {
      modelForm.value = e.data
      dialogVisible.value = true
    }
  })
}

/**
 * 表单保存
 * @param done 
 * @param loading 
 */
const rowSave = (done: () => void, loading: () => void) => {
  let pm = null
  if (modelForm.value.id) {
    // 编辑
    pm = menuModifyApi(modelForm.value)
  } else {
    // 新增
    pm = menuCreateApi(modelForm.value)
  }
  pm.then(e => {
    if (e && e.data) {
      done()
      getList()
      ElMessage.success('操作成功!')
    }
  }).finally(() => {
    setTimeout(() => {
      loading()
    }, 100)
  })
}

const rowClose = () => {
  modelForm.value = {}
}

/**
 * 删除
 * @param row 菜单数据 
 */
const rowDel = (row: ISysMenu) => {
  menuDelApi(row.id).then(e => {
    if (e && e.data) {
      ElMessage.success('操作成功!')
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
        row-key="id"
        @rowDel="rowDel"
        @search="getList"
        @reset="getList"
    >
      <template #addBtn>
        <el-button type="primary" icon="Plus" @click="openAdd">新 增</el-button>
      </template>
      <template #editBtn="{row}">
        <el-link
            class="m-control-btns"
            type="primary"
            :underline="false"
            icon="Edit"
            @click="openEdit(row)"
        >
          编辑
        </el-link>
      </template>
      <template #icon="{row}">
        <i style="font-size: 18px;" :class="'iconfont ' + row.icon"></i>
      </template>
    </m-crud>
    <m-dialog
        v-model="dialogVisible"
        :title="modelForm.id ? '编辑' : '新增'"
        width="800px"
        @enter="rowSave"
        @close="rowClose"
    >
      <template #default="{loading}">
        <el-form :loading="loading" ref="dialogForm" :model="modelForm" label-width="100px">
          <el-row>
            <el-col :span="12">
              <el-form-item label="上级菜单" prop="parentId">
                <el-cascader
                    clearable
                    style="width: 100%"
                    v-model="modelForm.parentId"
                    :options="tableData"
                    :props="{ checkStrictly: true, emitPath: false, label: 'name', value: 'id' }"
                >
                </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[{required: true, message: '请选择菜单类型', trigger: 'blur'}]" label="菜单类型" prop="type">
                <el-select style="width: 100%;" v-model="modelForm.type" placeholder="请选择">
                  <el-option label="目录" :value="1"></el-option>
                  <el-option label="菜单" :value="2"></el-option>
                  <el-option label="按钮" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12" v-if="modelForm.type !== 3">
              <el-form-item label="菜单图标" prop="icon">
                <el-select clearable filterable style="width: 100%" v-model="modelForm.icon" placeholder="请选择图标">
                  <el-option v-for="item in icons" :key="item" :label="item" :value="item">
                    <div style="display: flex; align-items: center;">
                      <i style="font-size: 18px;" :class="'iconfont ' + item"></i>
                      <span style="margin-left: 5px;">{{ item }}</span>
                    </div>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[{required: true, message: '请输入菜单名称', trigger: 'blur'}]" label="菜单名称" prop="name">
                <el-input style="width: 100%;" v-model="modelForm.name" placeholder="请输入菜单名称"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[{required: true, message: '请输入路由名字', trigger: 'blur'}]" label="路由名字" prop="alias">
                <el-input style="width: 100%;" v-model="modelForm.alias" placeholder="请输入路由名字"/>
              </el-form-item>
            </el-col>
            <el-col v-if="modelForm.type !== 3" :span="12">
              <el-form-item label="路由路径" prop="path">
                <el-input style="width: 100%;" v-model="modelForm.path" placeholder="请输入路由路径"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :rules="[{required: true, message: '请输入排序', trigger: 'blur'}]" label="排序" prop="sort">
                <el-input style="width: 100%;" v-model="modelForm.sort" placeholder="请输入排序"/>
              </el-form-item>
            </el-col>
            <el-col v-if="modelForm.type !== 3" :span="12">
              <el-form-item :rules="[{required: true, message: '请选择缓存', trigger: 'blur'}]" label="缓存" prop="keep">
                <el-select style="width: 100%;" v-model="modelForm.keep">
                  <el-option label="是" :value="1"></el-option>
                  <el-option label="否" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </template>
    </m-dialog>
  </page>
</template>

<style scoped lang="scss">

</style>