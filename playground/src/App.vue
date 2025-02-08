<script setup lang="ts">
import KoiTable from '@koijs/table-vue'
import type { Row } from '@koijs/table-vue/dist/types/src/types';
import { onMounted, ref } from 'vue'

const rows = ref<Row[]>()

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
