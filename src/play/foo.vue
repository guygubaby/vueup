<template>
  <div>{{ foo }}</div>
</template>

<script lang="ts" setup>
import type { FooType } from './types'

interface Props {
  foo: FooType
}

const { foo } = defineProps<Props>()
</script>

<style scoped lang="scss">
div {
  color: red;
}
</style>
