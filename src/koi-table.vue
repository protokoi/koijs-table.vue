<script setup lang="ts">
import type { Column, Row } from './types'
import { computed } from 'vue'

const props = defineProps<{
  rows: Row[]
  columns?: Column[]
}>()

const currentColumns = computed(() => {
  if (!props.rows || props.rows.length === 0) {
    return []
  }

  if (props.columns) {
    return props.columns
  }

  return [...Object.keys(props.rows[0])].map(_key => ({
    key: _key,
    label: _key.charAt(0).toUpperCase() + _key.slice(1),
  }))
})
</script>

<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th
            v-for="(col, index) in currentColumns" :key="index"
            class="animated-header"
          >
            {{ props.columns
              ? col.key.charAt(0).toUpperCase() + col.key.slice(1)
              : col.key.charAt(0).toUpperCase() + col.key.slice(1) }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in props.rows" :key="index"
          class="animated-row"
        >
          <td v-for="(col, i) in currentColumns" :key="i">
            {{ typeof row[col.key] !== 'object' ? row[col.key] : 'object' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import './main.css';
</style>
