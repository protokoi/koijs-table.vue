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
const isSidebarOpen = ref(false)

const font = ref<boolean>(true)
</script>

<!--
fonts:
  rubik
  doto
  poppins
  playfair
  robotoCondensed
  atkinson_hyperlegible_mono
-->

<template>
  <div
    :class="{
      rubik: font,
    }"
    class="fixed flex top-0 left-0 w-screen h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50"
  >
    <aside
      class="w-[280px] h-full border-r border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 absolute duration-300 shadow-lg flex flex-col gap-4"
      :class="{
        'left-0': isSidebarOpen,
        '-left-[280px]': !isSidebarOpen,
      }"
    >
      <div class="p-4 h-16 font-semibold text-lg border-b border-neutral-50 dark:border-neutral-700">
        KOI APP
      </div>
      <nav class="flex-1 px-4 space-y-2">
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-300 transition-colors"
        >
          Dashboard
        </a>
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-300 transition-colors"
        >
          Settings
        </a>
        <a
          href="#"
          class="block px-4 py-2 rounded-lg hover:bg-neutral-50 dark:hover:bg-neutral-700 text-neutral-900 dark:text-neutral-300 transition-colors"
        >
          Profile
        </a>
      </nav>
      <div class="p-4 border-t border-neutral-50 dark:border-neutral-700">
        <button
          class="w-full px-4 py-2 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 rounded-lg shadow transition-all"
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
        'left-[280px] w-[calc(50%-280px)]': isSidebarOpen,
      }"
    >
      <header
        class="flex h-16 items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-50 dark:border-neutral-700 shadow-sm"
      >
        <button
          class="p-2 bg-neutral-50 hover:bg-neutral-300 dark:bg-neutral-700 hover:dark:bg-neutral-900 text-neutral-950 dark:text-neutral-300 rounded-lg shadow cursor-pointer"
          @click="isSidebarOpen = !isSidebarOpen"
        >
          ☰
        </button>
        <h1 class="text-xl font-bold">
          Dashboard
        </h1>
        <div class="flex gap-2 items-center">
          <button
            class="p-2 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 rounded-lg shadow"
            @click="font = !font"
          >
            {{ !font ? '🔤' : '🔡' }}
          </button>

          <button
            class="p-2 bg-neutral-50 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-300 rounded-lg shadow"
            @click="toggleTheme"
          >
            {{ theme === 'light' ? '🌞' : '🌚' }}
          </button>
        </div>
      </header>

      <main class="overflow-hidden flex p-6 bg-neutral-50 dark:bg-neutral-950">
        <slot />
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Doto&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono&display=swap');

.robotoCondensed {
  font-family: "Roboto Condensed", serif;
  font-optical-sizing: auto;
}

.rubik {
  font-family: "Rubik", serif;
  font-optical-sizing: auto;
}

.poppins {
  font-family: "Poppins", serif;
}

.playfair {
  font-family: "Playfair Display", serif;
  font-optical-sizing: auto;
}

.doto {
  font-family: "Doto", serif;
  font-optical-sizing: auto;
  font-variation-settings:
    "ROND" 0;
}

.atkinson_hyperlegible_mono {
  font-family: "Atkinson Hyperlegible Mono", serif;
  font-optical-sizing: auto;
}
</style>
