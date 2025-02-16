<script setup lang="ts">
import type { Row } from '@koijs/table-vue/dist/types/src/types'
// import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
import Default from './layouts/default.vue'

const rows = ref<Row[]>()
// const selectedRow = ref<Row>()

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
      <div class="w-8/12 h-5/6 flex">
        <KoiTable :rows="rows ?? []" />
      </div>
    </div>
  </Default>
</template>
