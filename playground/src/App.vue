<script setup lang="ts">
// import KoiTable from '../../src/koi-table.vue'
import KoiTable from '@koijs/table-vue'

const columns = ['id', 'name', 'age', 'country']
const data  = [
  { id: 1, name: "Ali", age: 25, country: "Turkey" },
  { id: 2, name: "Veli", age: 30, country: "Turkey" },
  { id: 3, name: "John", age: 28, country: "USA" },
  { id: 4, name: "Emma", age: 22, country: "Canada" },
  { id: 5, name: "Liam", age: 35, country: "Australia" },
  { id: 6, name: "Sophia", age: 27, country: "UK" },
  { id: 7, name: "Lucas", age: 31, country: "Germany" },
  { id: 8, name: "Olivia", age: 26, country: "France" },
  { id: 9, name: "Noah", age: 29, country: "Netherlands" },
  { id: 10, name: "Mia", age: 24, country: "Italy" },
];
</script>

<template>
  <KoiTable :columns="columns" :data="data" />
</template>
