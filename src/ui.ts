export default {
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
}
