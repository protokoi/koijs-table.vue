<script setup>
import KoijsTable from '../../src/koi-table.vue'

const columns = ["ID", "Name", "Age"];
const data = [
  { ID: 1, Name: "Ali", Age: 25 },
  { ID: 2, Name: "Veli", Age: 30 },
];
</script>


<template>
  <div>
    <h1>Koijs Table Test</h1>
    <KoijsTable :columns="columns" :data="data" />
  </div>
</template>

