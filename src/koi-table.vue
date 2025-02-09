<script setup lang="ts">
import type { Column, Row } from '#koi/types'
import { computed, ref } from 'vue'
import { generateColumns, getData, handleScroll, processColumns } from './utils'

const props = defineProps<{
  rows: Row[]
  columns?: Column[]
  sticky?: boolean
  strippedRows?: boolean
  rowGrapped?: boolean
}>()

const currentColumns = computed(() => {
  if (!props.rows.length) {
    return []
  }

  if (props.columns)
    return processColumns(props.columns)

  else
    return generateColumns(props.rows)
})

const startTableScroll = ref<boolean>(false)
const hoveredRow = ref<Row>()
const selectedRow = ref<Row>()
const hoveredColumn = ref<string>()
const selectedColumn = ref<Column>()

const scrollX = `
  [&::-webkit-scrollbar]:h-2
  [&::-webkit-scrollbar-track]:rounded-none
  [&::-webkit-scrollbar-track]:bg-neutral-100
  [&::-webkit-scrollbar-thumb]:rounded-none
  [&::-webkit-scrollbar-thumb]:bg-neutral-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-800
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
`

const scrollY = (`
  [&::-webkit-scrollbar]:w-2
  [&::-webkit-scrollbar-track]:rounded-none
  [&::-webkit-scrollbar-track]:bg-neutral-100
  [&::-webkit-scrollbar-thumb]:rounded-none
  [&::-webkit-scrollbar-thumb]:bg-neutral-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-700
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
`)
</script>

<template>
  <div
    class="relative overflow-x-auto"
    :class="[scrollX, scrollY]"
    @scroll="(event) => startTableScroll = handleScroll(event)"
  >
    <table
      class="min-w-full table-fixed"
      :class="{
        'border-separate border-spacing-y-2': props.rowGrapped,
      }"
    >
      <thead
        class="select-none"
        :class="{ 'sticky top-0 ': props.sticky }"
      >
        <tr>
          <th
            v-for="col in currentColumns"
            :key="col.key"
            class="text-left text-sm font-normal dark:text-neutral-300 text-neutral-700 whitespace-nowrap py-1 pr-3 pl-4 first:pl-4 last:pr-4"
            :class="{
              'dark:bg-neutral-800/95 bg-neutral-200/95 py-3': startTableScroll && props.sticky,
              'bg-neutral-300 dark:bg-neutral-700': hoveredColumn === col.key || selectedColumn?.key === col.key,
            }"
            @mouseenter="hoveredColumn = col.key"
            @mouseleave="hoveredColumn = undefined"
            @click="selectedColumn = col"
          >
            <slot :name="`${col.key}-header`" :column="col">
              {{ col.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in props.rows"
          :key="rowIndex"
          class="hover:bg-neutral-200 hover:dark:bg-neutral-800 even:hover:bg-neutral-200 odd:hover:bg-neutral-200 dark:even:hover:bg-neutral-800 dark:odd:hover:bg-neutral-800"
          :class="{
            'inset-ring dark:inset-ring-neutral-900 inset-ring-neutral-100 shadow': props.rowGrapped,
            'even:bg-neutral-100 odd:bg-white dark:even:bg-neutral-900 dark:odd:bg-neutral-950': props.strippedRows && selectedRow !== row,
            'bg-neutral-200 dark:bg-neutral-800': selectedRow === row,
            'even:bg-neutral-200 dark:even:bg-neutral-800 odd:bg-neutral-200 dark:odd:bg-neutral-800': props.strippedRows && selectedRow === row,
          }"
          @click="selectedRow = row"
          @mouseenter="hoveredRow = row"
          @mouseleave="hoveredRow = undefined"
        >
          <td
            v-for="col in currentColumns"
            :key="col.key"
            class="whitespace-nowrap pl-4 text-sm py-4 first:pl-4 last:pr-4"
            :class="{
              'bg-neutral-200 dark:bg-neutral-800': hoveredColumn === col.key || selectedColumn?.key === col.key && !((hoveredColumn === col.key || selectedColumn?.key === col.key) && (selectedRow === row || hoveredRow === row)),
              'bg-neutral-300 dark:bg-neutral-700': (hoveredColumn === col.key || selectedColumn?.key === col.key) && (selectedRow === row || hoveredRow === row),
            }"
          >
            <slot :name="`${col.key}-cell`" :data="row" :column="col">
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
