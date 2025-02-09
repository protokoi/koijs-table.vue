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
const clicedRow = ref<Row>()

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
        class=""
        :class="{ 'sticky top-0 ': props.sticky }"
      >
        <tr>
          <th
            v-for="col in currentColumns"
            :key="col.key"
            class="duration-300 text-left text-sm font-normal dark:text-neutral-300 text-neutral-700 whitespace-nowrap py-1 pr-3 pl-4 first:pl-4 last:pr-4"
            :class="{
              'dark:bg-neutral-800/95 bg-neutral-200/95 first:rounded-l-lg lst:rounded-r-lg py-3': startTableScroll && props.sticky,
            }"
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
          class="duration-100 hover:bg-neutral-200 hover:dark:bg-neutral-800 even:hover:bg-neutral-200 odd:hover:bg-neutral-200 dark:even:hover:bg-neutral-800 dark:odd:hover:bg-neutral-800"
          :class="{
            'rounded-lg inset-ring dark:inset-ring-neutral-900 inset-ring-neutral-100 shadow': props.rowGrapped,
            'even:bg-neutral-100 odd:bg-white dark:even:bg-neutral-900 dark:odd:bg-neutral-950': props.strippedRows && clicedRow !== row,
            'bg-neutral-200 dark:bg-neutral-800': clicedRow === row,
            'even:bg-neutral-200 dark:even:bg-neutral-800 odd:bg-neutral-200 dark:odd:bg-neutral-800': props.strippedRows && clicedRow === row,
          }"
          @click="clicedRow = row"
        >
          <td
            v-for="col in currentColumns"
            :key="col.key"
            class="whitespace-nowrap pl-4 text-sm py-4 first:pl-4 last:pr-4"
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
