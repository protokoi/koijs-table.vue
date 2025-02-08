<script setup lang="ts">
import type { Column, Row } from './types'
import { computed } from 'vue'
import { getData, keyConvertLabel } from './utils'

const props = defineProps<{
  rows: Row[]
  columns?: Column[]
}>()

const computedColumns = computed(() => {
  if (!props.rows.length) {
    return []
  }

  if (props.columns) {
    return props.columns.map(col => ({
      ...col,
      label: col.label || keyConvertLabel(col.key),
    }))
  }

  return Object.keys(props.rows[0]).map(key => ({
    key,
    label: keyConvertLabel(key),
  }))
})
</script>

<template>
  <div class="w-full">
    <table class="custom-table w-full">
      <thead class="bg-gray-200">
        <tr class="font-bold">
          <th v-for="col in computedColumns" :key="col.key" class="border">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex">
          <td v-for="col in computedColumns" :key="col.key">
            <slot :name="`${col.key}-data`" :data="row">
              {{ getData(row, col) }}
            </slot>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
@import "tailwindcss";
</style>
