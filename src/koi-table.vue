<template>
  <div class="table-container">
    <table class="custom-table">
      <thead>
        <tr>
          <th v-for="(col, index) in props.columns" :key="index" class="animated-header">
            {{ col }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, index) in props.data"
          :key="index"
          class="animated-row"
        >
          <td v-for="col in props.columns" :key="col">{{ row[col] || "-" }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import {Table} from './koi-table.js'
const props = defineProps<Table>()
</script>

<style>
@import './koi-table.css';
</style>