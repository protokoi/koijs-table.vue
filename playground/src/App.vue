<script setup lang="ts">
import type {
  // Column,
  Row,
} from '../../src/types'
// import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
// import '@koijs/table-vue/dist/table-vue.css'

const rows = ref<Row[]>()
// const columns: Column[] = [
//   { key: 'action', label: 'Aksiyonlar' },
//   { key: 'id', label: 'ID' },
//   { key: 'name', label: 'İsim' },
//   { key: 'email', label: 'E-Mail' },
// ]

onMounted(async () => {
  await fetch('https://api.escuelajs.co/api/v1/users')
    .then(res => res.json())
    .then((data) => {
      rows.value = data
    })
})
</script>

<template>
  <KoiTable
    :rows="rows ?? []"
  >
    <template #avatar-data="{ data }">
      <div class="w-full flex justify-center">
        <img class="h-12 w-12 rounded-full" :src="data.avatar" alt="avatar">
      </div>
    </template>
  </KoiTable>
</template>
