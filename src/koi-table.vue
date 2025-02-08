<script setup lang="ts">
import type { Column, Row } from '#koi/types'
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

const scrollUi = (`
  [&::-webkit-scrollbar]:w-2 
  [&::-webkit-scrollbar]:h-2 
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-gray-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-gray-300
  dark:[&::-webkit-scrollbar-track]:bg-gray-700
  dark:[&::-webkit-scrollbar-thumb]:bg-gray-500
`)
</script>

<!-- Todos: -->
<!-- import { KoiTable} bugı -->
<!-- tip dosyası entegrasyonu -->
<!-- playground sayfa tipleri simulasyonu -->
<!-- head template -->

<template>
  <div :class="scrollUi" class="relative h-full overflow-x-auto ring rounded-lg ring-gray-300 dark:ring-gray-700">
    <table class="min-w-full table-fixed divide-y divide-gray-300 dark:divide-gray-700">
      <thead class="relative">
        <tr class="bg-gray-200 dark:bg-gray-800">
          <th v-for="col in computedColumns" :key="col.key" class="whitespace-nowrap py-2">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200 dark:divide-gray-800">
        <tr v-for="(row, rowIndex) in props.rows" :key="rowIndex" class="text-left rtl:text-right px-4 py-3.5 text-gray-900 dark:text-white font-semibold text-sm">
          <td v-for="col in computedColumns" :key="col.key" class="whitespace-nowrap px-4 py-4 text-gray-500 dark:text-gray-400 text-sm">
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
