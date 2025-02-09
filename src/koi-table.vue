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

const scrollX = `
  [&::-webkit-scrollbar]:h-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-neutral-100
  [&::-webkit-scrollbar-thumb]:rounded-full
  [&::-webkit-scrollbar-thumb]:bg-neutral-300
  dark:[&::-webkit-scrollbar-track]:bg-neutral-800
  dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
`

const scrollY = (`
  [&::-webkit-scrollbar]:w-1
  [&::-webkit-scrollbar-track]:rounded-full
  [&::-webkit-scrollbar-track]:bg-neutral-100
  [&::-webkit-scrollbar-thumb]:rounded-full
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
            class="duration-300 text-left text-md font-normal dark:text-neutral-200 text-neutral-700 whitespace-nowrap pr-3 pl-2 first:pl-4 last:pr-4"
            :class="{
              'bg-neutral-800 first:rounded-l-lg lst:rounded-r-lg py-2': startTableScroll && props.sticky,
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
          :class="{
            'even:bg-neutral-100 odd:bg-white dark:even:bg-neutral-900 dark:odd:bg-neutral-950': props.strippedRows,
            'rounded-lg inset-ring dark:inset-ring-neutral-900 inset-ring-neutral-100 shadow': props.rowGrapped,
          }"
        >
          <td
            v-for="col in currentColumns"
            :key="col.key"
            class="whitespace-nowrap pl-2 text-sm py-4 first:pl-4 last:pr-4"
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
