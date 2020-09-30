<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'GameButton'
}
</script>

<style scoped lang="scss">
  @import "../scss/_variables.scss";

  button {
    min-width: 90px;
    min-height: 90px;
    background: $button-color;
    font-size: 2em;
    color: white;
    border-radius: 7px;
    border: none;
    box-shadow: 0 7px 0px $button-shadow;
    display: inline-block;
    transition: all .1s;
    position: relative;
    padding: 20px 25px;
    position: relative;
    top: 0;
    cursor: pointer;
    margin:0 20px;
    outline: none;
    text-shadow: 0 2px 0px $button-shadow;
  }

  button:active {
    top: 3px;
    box-shadow: 0 2px 0px $button-shadow;
    transition: all .1s;
  }
</style>
