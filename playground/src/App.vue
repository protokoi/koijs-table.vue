<script setup lang="ts">
import type { Row } from '@koijs/table-vue/dist/types/src/types.d'
// import KoiTable from '@koijs/table-vue'

import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
import Default from './layouts/default.vue'
// import Default from './layouts/default.vue'

const rows = ref<Row[]>()

onMounted(async () => {
  await fetch('https://api.escuelajs.co/api/v1/products')
    .then(res => res.json())
    .then((data) => {
      rows.value = data
    })
})
</script>

<template>
  <Default>
    <KoiTable
      class="h-full"
      :rows="rows ?? []"
      :border-x="true"
      :sticky="true"
      :stripped-rows="true"
      :row-grapped="true"
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
  </Default>
</template>
