<script setup lang="ts">
import { Column, Row } from './types';
import { computed } from 'vue'

const props = defineProps<{
  rows: Row[]
  columns?: Column[]
}>()

const currentColumns = computed(() => {
  if (props.columns)
    return props.columns
  else[]
})

</script>

<template>
  <div class="table-container">
    <table class="custom-table">
  
      <thead>
        <tr>
          <th v-for="(col, index) in currentColumns" :key="index" class="animated-header">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in props.rows" :key="index" class="animated-row">
          <td v-for="(col, i) in currentColumns" :key="i">{{ row[col.key] || "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import './main.css';
</style>