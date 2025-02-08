<script setup lang="ts">
import type {
  Column,
  Row,
} from '../../src/types'
import { onMounted, ref } from 'vue'
import KoiTable from '../../src/koi-table.vue'
// import KoiTable from '@koijs/table-vue'
// import "@koijs/table-vue/dist/table-vue.css";

const columns: Column[] = [
  {
    key: 'id',
    label: 'ID',
  },
  {
    key: 'firstName',
    label: 'Ad Soyad',
  },
  {
    key: 'age',
    label: 'Yaş',
  },
  {
    key: 'email',
    label: 'E-Mail',
  },
  {
    key: 'phone',
    label: 'Telefon',
  },
]

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
  <div class="fixed top-0 left-0">
    <div class="m-2">
      <KoiTable
        :rows="rows ?? []"
        :columns="columns"
      />
    </div>
  </div>
</template>
