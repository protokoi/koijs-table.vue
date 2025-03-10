<script setup lang="ts">
import type { Column, Row, Table } from './types'
import { computed, ref } from 'vue'
import ui from './ui'
import './ui.css'

const props = withDefaults(
  defineProps<Table>(),
  {
    sticky: true,
    zebraRows: true,
    spacing: true,
    size: 'sm',
    border: () => ({
      body: false,
      horizontal: false,
      vertical: false,
    }),
    mark: () => ({
      hover: {
        row: true,
        column: false,
      },
      select: {
        row: false,
        column: false,
      },
      spotlight: false,
    }),
    ui: () => (ui),
  },
)

const emit = defineEmits(['select:row'])

const currentColumns = computed(() => {
  if (!props.rows?.length) {
    return []
  }

  if (props.columns)
    return processColumns(props.columns)

  else
    return generateColumns(props.rows)
})

const hoveredRow = ref<Row>()
const selectedRow = ref<Row>()
const hoveredColumnKey = ref<string>()
const selectedColumnKey = ref<string>()
const startTableScroll = ref<boolean>(false)
const stickyAnimationIsEmpty = computed(() => props.ui.sticky?.animation === '')
function thisColumn(key: string): boolean {
  return hoveredColumnKey.value === key || selectedColumnKey.value === key
}
function thisRow(row: Row | undefined): boolean {
  return hoveredRow.value === row || selectedRow.value === row
}

function keyConvertLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

function getData(row: Row, column: Column): string | any {
  // return typeof row[column.key] === 'object' ? '[Object]' : row[column.key]
  return row[column.key]
}

function processColumns(columns: Column[]): Column[] {
  return columns.map(col => ({
    ...col,
    label: col.label || keyConvertLabel(col.key),
  }))
}

function generateColumns(rows: Row[]): Column[] {
  return Object.keys(rows[0]).map(key => ({
    key,
    label: keyConvertLabel(key),
  }))
}

function handleScroll(event: Event) {
  const target = event.target as HTMLDivElement | null
  return target ? target.scrollTop > 50 : false
}
</script>

<template>
  <div
    :class="[
      props.ui.size?.[props.size]?.text,
      props.ui.scrollbar?.base,
      props.ui.scrollbar?.corner,
      props.ui.scrollbar?.thumb?.base,
      props.ui.scrollbar?.thumb?.rounded,
      props.ui.scrollbar?.track?.base,
      props.ui.scrollbar?.track?.rounded,
      props.ui.wrapper,
      props.border.body
        ? props.ui.border?.body
        : null,
    ]"
    @scroll="(event: any) => startTableScroll = handleScroll(event)"
  >
    <table
      :class="[
        props.ui.table?.base,
        props.spacing
          ? props.ui.spacing?.base
          : null,
      ]"
    >
      <thead
        :class="[
          props.ui.header?.base,
          props.sticky
            ? props.ui.sticky?.base
            : null,
        ]"
      >
        <tr :class="[props.ui.header?.tr]">
          <th
            v-for="col in currentColumns" :key="col.key"
            :class="[
              props.border.vertical
                ? props.ui.border?.vertical
                : null,
              props.ui.header?.th?.base,
              props.ui.header?.th?.padding,
              props.ui.sticky?.animation,
              props.sticky
                ? startTableScroll || stickyAnimationIsEmpty
                  ? props.ui.sticky?.header
                  : null
                : props.ui.sticky?.header,
              props.mark.hover?.column
                ? thisColumn(col.key)
                  ? hoveredColumnKey === col.key
                    ? props.mark.hover.column
                      ? props.ui.mark?.hover?.column
                      : null
                    : props.ui.mark?.select?.column
                  : null
                : null,
            ]"
            @mouseenter="hoveredColumnKey = col.key"
            @mouseleave="hoveredColumnKey = undefined"
            @click="selectedColumnKey = selectedColumnKey === col.key ? undefined : col.key"
          >
            <slot :name="`${col.key}-header`" :column="col">
              {{ col.label }}
            </slot>
          </th>
        </tr>
      </thead>
      <tbody v-if="props.rows && props.rows.length > 0" :class="[props.ui.body?.base]">
        <tr
          v-for="(row, rowIndex) in props.rows" :key="rowIndex"
          :class="[
            props.ui.body?.tr?.base,
            props.mark.hover?.row
              ? thisRow(row) ? props.ui.mark?.hover?.row : null
              : null,
            props.spacing
              ? props.border.horizontal
                ? props.ui.spacing?.shadow
                : [props.ui.spacing?.row, props.ui.spacing?.shadow, props.ui.spacing?.rounded]
              : null,
            props.zebraRows ? props.ui.zebraRows : null,
            selectedRow === row
              ? props.mark.select?.row
                ? props.ui.mark?.select?.row
                : null
              : null,
            hoveredRow === row && props.mark.hover?.row
              ? props.ui.mark?.hover?.row
              : null,
          ]"
          @click="selectedRow = selectedRow === row ? undefined : row"
          @mouseenter="hoveredRow = row"
          @mouseleave="hoveredRow = undefined"
        >
          <td
            v-for="col in currentColumns" :key="col.key"
            :class="[
              props.ui.body?.td?.base,
              props.ui.body?.td?.padding,
              props.border.horizontal
                ? props.ui.border?.horizontal
                : null,
              props.border.vertical
                ? props.ui.border?.vertical
                : null,
              thisColumn(col.key) && !(thisColumn(col.key) && thisRow(row))
                ? hoveredColumnKey === col.key
                  ? props.mark.hover?.column
                    ? props.ui.mark?.hover?.column
                    : null
                  : props.mark.select?.column
                    ? props.ui.mark?.select?.column
                    : null
                : null,
              props.mark.spotlight
                ? thisColumn(col.key) && thisRow(row)
                  ? props.ui.mark?.spotlight
                  : null
                : null,
            ]"
            @click="emit('select:row', (row as Row))"
          >
            <slot
              :name="`${col.key}-cell`"
              :data="row"
              :column="col"
            >
              {{ getData(row, col) }}
            </slot>
          </td>
        </tr>
      </tbody>
      <!-- <div v-else>
        i m so alone
      </div> -->
    </table>
  </div>
</template>
