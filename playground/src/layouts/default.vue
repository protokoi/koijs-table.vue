<script setup lang="ts">
import { onMounted, ref } from 'vue'

const theme = ref<'dark' | 'light'>(
  (localStorage.getItem('theme') as 'dark' | 'light') || 'light',
)
function toggleTheme() {
  theme.value = theme.value === 'light' ? 'dark' : 'light'
  updateTheme()
}
function updateTheme() {
  if (theme.value === 'dark') {
    document.documentElement.classList.add('dark')
  }
  else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('theme', theme.value)
}
onMounted(() => {
  updateTheme()
})

const isSidebarOpen = ref(true)
</script>

<template>
  <div
    class="fixed flex top-0 left-0 w-screen h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200"
  >
    <aside
      class="w-[280px] h-full border-r border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 absolute duration-300 shadow-lg flex flex-col gap-4"
      :class="{
        'left-0': isSidebarOpen,
        '-left-[280px]': !isSidebarOpen,
      }"
    >
      <div class="p-4 h-16 font-semibold text-lg border-b border-gray-200 dark:border-gray-700">
        KOI APP
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 transition-colors"
        >
          Dashboard
        </a>
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 transition-colors"
        >
          Settings
        </a>
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-300 transition-colors"
        >
          Profile
        </a>
      </nav>
      <div class="p-4 border-t border-gray-200 dark:border-gray-700">
        <button
          class="w-full px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg shadow transition-all"
          @click="toggleTheme"
        >
          {{ theme === 'light' ? '🌞 Light Mode' : '🌚 Dark Mode' }}
        </button>
      </div>
    </aside>

    <div
      class="absolute h-full flex flex-col transition-all duration-300"
      :class="{
        'left-0 w-full': !isSidebarOpen,
        'left-[280px] w-[calc(100%-280px)]': isSidebarOpen,
      }"
    >
      <header
        class="flex h-16 items-center justify-between px-4 py-3 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <button
          class="p-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 hover:dark:bg-gray-800 text-gray-900 dark:text-gray-300 rounded-lg shadow cursor-pointer"
          @click="isSidebarOpen = !isSidebarOpen"
        >
          ☰
        </button>
        <h1 class="text-xl font-bold">
          Dashboard
        </h1>
        <button
          class="p-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded-lg shadow"
          @click="toggleTheme"
        >
          {{ theme === 'light' ? '🌞' : '🌚' }}
        </button>
      </header>

      <main class="overflow-hidden flex-1 p-6 bg-gray-50 dark:bg-gray-900">
        <slot />
      </main>
    </div>
  </div>
</template>
