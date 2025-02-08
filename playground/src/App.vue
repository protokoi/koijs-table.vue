<script setup lang="ts">
import type { Row } from '@koijs/table-vue/dist/types/src/types.d'
import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'
import Default from './layouts/default.vue'

const rows = ref<Row[]>()

onMounted(async () => {
  await fetch('https://dummyjson.com/users?limit=100')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.users
    })
})
</script>

<template>
  <Default>
    <KoiTable
      class=""
      :rows="rows ?? []"
    />
  </Default>
</template>
