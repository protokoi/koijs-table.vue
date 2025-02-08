<script setup lang="ts">
import type {
  // Column,
  Row,
} from '../../src/types'
import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
// import KoiTable from '@koijs/table-vue'
// import "@koijs/table-vue/dist/table-vue.css";

// const columns: Column[] = [
//   {
//     key: 'id',
//     label: 'ID',
//   },
//   {
//     key: 'name',
//     label: 'Ad Soyad',
//   },
//   {
//     key: 'age',
//     label: 'Yaş',
//   },
//   {
//     key: 'country',
//     label: 'Ülke',
//   },
// ]

const rows = ref<Row[]>()

onMounted(async () => {
  await fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.users
    })
})
</script>

<template>
  <KoiTable
    :rows="rows ?? []"
  />
</template>
