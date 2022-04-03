<template>
  <div>{{ props.foo }} hihi</div>
</template>

<script lang="ts" setup>
interface Props {
  foo: string
}

const props = defineProps<Props>()
</script>
