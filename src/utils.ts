import type { Column, Row } from './types'

export function keyConvertLabel(key: string): string {
  return key
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/_/g, ' ')
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function getData(row: Row, column: Column): string | any {
  return typeof row[column.key] === 'object' ? '[Object]' : row[column.key]
}
