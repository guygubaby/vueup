<template>
  <div>{{ foo }}</div>
</template>

<script lang="ts" setup>
type FooType = string | number

interface Props {
  foo: FooType
}

const { foo } = defineProps<Props>()
</script>
