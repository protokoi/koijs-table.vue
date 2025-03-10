<script setup lang="ts">
import type { Column, Row } from '@koijs/table-vue/types'
import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'
import Default from './layouts/default.vue'
// import '@koijs/table-vue/ui'

const rows = ref<Row[]>([])
const columns = ref<Column[]>([])
columns.value = []

onMounted(async () => {
  await fetch('https://dummyjson.com/todos')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.todos
    })
})
</script>

<template>
  <Default>
    <div class="w-full h-full flex justify-center items-center">
      <div class="w-8/12 h-4/6 flex">
        <KoiTable
          :rows="rows ?? []"
          size="sm"
          :zebra-rows="true"
          :border="{
            horizontal: false,
          }"
          class="whitespace-nowrap"
          :spacing="false"
        >
          <template #image-cell="{ data }">
            <img :src="data.image">
          </template>
        </KoiTable>
      </div>
    </div>
  </Default>
</template>
