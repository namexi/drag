<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="`#${icon}`" />
  </svg>
</template>

<script>
export default {
  name: "CommonIcon",
  props: {
    icon: String
  }
};
</script>
