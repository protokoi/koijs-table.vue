<script setup lang="ts">
import type { Column, Row } from './types'
import { computed } from 'vue'

const props = defineProps<{
  rows: Row[]
  columns?: Column[]
}>()

const computedColumns = computed(() => {
  if (!props.rows.length)
    return []

  if (props.columns) {
    return props.columns
  }

  else {
    return Object.keys(props.rows[0]).map(key => ({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
    }))
  }
})
</script>

<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="col in computedColumns" :key="col.key">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
          <td v-for="col in computedColumns" :key="col.key">
            {{ typeof row[col.key] === 'object' ? '[Object]' : row[col.key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import './main.css';
</style>
