<script setup lang="ts">
import type { Row } from '@koijs/table-vue/dist/types/src/types.d'
// import KoiTable from '@koijs/table-vue'

import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
import Default from './layouts/default.vue'
// import Default from './layouts/default.vue'

const rows = ref<Row[]>()
const selectedRow = ref<Row>()

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
      <KoiTable
        :rows="rows ?? []"
        class="whitespace-nowrap max-w-6/12 max-h-3/6"
        @select:row="(nw) => selectedRow = nw"
      >
      <!-- <template #id-header="{ column }">
        <div class="w-16 text-center">
          {{ `✨${column.label}` }}
        </div>
      </template>

      <template #id-cell="{ data }">
        <div class="text-center">
          {{ data.id }}
        </div>
      </template>

      <template #image-cell="{ data }">
        <img class="h-8" :src="data.image">
      </template> -->
      </KoiTable>
    </div>
  </Default>
</template>
