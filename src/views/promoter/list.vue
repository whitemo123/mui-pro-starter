<script setup lang="ts">
import { ref } from 'vue'
import type { ICrudOption } from 'm-element-plus'

const modelForm: any = ref<any>({})

const query = ref<any>({
  page: 1,
  limit: 10
})

const total = ref(100)

const data = ref<any>([
  {
    title: '测试',
    releaseTime: '2023-01-02',
    content: '测试'
  }
])

const option = ref<ICrudOption>({
  dialogWidth: '1000px',
  formLabelWidth: '100px',
  searchLabelWidth: '100px',
  height: 'auto',
  column: [
    {
      label: "通知标题",
      prop: "title",
      search: true,
      rules: [{
        required: true,
        message: "请输入通知标题",
        trigger: "blur"
      }]
    },
    {
      label: "通知类型",
      type: "select",
      dicUrl: '/admin/promoter/getPromoterList',
      dicFormatter: (res: any) => ({list: res.data, label: 'promoterName', value: 'promoterId'}),
      slot: true,
      prop: "category",
      search: true,
      rules: [{
        required: true,
        message: "请输入通知类型",
        trigger: "blur"
      }]
    },
    {
      label: "通知日期",
      prop: "releaseTime",
      type: "date",
      format: "YYYY-MM-DD",
      valueFormat: "YYYY-MM-DD",
      rules: [{
        required: true,
        message: "请输入通知日期",
        trigger: "blur"
      }]
    },
    {
      label: "通知内容",
      prop: "content",
      type: "textarea"
    }
  ]
})

/**
 * 新增
 * @param form 
 * @param done 
 * @param loading 
 */
const rowSave = (form: any, done: Function, loading: Function) => {
  console.log('新增', form, done, loading)
  // done()
  loading()
}

/**
 * 编辑
 * @param form 
 * @param done 
 * @param loading 
 */
const rowEdit = (form: any, done: Function, loading: Function) => {
  console.log('修改', form, done, loading)
  // done()
  loading()
}

/**
 * 取消
 * @param form 
 * @param index 
 * @param type add edit view
 */
const rowCancel = (form: any, index: number, type: string) => {
  console.log('取消', form, index, type)
}

/**
 * @description 删除
 */
const rowDel = (form: any, index: number) => {
  console.log('删除', form, index)
}
</script>

<template>
  <page>
    <m-crud
      v-model="modelForm"
      :option="option"
      :data="data"
      :total="total"
      v-model:search="query"
      @rowSave="rowSave"
      @rowEdit="rowEdit"
      @rowCancel="rowCancel"
      @rowDel="rowDel"
    >
    </m-crud>
  </page>
</template>
