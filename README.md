
# @koijs/table-vue

A lightweight and customizable table component for Vue 3 applications. This package allows you to render data-driven tables with ease, supporting dynamic columns and rows.

## Features

- Dynamic column and row rendering
- Lightweight and performant
- Modular architecture
- Fully customizable with CSS
- TypeScript support

---

## Installation

You can install the package via npm:

```bash
npm install @koijs/table-vue
```

---

## Usage

### Basic Example

Import the `KoiTable` component and use it in your Vue application:

```vue
<template>
  <div>
    <h1>Koi Table Example</h1>
    <KoiTable :columns="columns" :data="data" />
  </div>
</template>

<script setup lang="ts">
import { KoiTable } from "@koijs/table-vue";
import "@koijs/table-vue/dist/table-vue.css";

const columns = ['id', 'name', 'age', 'country'];

const data  = [
  { id: 1, name: "Atlas", age: 25, country: "Turkey" },
  { id: 2, name: "Noah", age: 30, country: "Netherlands" },
  { id: 3, name: "John", age: 28, country: "USA" },
  { id: 4, name: "Emma", age: 22, country: "Canada" },
  { id: 5, name: "Liam", age: 35, country: "Australia" },
  { id: 6, name: "Sophia", age: 27, country: "UK" },
  { id: 7, name: "Lucas", age: 31, country: "Germany" },
];
</script>
```

---

## Props

| Prop     | Type           | Required | Default | Description                   |
|----------|----------------|----------|---------|-------------------------------|
| `columns`| `Array`        | Yes      | `[]`    | Defines table columns. Each column should have a `key` and `title`. |
| `data`   | `Array`        | Yes      | `[]`    | Array of objects representing rows in the table. |

---

## Example with Custom Styles

You can apply custom styles by overriding the default CSS classes:

```css
...
```

---

## Development

To contribute or test locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/atlasyigitaydin/koijs-table
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the playground:
   ```bash
   npm run dev
   ```

---

## Build

To build the project:

```bash
npm run build
```

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
