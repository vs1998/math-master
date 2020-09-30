<template>
  <div class="container">
    <div class="card" :class="{flipped: flipped}">
      <div class="front">
        <slot></slot>
      </div>
      <div class="back"></div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'MemoryCard',
  props: ['flipped']
}
</script>

<style scoped lang="scss">
  @import "../scss/_variables.scss";


  .container {
    perspective: 800px;
    position: relative;
  }

  .card {
    pointer-events: none;
    border-radius: 6px;
    // position: absolute;
    // background-color: #000;
    transform-style: preserve-3d;
    transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
  }

  div {
    // position: absolute;
    // min-width: 60px;
    // min-height: 60px;
    // backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: #000;
    border-radius: 6px;
    // text-align: center;
    &.flipped {
      transform: rotateY(180deg);
    }
  }

  .back{
    transform: rotoateY(180deg);
    position: absolute;
    z-index: -1;
    // backface-visibility: hidden;
  }

  .front {
    backface-visibility: hidden;
  }

  .back, .front {
    // backface-visibility: hidden;
    // position: absolute;
    min-width: 100px;
    min-height: 100px;
    pointer-events: none;
    font-size: 5vh;
    background-color: #000;
  }

</style>
