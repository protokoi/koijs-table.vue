<script setup lang="ts">
import type { Row } from '@koijs/table-vue/dist/types/src/types.d'
// import KoiTable from '@koijs/table-vue'

import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
import Default from './layouts/default.vue'
// import Default from './layouts/default.vue'

const rows = ref<Row[]>()

onMounted(async () => {
  await fetch('https://dummyjson.com/users?limit=50')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.users
    })
})
</script>

<template>
  <Default>
    <KoiTable
      class="h-full"
      :rows="rows ?? []"
      :sticky="false"
      :stripped-rows="false"
      :row-grapped="false"
    >
      <!-- <template #id-header="{ column }">
        <div class="w-16 text-center">
          {{ `✨${column.label}` }}
        </div>
      </template> -->

      <!-- <template #id-cell="{ data }">
        <div class="text-center">
          {{ data.id }}
        </div>
      </template> -->

    <!-- <template #image-cell="{ data }">
        <img class="w-full" :src="data.image">
      </template> -->
    </KoiTable>
  </Default>
</template>
