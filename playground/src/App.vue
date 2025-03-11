<script setup lang="ts">
import type { Column, Row } from '@koijs/table-vue/types'
import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'

const rows = ref<Row[]>([])
const columns = ref<Column[]>([])
columns.value = []

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

onMounted(async () => {
  await fetch('https://dummyjson.com/todos')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.todos
    })
})
</script>

<template>
  <div class="dark:bg-black w-screen h-screen flex justify-center items-center rubik">
    <div class="w-8/12 h-4/6 flex">
      <KoiTable
        :rows="rows ?? []"
        size="sm"
        :zebra-rows="true"
        class="whitespace-nowrap"
        :spacing="false"
      >
        <template #image-cell="{ data }">
          <img :src="data.image">
        </template>
      </KoiTable>
    </div>
  </div>
  <button class="fixed top-0 right-0 text-2xl m-2" @click="toggleTheme">
    {{ theme === 'dark' ? '☀️' : '🌑' }}
  </button>
</template>

<style>
@import '@koijs/table-vue/ui';
@import url('https://fonts.googleapis.com/css2?family=Rubik&display=swap');
.rubik {
  font-family: "Rubik", sans-serif;
  font-optical-sizing: auto;
}
</style>
