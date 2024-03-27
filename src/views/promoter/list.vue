<script setup lang="ts">
import { ref } from 'vue'
import type { ICrudOption } from 'm-element-plus'

const modelForm: any = ref<any>({})

const query = ref<any>({
  page: 1,
  limit: 10
})

const total = ref(10)

const data = ref<any>([])

const option = ref<ICrudOption>({
  dialogWidth: '1000px',
  formLabelWidth: '100px',
  searchLabelWidth: '100px',
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
      dicData: [
        {
          label: "全体",
          value: 1
        },
        {
          label: "部门",
          value: 2
        }
      ],
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
</script>

<template>
  <page>
    <m-crud
      v-model="modelForm"
      :option="option"
      :data="data"
      :total="total"
      v-model:search="query"
    >
    </m-crud>
  </page>
</template>
