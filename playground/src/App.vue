<script setup lang="ts">
import type { Row } from '@koijs/table-vue/dist/types/src/types'
import KoiTable from '@koijs/table-vue'
import { onMounted, ref } from 'vue'
import Default from './layouts/default.vue'

const rows = ref<Row[]>()
// const selectedRow = ref<Row>()

onMounted(async () => {
  await fetch('https://dummyjson.com/users')
    .then(res => res.json())
    .then((data) => {
      rows.value = data.users
    })
})
</script>

<template>
  <Default>
    <div class="w-full h-full flex justify-center items-center">
      <div class="w-6/12 h-4/6 flex">
        <KoiTable
          :sticky="true"
          :stripped-rows="false"
          :row-grapped="false"
          :border-x="true"
          class="whitespace-nowrap"
          :rows="rows ?? []"
        />
      </div>
    </div>
  </Default>
</template>
