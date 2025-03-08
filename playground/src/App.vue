<script setup lang="ts">
import KoiTable from '@koijs/table-vue'
// import type { Row } from '@koijs/table-vue/dist/types/src/types'
import { onMounted, ref } from 'vue'
// import KoiTable from '../../src/koi-table.vue'
import Default from './layouts/default.vue'
import '../node_modules/@koijs/table-vue/dist/table-vue.css'

const rows = ref<[]>()

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
      <div class="w-8/12 h-5/6 flex">
        <KoiTable
          :rows="rows ?? []"
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
