<template>
  <div>{{ bar }}</div>
</template>

<script lang="ts" setup>
import type { BarType } from './types'

const { bar } = defineProps<{
  bar: BarType
}>()
</script>
