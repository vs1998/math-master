<template>
  <p>
    <slot></slot>
  </p>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'GameText'
}
</script>

<style scoped lang="scss">
  @import "../scss/_variables.scss";
  @import "../scss/_functions.scss";

  p {
    font-size: 3.5em;
    font-weight: bold;
    text-shadow: makelongshadow($button-shadow,8);
  }
</style>
