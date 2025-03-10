<script setup lang="ts">
import type { Column, Row } from '@koijs/table-vue/types'
import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'
// import KoiTable from '../../src/koi-table.vue'
import Default from './layouts/default.vue'
// import '../node_modules/@koijs/table-vue/dist/table-vue.css'

const rows = ref<Row[]>([])
const columns = ref<Column[]>([])
columns.value = []

onMounted(async () => {
  await fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.users
    })
})
</script>

<template>
  <Default>
    <div class="w-full h-full flex justify-center items-center">
      <div class="w-5/12 h-3/6 flex">
        <KoiTable
          :rows="rows ?? []"
          size="xs"
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
