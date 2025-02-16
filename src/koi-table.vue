<script setup lang="ts">
import type { KoiTable, Row } from '#koi/types'
import { computed, ref } from 'vue'
import { generateColumns, getData, handleScroll, processColumns } from './utils'

const props = withDefaults(
  defineProps<KoiTable>(),
  {
    sticky: true,
    zebraRows: false,
    spacing: true,
    size: 'sm',
    border: () => ({
      body: false,
      horizontal: false,
      vertical: false,
    }),
    mark: () => ({
      hover: {
        row: false,
        column: false,
      },
      select: {
        row: false,
        column: false,
      },
      spotlight: false,
    }),
    ui: () => ({
      wrapper: 'w-full relative overflow-x-auto pr-1 rounded-lg dark:text-white text-black',
      sticky: {
        animation: 'duration-300',
        base: 'sticky top-0',
        header: 'dark:bg-neutral-800/90 bg-neutral-200/90 py-3 first:rounded-l-lg last:rounded-r-lg',
      },
      zebraRows: 'even:bg-neutral-100 odd:bg-white dark:even:bg-neutral-900 dark:odd:bg-neutral-950',
      spacing: {
        base: 'border-separate border-spacing-y-2',
        row: 'inset-ring dark:inset-ring-neutral-900 inset-ring-neutral-100',
        shadow: 'shadow',
        rounded: 'rounded-lg',
      },
      border: {
        body: 'ring ring-neutral-300 dark:ring-neutral-700',
        horizontal: 'border-y border-neutral-300 dark:border-neutral-700',
        vertical: 'border-x border-neutral-300 dark:border-neutral-700',
      },
      size: {
        xs: {
          text: 'text-xs',
        },
        sm: {
          text: 'text-sm',
        },
        md: {
          text: 'text-md',
        },
        lg: {
          text: 'text-lg',
        },
        xl: {
          text: 'text-xl',
        },
      },
      mark: {
        hover: {
          row: 'hover:bg-zinc-200 dark:hover:bg-zinc-800',
          column: 'bg-zinc-200 dark:bg-zinc-800',
        },
        select: {
          row: 'even:bg-zinc-200 odd:bg-zinc-200 dark:even:bg-zinc-800 dark:odd:bg-zinc-800',
          column: 'bg-zinc-200 dark:bg-zinc-800',
        },
        spotlight: 'bg-zinc-300 dark:bg-zinc-600',
      },
      table: {
        base: 'min-w-full table-fixed',
      },
      scrollbar: {
        base: '[&::-webkit-scrollbar]:h-2 [&::-webkit-scrollbar]:w-2',
        corner: '[&::-webkit-scrollbar-corner]:bg-transparent',
        thumb: {
          base: '[&::-webkit-scrollbar-thumb]:bg-neutral-300 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500',
          rounded: '[&::-webkit-scrollbar-thumb]:rounded-lg',
        },
        track: {
          base: '[&::-webkit-scrollbar-track]:bg-neutral-100 dark:[&::-webkit-scrollbar-track]:bg-neutral-700',
          rounded: '[&::-webkit-scrollbar-track]:rounded-lg',
        },
      },
      header: {
        base: 'select-none',
        tr: '',
        th: {
          base: 'text-left font-normal dark:text-neutral-200 text-neutral-800 whitespace-nowrap',
          padding: 'py-1 px-2 first:pl-4 last:pr-4',
        },
      },
      body: {
        base: '',
        tr: {
          base: '',
          hover: '',
        },
        td: {
          base: '',
          padding: 'px-2 py-4 first:pl-4 last:pr-4',
        },
      },
    }),
  },
)

const emit
  = defineEmits(['select:row'])

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
    @scroll="(event) => startTableScroll = handleScroll(event)"
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
                : [props.ui.spacing?.row, props.ui.spacing?.shadow]
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
      <div v-else>
        i m so alone
      </div>
    </table>
  </div>
</template>
