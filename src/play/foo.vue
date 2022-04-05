<template>
  <div>{{ props.foo }}</div>
</template>

<script lang="ts" setup>
interface Props {
  foo: string
}

const props = defineProps<Props>()
</script>

<style scoped lang="scss">
div {
  color: red;
}
</style>
